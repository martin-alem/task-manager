class BibleView{

    constructor(){
        this.bookSelectInput = $("main section.main .tab_contents .bible .contents .select_element .book");
        this.chapterSelectInput = $("main section.main .tab_contents .bible .contents .select_element .chapter");
        this.verseSelectInput = $("main section.main .tab_contents .bible .contents .select_element .verse");
        this.resultContainer = $("main section.main .tab_contents .bible .contents .result");
    }

    /**
     * Register event handlers for each select element
     * @param {Function} bookSelectionHandler Book Select Handler
     * @param {Function} chapterSelectionHandler Chapter Select Handler
     * @param {Function} verseSelectionHandler Verse Select Handler
     */
    registerEvents(bookSelectionHandler, chapterSelectionHandler,verseSelectionHandler){
        this.bookSelectInput.on("change",bookSelectionHandler);
        this.chapterSelectInput.on("change",chapterSelectionHandler);
        this.verseSelectInput.on("change",verseSelectionHandler);
    }
}

export default BibleView;