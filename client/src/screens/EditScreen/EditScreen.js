import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  GET_HOMEPAGE_DATA,
  EDIT_MOVIE,
  GET_MOVIES_DATA,
  EDIT_SERIE,
  GET_SERIES_DATA,
} from '../../graphql/queries';

export default function EditScreen({ navigation, route }) {
  const { dataEdit, typeName } = route.params;

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
    },
  });

  const [editData, setEditData] = useState({
    title: dataEdit.title,
    overview: dataEdit.overview,
    poster_path: dataEdit.poster_path,
    popularity: dataEdit.popularity,
    tags: dataEdit.tags,
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
        <Text>Halaman Edit</Text>
        <Text>{JSON.stringify(dataEdit, null, 2)}</Text>
        <Text>{JSON.stringify(editData.title)}</Text>
        <TextInput
          placeholder='Title'
          type='text'
          style={styles.textInput}
          label='Title'
          value={editData.title}
          onChangeText={(text) => setEditData({ ...editData, title: text })}
        />
        <Text>{JSON.stringify(editData.overview)}</Text>
        <TextInput
          placeholder='Overview'
          type='text'
          style={styles.textInput}
          label='Overview'
          value={editData.overview}
          onChangeText={(text) => setEditData({ ...editData, overview: text })}
        />
        <Text>{JSON.stringify(editData.poster_path)}</Text>
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
        <Text>{JSON.stringify(editData.popularity)}</Text>
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
        <Text>{JSON.stringify(editData.tags)}</Text>
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
          <Text style={styles.buttonText}>Submit</Text>
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
    width: 300,
    marginVertical: 5,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#2978b5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: 150,
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
