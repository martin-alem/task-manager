/**
 * Wrapper class for window.localStorage
 * Implemented with the Singleton Design pattern
 */
class LocalStorage {
	constructor() {
		this.LocalStorage = window.localStorage;
	}

	/**
	 * Persist data to localStorage
	 * @param {any} key key to map to data being stored
	 * @param {any} data actual data being stored
	 * @returns {boolean} returns true if data was successfully stored and false otherwise.
	 */
	addData(key, data) {
		if (this.LocalStorage) {
			this.LocalStorage.setItem(key, JSON.stringify(data));
			return true;
		}
		return false;
	}

	/**
	 * Retrieves data from local storage
	 * @param {any} key key used to access data
	 * @returns {any} returns the data if it key exist and null otherwise.
	 */
	getData(key) {
		if (this.LocalStorage.getItem(key)) {
			const data = this.LocalStorage.getItem(key);
			return JSON.parse(data);
		}
		return null;
	}

	/**
	 * Removes data from local storage
	 * @param {any} key key used to remove data
	 * @returns {boolean} returns true if data was removed and false otherwise
	 */
	removeData(key) {
		if (this.LocalStorage.getItem(key)) {
			this.LocalStorage.removeItem(key);
			return true;
		}
		return false;
	}
}

/**
 * Single instance of local storage
 */
const wLocalStorage = new LocalStorage();

class WLocalStorage {
	constructor() {
		return wLocalStorage;
	}
}

export default WLocalStorage;
