import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './screens/Main';

// Testing
// https://snack.expo.io/Syswls7fr

// Creates navigator
const RootStack = createStackNavigator(
  {
    Main: Main
  }, 
  {
    initialRouteName: 'Main',
  }
);

// Creates App container
const AppContainer = createAppContainer(RootStack);

// Main app class
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}