import React, { Component } from 'react';
import { Button, Text, StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit'
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
            chart: [
                {
                    date: "01-01-1970",
                    close: 0.0
                },
                {
                    date: "01-02-1970",
                    close: 0.0
                },
                {
                    date: "01-03-1970",
                    close: 0.0
                },
                {
                    date: "01-04-1970",
                    close: 0.0
                },
                {
                    date: "01-05-1970",
                    close: 0.0
                }
            ],
        }
        var ticker = this.state.params.ticker;
        this.state.ticker = ticker;
        stockClient.getStockPrice(ticker).then((item) => this.setState({ price: item }));
        stockClient.getStockInfo(ticker).then((item) => this.setState({ stats: item }));
        stockClient.getStockPriceHistory(ticker, '5d').then((item) => this.setState({ chart: item }));
    }

    render() {
        // Get stock stats
        const { navigation } = this.props;

        return (
            <View style={StockViewStyles.container}>
                <View style={StockViewStyles.chart}>
                    <LineChart
                        data={{
                            labels: this.state.chart.map(x => x.date),
                            datasets: [{
                                data: this.state.chart.map(x => x.close)
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={200}
                        yAxisLabel={'$'}
                        chartConfig={{
                            backgroundColor: '#474747',
                            backgroundGradientFrom: '#1884d6',
                            backgroundGradientTo: '#1062a1',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                            borderRadius: 16
                            }
                        }}
                        />
                </View>
                <View style={StockViewStyles.navbar}>
                </View>
                <View style={StockViewStyles.stockInfo}>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>Symbol</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.ticker}</Text>
                    </View>
                    <View style={StockViewStyles.stockInfoRow}>
                        <Text style={StockViewStyles.colheader}>Company Name</Text>
                        <Text style={StockViewStyles.coldata}>{this.state.stats.companyName}</Text>
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
                        <Text style={StockViewStyles.coldata}>{this.state.stats.week52change.toFixed(3)}</Text>
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
        flex: 4
      },
      navbar: {
        flex: 1,
        backgroundColor: '#349beb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      stockInfo: {
        flex: 7
      },
      stockInfoRow: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        borderBottomColor: '#1062a1',
        borderBottomWidth : 2
      },
      colheader: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#474747'
      },
      coldata: {
        flex: 1,
        textAlign: 'right',
        fontSize: 20,
        color: '#474747'
      }
  });