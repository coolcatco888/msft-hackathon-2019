import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import StockClient from '../clients/StockClient';
import StockWatchClient from '../clients/StockWatchClient';

// This class is the main screen
const stockClient = new StockClient();
const stockWatchClient = new StockWatchClient();

export default class Main extends Component {
    static navigationOptions = {
        title: 'Stock Analytics - Search',
        headerStyle: {
            backgroundColor: '#349beb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
    };
    constructor() {
        super();
        this.state = {
            searchState: {
                search: ''
            },
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
            stockClient.search(search).then(
                (data) => {
                    this.setState({
                            loading: false,
                            stockList: data 
                        });
                }
            )
        } else {
            this.setState({
                loading: false,
                stockList: [] 
            });
        }
    };



    async addOrRemoveWatch(item, button) {
        var isInWatch = stockWatchClient.isWatched(item.symbol);

        if (isInWatch == true) {
            stockWatchClient.removeWatch(item.symbol);
            button.title = "Watch";
        } else {
            stockWatchClient.addWatch(item.symbol, item);
            button.title = "Unwatch";
        }
    }

    renderWatchButton(item) {
        var button = (
            <Button
                title="Watch" />
        );

        // var button = new Button();

        // Setup onpress
        button.onPress = () => {
            alert('Pressed! ' + item.symbol);
            this.addOrRemoveWatch(item, button);
        }

        // Setup Title
        stockWatchClient.isWatched(item.symbol).then(isWatched => {
            if (isWatched == true) {
                button.title = "Unwatch";
            } else {
                button.title = "Watch";
            }
        });

        return button;
    }

    // Render Main Screen
    render() {
        // Set search state
        const { search } = this.state.searchState;

        return (
            <View style={MainStyles.container}>
                <View style={MainStyles.navbar}>
                  <Button 
                    containerViewStyle={{width: '100%', marginLeft: 0}}
                    onPress={() => {
                    }}
                    title="Search"
                  />
                  <Button
                    containerViewStyle={{width: '100%', marginLeft: 0}}
                    onPress={() => {
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
  