import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import StockClient from '../clients/StockClient';
import StockWatchClient from '../clients/StockWatchClient';

// Client Library
const stockClient = new StockClient();
const stockWatchClient = new StockWatchClient();

// This class is the main screen
export default class MainScreen extends Component {
    static navigationOptions =  ({ navigation }) => {
        const { params } = navigation.state;
        return {
            title: params ? params.screenTitle: 'Stock Analytics - Search',
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
            searchState: {
                search: ''
            },
            mode: "Search",
            loading: false,
            stockList: []
        };
    }

    // Updates the search
    updateSearch = search => {
        this.setState({
            loading: true,
            searchState: { search: search }
        });

        // Performs REST API Stock Quote Search
        if (search != null && search != '') {
            if (this.state.mode == "Watching") {
                // Filter on Watchlist
                var watchList = stockWatchClient.getWatchList();
                var filtered = [];
                watchList.forEach(stock => {
                    if (stock.symbol.toLowerCase().includes(search.toLowerCase()) || stock.securityName.toLowerCase().includes(search.toLowerCase())) {
                        filtered.push(stock);
                    }
                });

                // Update state
                this.setState({
                    loading: false,
                    stockList: filtered 
                });
            } else {
                // Search for stocks to add
                stockClient.search(search).then(
                    (data) => {
                        this.setState({
                                loading: false,
                                stockList: data 
                            });
                    }
                );
            }
        } else {
            if (this.state.mode == "Watching") {
                this.setState({
                    loading: false,
                    stockList: stockWatchClient.getWatchList() 
                });
            } else {
                this.setState({
                    loading: false,
                    stockList: [] 
                });
            }
        }
    };

    addOrRemoveWatch(item) {
        var isInWatch = stockWatchClient.isWatched(item.symbol);
        var list = this.state.stockList;
        
        this.setState({ stockList: [] });
        if (isInWatch) {
            alert('Removed watch: ' + item.symbol);
            stockWatchClient.removeWatch(item.symbol);
        } else {
            alert('Added watch: ' + item.symbol);
            stockWatchClient.addWatch(item.symbol, item);
        }

        if (this.state.mode == "Watching") {
            this.setState({ stockList: stockWatchClient.getWatchList() })
        } else {
            // This is a really dumb hack to get the buttons to refresh
            // Basically, we are setting rapidly so that the refresh will trigger
            var refreshList = []
            list.forEach(stock => {
                refreshList.push(stock);
                this.setState({ stockList: refreshList });
            });
        }

        return isInWatch;
    }

    renderWatchButton(item) {
        var button = (
            <Button
                onPress={(ev) => {
                    var watched = this.addOrRemoveWatch(item);
                    if (watched) {
                        ev.target.title = "Unwatch";
                    } else {
                        ev.target.title = "Watch";
                    }
                }}
            title={stockWatchClient.getButtonText(item.symbol)} />
        );

        return button;
    }

    // Render Main Screen
    render() {
        // Set search state
        const {search} = this.state.searchState;
        const {navigate} = this.props.navigation;

        return (
            <View style={MainStyles.container}>
                <View style={MainStyles.navbar}>
                  <Button 
                    containerViewStyle={{width: '100%', marginLeft: 0}}
                    onPress={() => {
                        this.setState({
                            searchState: {
                                search: ''
                            },
                            loading: false,
                            mode: "Search",
                            stockList: [] 
                        });
                        this.props.navigation.setParams({screenTitle: 'Stock Analytics - Search'});
                    }}
                    title="Search"
                  />
                  <Button
                    containerViewStyle={{width: '100%', marginLeft: 0}}
                    onPress={() => {
                        this.setState({
                            searchState: {
                                search: ''
                            },
                            loading: false,
                            mode: "Watching",
                            stockList: stockWatchClient.getWatchList() 
                        });
                        this.props.navigation.setParams({screenTitle: 'Stock Analytics - Watching'});
                    }}
                    title="Watching"
                  />
                </View>
                <View style={MainStyles.searchbar}>
                    <SearchBar
                        placeholder="Search for stocks..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                </View>
                <View style={MainStyles.stocklist}>
                    <FlatList
                        data={this.state.stockList}
                        renderItem={({item}) => (
                        <ListItem 
                            title={item.symbol}
                            subtitle={item.securityName}
                            onPress={() => {
                                navigate('StockView', {name: item.symbol});
                            }}
                            rightElement={this.renderWatchButton(item)} />)}
                        keyExtractor={item => item.symbol}
                    />
                </View>
            </View>
        );
    }
}

// Main Sheet
const MainStyles = StyleSheet.create({
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
      stocklist: {
        flex: 8
      }
  });
  