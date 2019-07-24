import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import StockViewScreen from './screens/StockView';
import MainScreen from './screens/Main';

// Testing
// https://snack.expo.io/Syswls7fr

// Creates navigator
const RootStack = createStackNavigator({
  Main: { screen: MainScreen },
  StockView: { screen: StockViewScreen }
});

// Creates App container
const AppContainer = createAppContainer(RootStack);

// Main app class
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}