import React, { Component } from 'react';
import { Button, StyleSheet, View, FlatList } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import StockClient from '../clients/StockClient';

// This class is the main screen
const stockClient = new StockClient();

export default class Main extends Component {

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

    // Render Main Screen
    render() {
        // Set search state
        const { search } = this.state.searchState;

        return (
            <View style={MainStyles.container}>
                <View style={MainStyles.navbar}>
                  <Button 
                    style={MainStyles.navbutton}
                    onPress={() => {
                    }}
                    title="Home"
                  />
                  <Button
                    style={MainStyles.navbutton}
                    onPress={() => {
                    }}
                    title="Watching"
                  />
                </View>
                <View style={MainStyles.searchbar}>
                    <SearchBar
                        placeholder="Type Here..."
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
                                subtitle={item.securityName} />)}
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
        flex: 5
      },
      navbutton: {
      }
  });
  