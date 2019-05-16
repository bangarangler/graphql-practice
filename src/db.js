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
    email: "Lindz@test.com",
    age: 27
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

const db = {
  users,
  posts,
  comments
};

export default db;
