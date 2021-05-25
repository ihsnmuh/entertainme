import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { favoritesVar } from '../../graphql/vars';
import {
  GET_DETAIL_MOVIE,
  GET_DETAIL_TVSERIES,
  GET_HOMEPAGE_DATA,
  GET_MOVIES_DATA,
  GET_SERIES_DATA,
  DELETE_MOVIE,
  DELETE_SERIE,
} from '../../graphql/queries';

export default function DetailScreen({ navigation, route }) {
  const { id, typename } = route.params;
  let detail;

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [
      {
        query: GET_HOMEPAGE_DATA,
      },
      {
        query: GET_MOVIES_DATA,
      },
    ],
    onCompleted: () => {
      navigation.replace('Home');
      console.log('Movie Berhasil Di delete');
      const favorites = favoritesVar();
      let filtered = favorites.filter((data) => data._id !== detail._id);
      const newUpdate = [...filtered];
      favoritesVar(newUpdate);
    },
  });

  const [deleteSeries] = useMutation(DELETE_SERIE, {
    refetchQueries: [
      {
        query: GET_HOMEPAGE_DATA,
      },
      {
        query: GET_SERIES_DATA,
      },
    ],
    onCompleted: () => {
      navigation.replace('Home');
      console.log('Series Berhasil Di delete');
      const favorites = favoritesVar();
      let filtered = favorites.filter((data) => data._id !== detail._id);
      const newUpdate = [...filtered];
      favoritesVar(newUpdate);
    },
  });

  console.log(id, typename);

  if (typename === 'MovieEntertainme' || typename === 'Movie') {
    let { loading, error, data } = useQuery(GET_DETAIL_MOVIE, {
      variables: { input: id },
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error</Text>;
    console.log('Masuk Detail Movie');
    detail = data.movie[0];
  } else if (typename === 'SeriesEntertainme' || typename === 'Series') {
    let { loading, error, data } = useQuery(GET_DETAIL_TVSERIES, {
      variables: { input: id },
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error</Text>;
    console.log('Masuk Detail Series');
    detail = data.serie[0];
  }
  console.log(detail, '<<<<<<<<<<< DATAAAA');

  const editData = () => {
    console.log(detail.__typename, '<<< Type diedit');
    console.log(detail._id, '<<< ID diedit');
    console.log('Tombol Edit');
    navigation.navigate('EditMovie', {
      dataEdit: detail,
      typeName: detail.__typename,
    });
  };

  const deleteData = () => {
    console.log(detail.__typename, '<<< Type didelete');
    console.log(detail._id, '<<< ID didelete');
    console.log('Tombol Delete');

    if (
      detail.__typename === 'Movie' ||
      detail.__typename === 'MovieEntertainme'
    ) {
      deleteMovie({
        variables: {
          input: detail._id,
        },
      });
    } else if (
      detail.__typename === 'Series' ||
      detail.__typename === 'SeriesEntertainme'
    ) {
      deleteSeries({
        variables: {
          input: detail._id,
        },
      });
    }
  };

  const favoriteData = () => {
    console.log('Masuk Fav');
    console.log(favoritesVar(), '<<<< Masuk');
    const favorites = favoritesVar();
    const newFavorite = [...favorites, detail];
    console.log(newFavorite, '<<<<< Baru');
    favoritesVar(newFavorite);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Halaman Detail</Text>
        {/* <Text>{JSON.stringify(detail)}</Text> */}
        <Text>{detail.title}</Text>
        <Image
          style={styles.image}
          source={{
            uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${detail.poster_path}`,
          }}
        />
        <Text>{detail.overview}</Text>
        <Text>{detail.popularity}</Text>
        {detail.tags.map((tag, index) => {
          return (
            <Text key={index}>
              {index + 1}. {tag}
            </Text>
          );
        })}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.buttonEdit} onPress={editData}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={deleteData}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDelete} onPress={favoriteData}>
            <Text style={styles.buttonText}>Favorite</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style='auto' />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 300,
  },
  buttonEdit: {
    backgroundColor: '#2978b5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 100,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonDelete: {
    backgroundColor: '#db0000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 100,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
