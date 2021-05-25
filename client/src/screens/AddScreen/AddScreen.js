import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function AddScreen({ navigation }) {
  const moveToAddMovie = () => navigation.navigate('AddMovie');
  const moveToAddSerie = () => navigation.navigate('AddSerie');

  return (
    <>
      <View style={styles.container}>
        <Text>Halaman Add New</Text>
        <TouchableOpacity style={styles.button} onPress={moveToAddMovie}>
          <Text style={styles.buttonText}>Add Movie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={moveToAddSerie}>
          <Text style={styles.buttonText}>Add Serie</Text>
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
