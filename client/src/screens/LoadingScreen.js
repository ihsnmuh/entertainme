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
import netflix from '../../assets/netflixLoading.gif';

const windowWidth = Dimensions.get('window').width;

export default function LoadingScreen() {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={netflix}
          style={{
            width: windowWidth,
            height: windowWidth - 200,
            alignItems: 'center',
            margin: 20,
          }}
        />
        <StatusBar style='auto' />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231E1F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
