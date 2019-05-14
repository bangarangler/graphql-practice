import { GraphQLServer } from "graphql-yoga";

// DEMO USER DATA
const users = [
  {
    id: "1",
    name: "Jon",
    email: "jon@test.com",
    age: 31
  },
  {
    id: "2",
    name: "Lindz",
    email: "Lindz@test.com"
  },
  {
    id: "3",
    name: "Bobby",
    email: "bobby@test.com"
  }
];

const posts = [
  {
    id: "75840",
    title: "Post One",
    body: "The body of post one",
    published: true,
    author: "1"
  },
  {
    id: "92894a",
    title: "Post two",
    body: "The body of second post z",
    published: false,
    author: "1"
  },
  {
    id: "24234232",
    title: "Post three",
    body: "The body of post three",
    published: true,
    author: "2"
  }
];

const comments = [
  {
    id: "102",
    text: "here is first comment",
    author: "1",
    post: "75840"
  },
  {
    id: "103",
    text: "here is second comment",
    author: "1",
    post: "75840"
  },
  {
    id: "104",
    text: "here is third comment",
    author: "2",
    post: "92894a"
  },
  {
    id: "105",
    text: "here is fourth comment",
    author: "3",
    post: "24234232"
  }
];

//SCALAR TYPE = STRING, BOOLEAN, INT, FLOAT, ID
//TYPE DEFINITIONS (SCHEMA)
const typeDefs = `
type Query {
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  comments: [Comment!]!
  me: User!
  post: Post!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}
`;

//RESOLVERS
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
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
    comments(parent, args, ctx, info) {
      return comments;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.post === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log(`Server is up!`);
});
