const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  # Output yang diinginkan dari data balikannya
  extend type Query {
    # Query Movies
    movies: [Movie]
    movie(_id: ID): [Movie]
  }

  extend type Mutation {
    # Mutation Movies
    addMovie(
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: [String]
    ): Movie
    updateMovie(
      _id: ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: [String]
    ): Movie
    deleteMovie(_id: ID): Movie
  }
`;

const resolvers = {
  Query: {
    // Query untuk Movies
    movies: async () => {
      try {
        const moviesCache = await redis.get('movies');

        if (!moviesCache) {
          console.log("dari Server");
          const { data } = await axios({
            method: 'GET',
            url: 'http://localhost:4001/movies',
          });
          await redis.set('movies', JSON.stringify(data));
          return data;
        } else {
          const data = JSON.parse(moviesCache);
          console.log("dari Cache");
          return data;
        }
      } catch (error) {
        console.log(error);
        return error;
      }
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
          return err;
        });
    },
  },
  Mutation: {
    // Mutation Movies
    addMovie: (_, args) => {
      const newMovie = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };

      return axios({
        method: 'POST',
        url: 'http://localhost:4001/movies',
        data: newMovie,
      })
        .then(({ data }) => {
          redis.del('movies');
          console.log(data);
          return data.ops[0];
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },

    updateMovie: (_, args) => {
      const { _id } = args;

      const updateMovie = {
        title: args.title,
        overview: args.overview,
        poster_path: args.poster_path,
        popularity: args.popularity,
        tags: args.tags,
      };

      return axios({
        method: 'PUT',
        url: 'http://localhost:4001/movies/' + `${_id}`,
        data: updateMovie,
      })
        .then(({ data }) => {
          redis.del('movies');
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          return err;
        });
    },

    deleteMovie: (_, args) => {
      const { _id } = args;

      return axios({
        method: 'DELETE',
        url: 'http://localhost:4001/movies/' + `${_id}`,
      })
        .then(({ data }) => {
          redis.del('movies');
          console.log(data);
          return data.value;
        })
        .catch((err) => {
          console.log(err.response.status);
          console.log(err.response.data);
          return err;
        });
    },
  },
};

module.exports = { typeDefs, resolvers };
