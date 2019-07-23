import { AsyncStorage } from "react-native";

// Client That maintains watchlist
// This persists the data to disk
export default class StockWatchClient {

    // add a watch
    async addWatch(ticker, item) {
        try {
            await AsyncStorage.setItem(ticker, JSON.stringify(item));
        } catch (error) {
            // Error saving data
        }
    }

    // get a watch
    async getWatch(ticker) {
        try {
            return await AsyncStorage.getItem(ticker);
        } catch (error) {
            // Error removing data
            return null;
        }
    }

    // Gets whether a stock is watched or not
    async isWatched(ticker) {
        return (await this.getWatch(ticker)) == null;
    }

    // get watch list
    async getWatchList() {
        var watchList = [];
        try {
            var keys = await AsyncStorage.getAllKeys();
            if (keys != null) {
                keys.forEach((item) => {
                    // Parse and add items back to watchlist
                    watchList.push(JSON.parse(item));
                });
            }
        } catch (error) {
            // Error retrieving from storage
        }

        return watchList;
    }

    // remove watch
    async removeWatch(ticker) {
        try {
            await AsyncStorage.removeItem(ticker);
        } catch (error) {
            // Error removing data
        }
    }
}