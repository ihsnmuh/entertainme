import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
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
import LoadingScreen from '../LoadingScreen';

const windowWidth = Dimensions.get('window').width;

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
      ToastAndroid.show(
        `${detail.title} has been Deleted`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
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
      ToastAndroid.show(
        `${detail.title} has been Deleted`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    },
  });

  console.log(id, typename);

  if (typename === 'MovieEntertainme' || typename === 'Movie') {
    let { loading, error, data } = useQuery(GET_DETAIL_MOVIE, {
      variables: { input: id },
    });

    if (loading) return <LoadingScreen />;
    if (error) return <Text>Error</Text>;
    console.log('Masuk Detail Movie');
    detail = data.movie[0];
  } else if (typename === 'SeriesEntertainme' || typename === 'Series') {
    let { loading, error, data } = useQuery(GET_DETAIL_TVSERIES, {
      variables: { input: id },
    });

    if (loading) return <LoadingScreen />;
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
    // console.log('Masuk Fav');
    // console.log(favoritesVar(), '<<<< Masuk');
    const favorites = favoritesVar();
    let flag = false;
    favorites.forEach((data) => {
      if (data._id === detail._id) {
        flag = true;
      }
    });

    if (!flag) {
      const newFavorite = [...favorites, detail];
      console.log(newFavorite, '<<<<< Baru');
      favoritesVar(newFavorite);
      ToastAndroid.show(
        `${detail.title} Added to Favorites`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      navigation.replace('Home');
    } else {
      // console.log('sudah Ada Didalam Favorite');
      ToastAndroid.show(
        `${detail.title} already exist in Favorites`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {/* <Text>Halaman Detail</Text> */}
          {/* <Text>{JSON.stringify(detail)}</Text> */}
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginVertical: 20,
              borderBottomWidth: 3,
              borderBottomColor: '#db0000',
            }}
          >
            {detail.title}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${detail.poster_path}`,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: (windowWidth * 2) / 3,
              marginVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: '#db0000',
            }}
          >
            Overview
          </Text>
          <Text style={{ width: (windowWidth * 2) / 3, marginVertical: 10 }}>
            {detail.overview}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: (windowWidth * 2) / 3,
              marginVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: '#db0000',
            }}
          >
            Popularity
          </Text>
          <Text>{detail.popularity}</Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: (windowWidth * 2) / 3,
              marginVertical: 10,
              borderBottomWidth: 2,
              borderBottomColor: '#db0000',
            }}
          >
            Tags
          </Text>
          {detail.tags.map((tag, index) => {
            return (
              <Text key={index} style={{ width: (windowWidth * 2) / 3 }}>
                {index + 1}. {tag}
              </Text>
            );
          })}
        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.buttonEdit} onPress={editData}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={deleteData}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFavorite} onPress={favoriteData}>
          <Text style={styles.buttonText}>Favorite</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='auto' />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: (windowWidth * 2) / 3,
    height: windowWidth,
  },
  buttonEdit: {
    backgroundColor: 'black',
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
  buttonFavorite: {
    backgroundColor: '#303030',
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 100,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#db0000',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
