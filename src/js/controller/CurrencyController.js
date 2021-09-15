import CurrencyModel from "../model/CurrencyModel.js";
import CurrencyView from "../view/CurrencyView.js";

class CurrencyController{

    constructor(){
        this.currencyModal = new CurrencyModel();
        this.currencyView = new CurrencyView();

        this._handleAmountInput = this._handleAmountInput.bind(this);
        this._handleSelect = this._handleSelect.bind(this);
    }

    /**
     * Handles changes in input form field
     * @param {Event} event event object
     */
    _handleAmountInput(event){
        event.preventDefault();
        const amount = event.target.value;

        if(this._validateAmount(amount)){
            this.currencyModal.amount = amount;
            this._callAPI("amount");
        }
    }

    /**
     * Handles changes in select form field
     * @param {Event} event event object
     */
    _handleSelect(event){
        event.preventDefault();
        const index = event.target.options.selectedIndex;
        const code = event.target.options[index].value;
        const type = event.target.id;

        if(type === "base"){
            this.currencyModal.baseCode = code;
            this._callAPI("base");
        }
        else if(type === "target"){
            this.currencyModal.targetCode = code;
            this._callAPI("target");
        }
    }

    /**
     * Determines which API endpoint to call base the type and values of form fields
     * @param {string} type
     */
    async _callAPI(type){

        let result = {};

        try {

            if(type === "base"){
                if(this.currencyModal.targetCode && !this.currencyModal.amount){
                    result = await this.currencyModal.fetchExchangeRate(this.currencyModal.baseCode, this.currencyModal.targetCode);
                }
                else if(this.currencyModal.targetCode && this.currencyModal.amount){
                    result = await this.currencyModal.fetchConversion(this.currencyModal.baseCode, this.currencyModal.targetCode, this.currencyModal.amount);
                }
            }
            else if(type === "target"){
                if(this.currencyModal.baseCode && !this.currencyModal.amount){
                    result = await this.currencyModal.fetchExchangeRate(this.currencyModal.baseCode, this.currencyModal.targetCode);
                }
                else if(this.currencyModal.baseCode && this.currencyModal.amount){
                    result = await this.currencyModal.fetchConversion(this.currencyModal.baseCode, this.currencyModal.targetCode, this.currencyModal.amount);
                }
            }
            else{
                if(this.currencyModal.baseCode && this.currencyModal.targetCode){
                    result = await this.currencyModal.fetchConversion(this.currencyModal.baseCode, this.currencyModal.targetCode, this.currencyModal.amount);
                }
            }
    
            this.currencyView.displayResults(result);
            
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * try's to convert and validate the amount
     * @param {string} amount amount to be validated
     * @returns {boolean} true if the amount can be converted to a number, false otherwise
     */
    _validateAmount(amount){
        return parseInt(amount, 10);
    }

    init(){
        this.currencyView.registerEvents(this._handleSelect, this._handleAmountInput);
        this.currencyView.populateSelectElements();
    }
}

const currencyController = new CurrencyController();
export default currencyController;