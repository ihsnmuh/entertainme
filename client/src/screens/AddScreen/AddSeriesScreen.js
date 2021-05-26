import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Dimensions,
} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {
  ADD_SERIE,
  GET_HOMEPAGE_DATA,
  GET_SERIES_DATA,
} from '../../graphql/queries';

const windowWidth = Dimensions.get('window').width;

export default function AddSerieScreen({ navigation }) {
  const [addNewSerie, { data, loading, error }] = useMutation(ADD_SERIE, {
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
      console.log('Serie Berhasil ditambahkan');
      ToastAndroid.show(
        `New serie successfully added`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    },
  });

  const [input, setInput] = React.useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: '',
  });

  const AddNewInput = () => {
    console.log('Data masuk');
    // alert(JSON.stringify(input));

    let newData = {
      title: input.title,
      overview: input.overview,
      poster_path: input.poster_path,
      popularity: +input.popularity,
      tags: input.tags.split(','),
    };

    addNewSerie({
      variables: {
        input: newData,
      },
    });
  };

  if (loading) return <Text>Loading... </Text>;

  return (
    <>
      <View style={styles.container}>
        {/* <Text>Halaman Add</Text>
        <Text>{JSON.stringify(input.title)}</Text> */}
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
          value={input.title}
          onChangeText={(text) => setInput({ ...input, title: text })}
        />
        {/* <Text>{JSON.stringify(input.overview)}</Text> */}
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
          value={input.overview}
          onChangeText={(text) => setInput({ ...input, overview: text })}
        />
        {/* <Text>{JSON.stringify(input.poster_path)}</Text> */}
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
          placeholder='/xGuOF1T3WmPsAcQEQJfnG7Ud9f8.jpg'
          type='text'
          style={styles.textInput}
          label='Poster Path'
          value={input.poster_path}
          onChangeText={(text) => setInput({ ...input, poster_path: text })}
        />
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
        {/* <Text>{JSON.stringify(input.popularity)}</Text> */}
        <TextInput
          placeholder='Popularity (ex: 4614.697)'
          keyboardType='numeric'
          style={styles.textInput}
          label='Popularity'
          value={input.popularity}
          onChangeText={(text) =>
            setInput({ ...input, popularity: text.toString() })
          }
        />
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
        {/* <Text>{JSON.stringify(input.tags)}</Text> */}
        <TextInput
          placeholder='Tags (ex: Action,Horor,Adventure)'
          style={styles.textInput}
          label='Tags'
          value={input.tags}
          onChangeText={(text) => setInput({ ...input, tags: text })}
        />
        <TouchableOpacity style={styles.button} onPress={AddNewInput}>
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
    width: windowWidth - 100,
    marginVertical: 5,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
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
