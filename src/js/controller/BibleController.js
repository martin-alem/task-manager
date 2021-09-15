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
            this.bibleView.populateBookSelectInput(books);
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
        this.bibleView.populateChapterSelectInput(chapter);
        this.bibleView.populateVerseSelectInput(0);

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
            this.bibleView.populateVerseSelectInput(verse);
    
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
            this.bibleView.displayBibleData(this.bibleModel.book, this.bibleModel.chapter, this.bibleModel.verse, bibleObject["text"]);

        } catch (error) {
            console.error(error.message);
        }

    }


    init() {
        this.bibleView.registerEvents(this._handleBookSelection, this._handleChapterSelection, this._handleVerseSelection);
        this._loadAllBooks();
    }
}

const bibleController = new BibleController();
export default bibleController;