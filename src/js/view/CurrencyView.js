class CurrencyView {
	constructor() {
		this.amountField = $("main section.main .tab_contents .currency_converter .contents form .amount");
		this.fromField = $("main section.main .tab_contents .currency_converter .contents form .from");
		this.toField = $("main section.main .tab_contents .currency_converter .contents form .to");
		this.rate = $("main section.main .tab_contents .currency_converter .contents .result .rate p");
		this.conversion = $("main section.main .tab_contents .currency_converter .contents .result .conversion p");

		//support currencies
		this.codes = [
			{ code: "AED", currency: "UAE Dirham", country: "United Arab Emirates" },
			{ code: "AFN", currency: "Afghan Afghani", country: "Afghanistan" },
			{ code: "all", currency: "Albanian Lek", country: "Albanian" },
			{ code: "AMD", currency: "Armenian Dram", country: "Armenia" },
			{ code: "ANG", currency: "Netherlands Antillian Guilder", country: "Netherlands Antilles" },
		];
	}

	/**
	 * Populates the select element with currency information
	 */
	populateSelectElements() {
		for (const code of this.codes) {
			const option = `<option value=${code["code"]}>${code["currency"]} (${code["country"]})</option>`;
			this.fromField.append(option);
			this.toField.append(option);
		}
	}

	/**
	 * Displays the result to the page
	 * @param {object} resultObject object containing currency exchange result
	 */
	displayResults(resultObject) {
		if (Object.keys(resultObject).length) {
			const baseCode = resultObject["base_code"];
			const targetCode = resultObject["target_code"];
			const rate = resultObject["conversion_rate"];
			const result = "conversion_result" in resultObject ? resultObject["conversion_result"] : 0.0;

			this.rate.html(rate);
			this.conversion.html(`${targetCode} ${result}`);
		}
	}

	/**
	 * Registers event handlers for input fields
	 * @param {Function} handleSelect handler for select element
	 * @param {Function} handleAmountField handler for input element
	 */
	registerEvents(handleSelect, handleAmountField) {
		this.amountField.on("change", handleAmountField);
		this.toField.on("change", handleSelect);
		this.fromField.on("change", handleSelect);
	}
}

export default CurrencyView;
