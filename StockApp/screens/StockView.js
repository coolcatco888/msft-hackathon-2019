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
            stats: {
                companyName: '',
                peRatio: 0.0,
                week52change: 0.0,
                week52high: 0.0,
                week52low: 0.0,
            },
            chart: [],
        }
        var ticker = this.state.params.ticker;
        this.state.ticker = ticker;
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
                    <Text style={StockViewStyles.colheader}>Symbol</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.ticker}</Text>
                    </View>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>Price</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.price}</Text>
                    </View>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>P/E Ratio</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.stats.peRatio}</Text>
                    </View>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>52 Week Change</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.stats.week52change}</Text>
                    </View>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>52 Week High</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.stats.week52high}</Text>
                    </View>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>52 Week Low</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.stats.week52low}</Text>
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
        flex: 5
      },
      navbar: {
        flex: 1,
        backgroundColor: '#349beb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      stockInfo: {
        flex: 6
      },
      stockInfoRow: {
        flex: 1,
        flexDirection: 'row'
      },
      colheader: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20
      },
      coldata: {
        flex: 1,
        textAlign: 'right',
        fontSize: 20
      }
  });