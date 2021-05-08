const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const MoviesSchema = require('./schemas/moviesSchema');
const TvSeriesSchema = require('./schemas/tvseriesSchema');
const EntertainMeSchema = require('./schemas/entertainmeSchema')

const typeDefs = gql`
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, MoviesSchema.typeDefs, TvSeriesSchema.typeDefs, EntertainMeSchema.typeDefs],
  resolvers: [MoviesSchema.resolvers, TvSeriesSchema.resolvers, EntertainMeSchema.resolvers],
});

const server = new ApolloServer({ schema });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
