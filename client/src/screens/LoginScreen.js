import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import netflix from '../../assets/netflix.gif';

const windowWidth = Dimensions.get('window').width;

export default function LoginScreen({ navigation }) {
  const moveToMain = () => navigation.replace('Home');

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginVertical: 20,
            borderBottomWidth: 3,
            borderBottomColor: '#db0000',
          }}
        >
          NETPLIK
        </Text>
        <Image
          source={netflix}
          style={{
            width: windowWidth - 80,
            height: windowWidth - 100,
            alignItems: 'center',
            margin: 20,
          }}
        />
        <TouchableOpacity style={styles.button} onPress={moveToMain}>
          <Text style={styles.buttonText}>Home</Text>
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
    backgroundColor: '#db0000',
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
