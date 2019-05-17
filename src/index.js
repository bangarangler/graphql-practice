import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db.js";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from './resolvers/Subscription.js'
import User from "./resolvers/User.js";
import Post from "./resolvers/Post.js";
import Comment from "./resolvers/Comment.js";

const pubsub = new PubSub()

//RESOLVERS
const server = new GraphQLServer({
  typeDefs: `./src/schema.graphql`,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
  context: {
db,
pubsub
  }
});

server.start(() => {
  console.log(`Server is up!`);
});
