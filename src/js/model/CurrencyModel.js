class CurrencyModel{

    static url = "https://v6.exchangerate-api.com/v6/f0350ae0daa6c5c3da2e7c12/pair";

    constructor(){
        this.baseCode = "";
        this.targetCode = "";
        this.amount = "";
    }

    /**
     * Fetches the conversion rate for two currencies.
     * @param {string} baseCode Currency to convert from
     * @param {string} targetCode Currency to convert to
     * @returns {Promise} returns a promise that is resolved conversion result
     */
    fetchExchangeRate(baseCode, targetCode){

        const url = `${CurrencyModel.url}/${baseCode}/${targetCode}`;
        return $.ajax({url: url});
    }

    /**
     * Fetches the conversion rate and conversion result for two currencies.
     * @param {string} baseCode Currency to convert from
     * @param {string} targetCode Currency to convert to
     * @param {number} amount amount to be converted
     * @returns {Promise} returns a promise that is resolved conversion data.
     */
    fetchConversion(baseCode, targetCode, amount){
        const url = `${CurrencyModel.url}/${baseCode}/${targetCode}/${amount}`;
        return $.ajax({url: url});
    }
}

export default CurrencyModel;