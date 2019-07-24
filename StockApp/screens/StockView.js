import React, { Component } from 'react';
import { Button, Text, StyleSheet, View, FlatList } from 'react-native';
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

    constructor(props) {
        super(props);
        this.state = {
            params: props.navigation.state.params,
            ticker: 'MSFT',
            price: 0,
            stats: [],
            chart: [],
        }
        var ticker = this.state.params.ticker;
        stockClient.getStockPrice(ticker).then((item) => this.setState({ price: item }));
        stockClient.getStockInfo(ticker).then((item) => this.setState({ stats: item }));
        stockClient.getStockPriceHistory(ticker, '1m').then((item) => this.setState({ chart: item }));
    }

    render() {
        // Get stock stats
        const { navigation } = this.props;

        return (
            <View style={StockViewStyles.container}>
                <View style={StockViewStyles.chart}>
                </View>
                <View style={StockViewStyles.navbar}>
                </View>
                <View style={StockViewStyles.stockInfo}>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>Price</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.price}</Text>
                    </View>
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
      stockInfoRow: {
        flex: 1,
        flexDirection: 'column'
      },
      colheader: {
        flex: 1
      },
      coldata: {
        flex: 1
      }
  });