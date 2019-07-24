import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import StockClient from '../clients/StockClient';
import StockWatchClient from '../clients/StockWatchClient';

const stockClient = new StockClient();
const stockWatchClient = new StockWatchClient();

export default class StockViewScreen extends Component {

    render() {
        return (
            <View style={StockViewStyles.container}>

            </View>
            );
    }
}

// Main Sheet
const StockViewStyles = StyleSheet.create({
    container: {
        flex: 1,
      },
      navbar: {
        flex: 1,
        backgroundColor: '#349beb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      searchbar: {
        flex: 1,
        backgroundColor: '#dedede',
      },
      stockInfo: {
        flex: 8
      }
  });