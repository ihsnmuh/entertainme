const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  # Yang didaftarkan
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  # Output yang diinginkan dari data balikannya
  type Query {
    # Query Movies
    movies: [Movie]
    movie(_id: ID): [Movie]

    # Query Tv Series
    tvSeries: [Series]
    serie(_id: ID): [Series]
  }

  # Inputan data
  input DataInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Mutation {
    # Mutation Movies
    addMovie(newMovie: DataInput): Movie
    updateMovie(_id: ID, updateMovie: DataInput): Movie
    deleteMovie(_id: ID): Movie

    # Mutation tvSeries
    addTvSeries(newSeries: DataInput): Series
    updateTvSeries(_id: ID, updateTvSeries: DataInput): Series
    deleteTvSeries(_id: ID): Series
  }
`;

const resolvers = {
  Query: {
    // Query untuk Movies
    movies: () => {
      return axios({
        method: 'GET',
        url: 'http://localhost:4001/movies',
      })
        .then(({ data }) => {
          // console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },

    // berdasarakan params yang di ambil
    movie: (parent, args, context, info) => {
      const { _id } = args;
      // console.log(args);
      return axios({
        method: 'GET',
        url: 'http://localhost:4001/movies/' + _id,
      })
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },

    // Query untuk TV Series
    tvSeries: () => {
      return axios({
        method: 'GET',
        url: 'http://localhost:4002/tvseries',
      })
        .then(({ data }) => {
          // console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },

    serie: (parent, args, context, info) => {
      const { _id } = args;
      // console.log(args);
      return axios({
        method: 'GET',
        url: 'http://localhost:4002/tvseries/' + _id,
      })
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },
  },
  Mutation: {
    // Mutation Movies
    addMovie: (parent, args, context, info) => {
      const newMovie = {
        title: args.newMovie.title,
        overview: args.newMovie.overview,
        poster_path: args.newMovie.poster_path,
        popularity: args.newMovie.popularity,
        tags: args.newMovie.tags,
      };

      return axios({
        method: 'POST',
        url: 'http://localhost:4001/movies',
        data: newMovie,
      })
        .then(({ data }) => {
          console.log(data);
          return data.ops[0];
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },

    updateMovie: (_, args) => {
      const { _id } = args;

      const updateMovie = {
        title: args.updateMovie.title,
        overview: args.updateMovie.overview,
        poster_path: args.updateMovie.poster_path,
        popularity: args.updateMovie.popularity,
        tags: args.updateMovie.tags,
      };

      return axios({
        method: 'PUT',
        url: 'http://localhost:4001/movies/' + `${_id}`,
        data: updateMovie,
      })
        .then(({ data }) => {
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          throw err;
        });
    },

    deleteMovie: (_, args) => {
      const { _id } = args;

      return axios({
        method: 'DELETE',
        url: 'http://localhost:4001/movies/' + `${_id}`,
      })
        .then(({ data }) => {
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          throw err;
        });
    },

    // Mutation TV SERIES

    addTvSeries: (parent, args, context, info) => {
      const newSeries = {
        title: args.newSeries.title,
        overview: args.newSeries.overview,
        poster_path: args.newSeries.poster_path,
        popularity: args.newSeries.popularity,
        tags: args.newSeries.tags,
      };

      return axios({
        method: 'POST',
        url: 'http://localhost:4002/tvseries',
        data: newSeries,
      })
        .then(({ data }) => {
          console.log(data);
          return data.ops[0];
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    },

    updateTvSeries: (_, args) => {
      const { _id } = args;

      const updateTvSeries = {
        title: args.updateTvSeries.title,
        overview: args.updateTvSeries.overview,
        poster_path: args.updateTvSeries.poster_path,
        popularity: args.updateTvSeries.popularity,
        tags: args.updateTvSeries.tags,
      };

      return axios({
        method: 'PUT',
        url: 'http://localhost:4002/tvseries/' + `${_id}`,
        data: updateTvSeries,
      })
        .then(({ data }) => {
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          throw err;
        });
    },

    deleteTvSeries: (_, args) => {
      const { _id } = args;

      return axios({
        method: 'DELETE',
        url: 'http://localhost:4002/tvseries/' + `${_id}`,
      })
        .then(({ data }) => {
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          throw err;
        });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
