import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './src/graphql/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import FavoritesScreen from './src/screens/FavoriteScreen/FavoriteScreen';
import MoviesScreen from './src/screens/MovieScreen/MoviesScreen';
import TVSeriesScreen from './src/screens/TvSeriesScreen/TVSeriesScreen';
import LoginScreen from './src/screens/LoginScreen';
import DetailScreen from './src/screens/DetailScreen/DetailScreen';
import AddScreen from './src/screens/AddScreen/AddScreen';
import AddMovieScreen from './src/screens/AddScreen/AddMovieScreen';
import AddSeriesScreen from './src/screens/AddScreen/AddSeriesScreen';
import EditScreen from './src/screens/EditScreen/EditScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabNavigation() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#db0000',
          inactiveTintColor: 'gray',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#fff',
        }}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Favorites' component={FavoritesScreen} />
        <Tab.Screen name='Add' component={AddScreen} />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    // <PaperProvider>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Home'
            component={HomeTabNavigation}
            options={{
              title: 'NETPLIK!',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#db0000',
              },
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='TvSeries'
            component={TVSeriesScreen}
            options={{
              title: 'TV Series',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#db0000',
              },
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Movies'
            component={MoviesScreen}
            options={{
              title: 'Movies',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#db0000',
              },
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Favorites'
            component={FavoritesScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Add'
            component={AddScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='AddMovie'
            component={AddMovieScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='AddSerie'
            component={AddSeriesScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='EditMovie'
            component={EditScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Detail'
            component={DetailScreen}
            // options={{ headerShown: false }}
            options={{
              title: 'Detail',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#db0000',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
    // </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
