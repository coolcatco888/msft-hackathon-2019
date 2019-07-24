import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import StockClient from '../clients/StockClient';
import StockWatchClient from '../clients/StockWatchClient';

const stockClient = new StockClient();
const stockWatchClient = new StockWatchClient();

export default class StockViewScreen extends Component {
    static navigationOptions =  ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.ticker : 'Stock View',
            headerStyle: {
                backgroundColor: '#349beb',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };

    constructor() {
        super();
        this.state = {
            ticker: 'MSFT',
            price: 0,
            stats: [],
            chart: [],
            
        }

    }

    render() {
        // Get stock stats
        const { navigation } = this.props;
        var ticker = navigation.getParam('ticker', 'MSFT');
        var price = stockClient.getStockPrice(ticker);
        var stats = stockClient.getStockInfo(ticker);
        var chart = stockClient.getStockPriceHistory(ticker, '1m');
        this.state = {
            ticker: ticker,
            price: price,
            stats: stats,
            chart: chart
        };

        return (
            <View style={StockViewStyles.container}>
                <View style={StockViewStyles.chart}>
                </View>
                <View style={StockViewStyles.navbar}>
                </View>
                <View style={StockViewStyles.stockInfo}>
                    <View style={StockViewStyles.container}>
                        <View style={StockViewStyles.coldata}>
                        </View>
                        <View style={StockViewStyles.coldata}>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.stockList}
                        renderItem={({item}) => (
                            <View style={StockViewStyles.container}>
                                <View style={StockViewStyles.coldata}>
                                </View>
                                <View style={StockViewStyles.coldata}>
                                </View>
                            </View>)}
                        keyExtractor={item => item.symbol}
                    />

                </View>
            </View>
            );
    }
}

// Main Sheet
const StockViewStyles = StyleSheet.create({
    container: {
        flex: 1
      },
      chart: {
        flex: 3
      },
      navbar: {
        flex: 1,
        backgroundColor: '#349beb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      stockInfo: {
        flex: 8
      },
      coldata: {
        flex: 1
      }
  });