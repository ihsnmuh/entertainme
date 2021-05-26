import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { favoritesVar } from '../../graphql/vars';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {
  GET_HOMEPAGE_DATA,
  EDIT_MOVIE,
  GET_MOVIES_DATA,
  EDIT_SERIE,
  GET_SERIES_DATA,
} from '../../graphql/queries';

const windowWidth = Dimensions.get('window').width;

export default function EditScreen({ navigation, route }) {
  const { dataEdit, typeName } = route.params;
  const [editData, setEditData] = useState({
    title: dataEdit.title,
    overview: dataEdit.overview,
    poster_path: dataEdit.poster_path,
    popularity: dataEdit.popularity,
    tags: dataEdit.tags,
  });

  const [editMovie] = useMutation(EDIT_MOVIE, {
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
      console.log('Movie Berhasil diedit');
      const dataNew = {
        __typename: typeName,
        _id: dataEdit._id,
        title: editData.title,
        overview: editData.overview,
        poster_path: editData.poster_path,
        popularity: +editData.popularity,
        tags: editData.tags,
      };
      const favorites = favoritesVar();
      let filtered = favorites.filter((data) => data._id !== dataEdit._id);
      // console.log(filtered, '<<<<<<< filter');
      const newUpdate = [...filtered, dataNew];
      favoritesVar(newUpdate);
      ToastAndroid.show(
        `Edit is successfully`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    },
  });

  const [editSerie] = useMutation(EDIT_SERIE, {
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
      console.log('Serie Berhasil diedit');
      const dataNew = {
        __typename: typeName,
        _id: dataEdit._id,
        title: editData.title,
        overview: editData.overview,
        poster_path: editData.poster_path,
        popularity: +editData.popularity,
        tags: editData.tags,
      };
      const favorites = favoritesVar();
      let filtered = favorites.filter((data) => data._id !== dataEdit._id);
      // console.log(filtered, '<<<<<<< filter');
      const newUpdate = [...filtered, dataNew];
      favoritesVar(newUpdate);
    },
  });

  const AddNewEdit = () => {
    console.log('Masuk EDIT');
    console.log(editData);
    if (typeName === 'Movie') {
      editMovie({
        variables: {
          input: {
            title: editData.title,
            overview: editData.overview,
            poster_path: editData.poster_path,
            popularity: +editData.popularity,
            tags: editData.tags,
          },
          id: dataEdit._id,
        },
      });
    } else if (typeName === 'Series') {
      editSerie({
        variables: {
          input: {
            title: editData.title,
            overview: editData.overview,
            poster_path: editData.poster_path,
            popularity: +editData.popularity,
            tags: editData.tags,
          },
          id: dataEdit._id,
        },
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* <Text>Halaman Edit</Text> */}
        {/* <Text>{JSON.stringify(dataEdit, null, 2)}</Text> */}
        {/* <Text>{JSON.stringify(editData.title)}</Text> */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            width: windowWidth - 100,
            marginVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#db0000',
          }}
        >
          Title
        </Text>
        <TextInput
          placeholder='Title'
          type='text'
          style={styles.textInput}
          label='Title'
          value={editData.title}
          onChangeText={(text) => setEditData({ ...editData, title: text })}
        />
        {/* <Text>{JSON.stringify(editData.overview)}</Text> */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            width: windowWidth - 100,
            marginVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#db0000',
          }}
        >
          Overview
        </Text>
        <TextInput
          placeholder='Overview'
          type='text'
          style={styles.textInput}
          label='Overview'
          value={editData.overview}
          onChangeText={(text) => setEditData({ ...editData, overview: text })}
        />
        {/* <Text>{JSON.stringify(editData.poster_path)}</Text> */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            width: windowWidth - 100,
            marginVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#db0000',
          }}
        >
          Poster Path
        </Text>
        <TextInput
          placeholder='Poster Path'
          type='text'
          style={styles.textInput}
          label='Poster Path'
          value={editData.poster_path}
          onChangeText={(text) =>
            setEditData({ ...editData, poster_path: text })
          }
        />
        {/* <Text>{JSON.stringify(editData.popularity)}</Text> */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            width: windowWidth - 100,
            marginVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#db0000',
          }}
        >
          Popularity
        </Text>

        <TextInput
          placeholder='Popularity'
          keyboardType='numeric'
          style={styles.textInput}
          label='Popularity'
          value={editData.popularity.toString()}
          onChangeText={(text) =>
            setEditData({ ...editData, popularity: text.toString() })
          }
        />
        {/* <Text>{JSON.stringify(editData.tags)}</Text> */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            width: windowWidth - 100,
            marginVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: '#db0000',
          }}
        >
          Tags
        </Text>
        <TextInput
          placeholder='Tags'
          style={styles.textInput}
          label='Tags (contoh:Action,Horor)'
          value={editData.tags.toString()}
          onChangeText={(text) =>
            setEditData({ ...editData, tags: text.split(',') })
          }
        />
        {/* perubahan array jangan disini kalo mau */}
        <TouchableOpacity style={styles.button} onPress={AddNewEdit}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
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
  textInput: {
    height: 40,
    width: windowWidth - 100,
    marginVertical: 5,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: windowWidth - 100,
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
