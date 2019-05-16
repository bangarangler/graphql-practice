const Query = {
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
      //.toLowerCase()
      //.includes(
      //args.query.toLowerCase() &&
      //post.body.toLowerCase().includes(args.query.toLowerCase())
      //);
    });
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  me() {
    return {
      id: 12456,
      name: "Jon",
      email: "jon@test.com"
    };
  },
  post() {
    return {
      id: 129859,
      title: "Developer Post Title",
      body: "The body of the post would be displayed here"
    };
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  }
};

export default Query;
