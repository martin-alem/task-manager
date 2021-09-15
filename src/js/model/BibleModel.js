class BibleModel{

    static allBooksURL = "https://www.abibliadigital.com.br/api/books";
    static verseURL = "https://www.abibliadigital.com.br/api/verses";

    constructor(){
        this.book = "";
        this.chapter = "";
        this.verse = "";
        this.abbreviation = "";
    }

    /**
     * Fetches all 66 books of the bible
     * @returns {Promise} returns a promise that is resolved with all bible books
     */
    fetchAllBooks() {
        return $.ajax({url: BibleModel.allBooksURL});
    }

    /**
     * Return the number of verses for a book in the bible for a given chapter
     * @param {string} book book of the bible
     * @param {number} chapter chapter of the book
     * @returns {Promise} returns a promise that is resolved with all verses of the book in a chapter
     */
    fetchVerses(book, chapter) {
        const url = `${BibleModel.verseURL}/kjv/${book}/${chapter}`;
        return $.ajax({url: url});
    }

    /**
     * Returns an object containing a specific verse.
     * @param {string} book book of the bible
     * @param {number} chapter chapter of the book
     * @param {number} verse verse of the chapter
     * @returns {Promise} returns a promise that is resolved with an object containing a specific verse.
     */
    fetchBible(book, chapter, verse) {
        const url = `${BibleModel.verseURL}/kjv/${book}/${chapter}/${verse}`;
        return $.ajax({url: url});
    }

}

export default BibleModel;