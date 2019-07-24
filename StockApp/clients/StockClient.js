import RestClient from 'react-native-rest-client';

// Client that is based off of this API
// https://iexcloud.io/docs/api/#key-stats
export default class StockClient extends RestClient {
    
    constructor() {
        // Initialize with your base URL
        super('https://sandbox.iexapis.com');
        this.token = "Tsk_b92fceb098ac4c2cb9bb2dbb226f0533";
        this.apiVersion = "v1";
    }

    // Sample REST call
    // https://sandbox.iexapis.com/v1/stock/MSFT/stats/?token=Tsk_b92fceb098ac4c2cb9bb2dbb226f0533
    getStockInfo(ticker) {
        // If the request is successful, you can return the expected object
        // instead of the whole response.
        return this.GET('/' + this.apiVersion + '/stock/' + ticker + '/stats/?token=' + this.token)
            .then(response => response);
    }

    // Sample REST call
    // https://sandbox.iexapis.com/v1/stock/MSFT/price/?token=Tsk_b92fceb098ac4c2cb9bb2dbb226f0533
    getStockPrice(ticker) {
        // If the request is successful, you can return the expected object
        // instead of the whole response.
        return this.GET('/' + this.apiVersion + '/stock/' + ticker + '/price/?token=' + this.token)
            .then(response => response);
    }

    // Sample REST call
    // https://sandbox.iexapis.com/v1/stock/MSFT/price/?token=Tsk_b92fceb098ac4c2cb9bb2dbb226f0533
    getStockPriceHistory(ticker, range) {
        // If the request is successful, you can return the expected object
        // instead of the whole response.
        return this.GET('/' + this.apiVersion + '/stock/' + ticker + '/chart/' + range + '/?token=' + this.token)
            .then(response => response);
    }

    // Sample REST call
    // https://sandbox.iexapis.com/v1/search/amazon/?token=Tsk_b92fceb098ac4c2cb9bb2dbb226f0533
    search(query) {
        return this.GET('/' + this.apiVersion + '/search/' + query + '/?token=' + this.token)
            .then(response => response);
    }
};