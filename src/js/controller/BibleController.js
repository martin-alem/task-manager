import BibleModel from "../model/BibleModel.js";
import BibleView from "../view/BibleView.js";

class BibleController{

    constructor(){
        this.bibleModel = new BibleModel();
        this.bibleView = new BibleView();

        this._handleBookSelection = this._handleBookSelection.bind(this);
        this._handleChapterSelection = this._handleChapterSelection.bind(this);
        this._handleVerseSelection = this._handleVerseSelection.bind(this);
    }

    /**
     * Loads all 66 books from the API.
     * Populates the book select element.
     */
    async _loadAllBooks(){
        try {
            const books = await this.bibleModel.fetchAllBooks();
            this._populateBookSelectInput(books);
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * Handles changes in the book select element
     * @param {Event} event event object
     */
    _handleBookSelection(event){
        event.preventDefault();
        const index = event.target.options.selectedIndex;
        const abbreviation = event.target.options[index].value;
        const chapter = parseInt(event.target.options[index].dataset.chapter);
        this._populateChapterSelectInput(chapter);
        this._populateVerseSelectInput(0);

        this.bibleModel.abbreviation = abbreviation;

    }

    /**
     * Handles changes in the chapter select element
     * @param {Event} event event object
     */
    async _handleChapterSelection(event){
        event.preventDefault();
        try {
            const index = event.target.options.selectedIndex;
            const chapter = parseInt(event.target.options[index].value);
            const bibleObject = await this.bibleModel.fetchVerses(this.bibleModel.abbreviation, chapter);
            const verse = bibleObject["chapter"]["verses"];
            this._populateVerseSelectInput(verse);
    
            this.bibleModel.chapter = chapter;
            this.bibleModel.book = bibleObject["book"]["name"];
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Handles changes in verse select element
     * @param {event} event event object
     */
    async _handleVerseSelection(event){
        event.preventDefault();
        try {
            const index = event.target.options.selectedIndex;
            const verse = parseInt(event.target.options[index].value);
            this.bibleModel.verse = verse;

            const bibleObject = await this.bibleModel.fetchBible(this.bibleModel.abbreviation, this.bibleModel.chapter, this.bibleModel.verse);
            this._displayBibleData(this.bibleModel.book, this.bibleModel.chapter, this.bibleModel.verse, bibleObject["text"]);

        } catch (error) {
            console.error(error.message);
        }

    }

    /**
     * Populates the book select element with 66 books of the bible
     * @param {Array} books Array of all 66 books in the bibleView
     */
    _populateBookSelectInput(books){
        this.bibleView.bookSelectInput.empty();
        this.bibleView.bookSelectInput.append(`<option data-chapter="0" value ="" select>Select A Book</option>`);
        for(const book of books){
            const option = `<option data-chapter="${book.chapters}" value="${book.abbrev.en}">${book.name}</option>`;
            this.bibleView.bookSelectInput.append(option);
        }
    }

    /**
     * Populates the chapter select element with the number of chapters in a book
     * @param {number} chapter number of chapters
     */
    _populateChapterSelectInput(chapter){
        this.bibleView.chapterSelectInput.empty();
        this.bibleView.chapterSelectInput.append(`<option value ="" select>Select A Chapter</option>`);
        for(let i = 1; i <= chapter; i++){
            const option = `<option value="${i}">${i}</option>`;
            this.bibleView.chapterSelectInput.append(option);
        }
    }

    /**
     * Populates the Verse select element with the number of verses in a chapter
     * @param {number} verse number of verse in a chapter
     */
    _populateVerseSelectInput(verse){
        this.bibleView.verseSelectInput.empty();
        this.bibleView.verseSelectInput.append(`<option value ="" select>Select A Verse</option>`);
        for(let i = 1; i <= verse; i++){
            const option = `<option value="${i}">${i}</option>`;
            this.bibleView.verseSelectInput.append(option);
        }
    }

    /**
     * Displays the Book, chapter, verse and text on the page.
     * @param {string} book Book of the bible
     * @param {number} chapter Number of chapters of a specific book
     * @param {number} verse Number of verses in a chapter 
     * @param {string} text the actual verse
     */
    _displayBibleData(book, chapter, verse, text) {
        const template = `
        <h1>${book}</h1>
        <div class="more">
            <p class="chapter">Chapter: ${chapter}</p>
            <p class="verse">Verse: ${verse}</p>
        </div>
        <hr>
            <p class="text">${text}</p>
        <hr>`;

        this.bibleView.resultContainer.html(template);
    }


    init() {
        this.bibleView.registerEvents(this._handleBookSelection, this._handleChapterSelection, this._handleVerseSelection);
        this._loadAllBooks();
    }
}

const bibleController = new BibleController();
export default bibleController;