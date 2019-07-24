import { AsyncStorage } from "react-native";

// Client That maintains watchlist
// This persists the data to disk
export default class StockWatchClient {

    // constructor initialize
    constructor() {
        this.stockWatchList = {};

        try {
            var keys = AsyncStorage.getAllKeys().then((foundKeys) => {
                if (foundKeys != null) {
                    foundKeys.forEach((key) => {
                        // Parse and add items back to watchlist
                        AsyncStorage.getItem(key).then(item => {
                            this.stockWatchList[key] =  JSON.parse(item);
                        });
                    });
                }
            });
        } catch (error) {
            // Error retrieving from storage
        }
    }

    // add a watch
    addWatch(ticker, item) {
        try {
            this.stockWatchList[ticker] = item;
            AsyncStorage.setItem(ticker, JSON.stringify(item));
        } catch (error) {
            // Error saving data
        }
    }

    // get a watch
    getWatch(ticker) {
        return this.stockWatchList[ticker];
    }

    // Gets whether a stock is watched or not
    isWatched(ticker) {
        return this.getWatch(ticker) != null;
    }

    getButtonText(ticker) {
        if (this.isWatched(ticker)) {
            return "Unwatch";
        } else {
            return "Watch";
        }
    }

    // get watch list
    getWatchList() {
        return Object.values(this.stockWatchList);
    }

    // remove watch
    removeWatch(ticker) {
        try {
            delete this.stockWatchList[ticker];
            AsyncStorage.removeItem(ticker);
        } catch (error) {
            // Error removing data
        }
    }
}