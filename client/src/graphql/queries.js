import { gql } from '@apollo/client';

export const GET_HOMEPAGE_DATA = gql`
  query getalldata {
    entertainme {
      movies {
        title
        _id
        poster_path
      }
      tvSeries {
        title
        _id
        poster_path
      }
    }
  }
`;

export const GET_MOVIES_DATA = gql`
  query getMovie {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_SERIES_DATA = gql`
  query getTvSeries {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovie($input: NewMovie) {
    addMovie(newMovie: $input) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_SERIE = gql`
  mutation addTvSeries($input: NewTvSeries) {
    addTvSeries(newTvSeries: $input) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_DETAIL_MOVIE = gql`
  query getMovieById($input: ID) {
    movie(_id: $input) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_DETAIL_TVSERIES = gql`
  query getMovieById($input: ID) {
    serie(_id: $input) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($input: ID) {
    deleteMovie(_id: $input) {
      title
    }
  }
`;

export const DELETE_SERIE = gql`
  mutation DeleteMovie($input: ID) {
    deleteTvSeries(_id: $input) {
      title
    }
  }
`;
