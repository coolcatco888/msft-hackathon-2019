import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

// This class is the main screen
export default class Main extends Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

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
                </View>
            </View>
        );
    }
}

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
  