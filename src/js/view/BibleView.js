class BibleView {
	constructor() {
		this.bookSelectInput = $("main section.main .tab_contents .bible .contents .select_element .book");
		this.chapterSelectInput = $("main section.main .tab_contents .bible .contents .select_element .chapter");
		this.verseSelectInput = $("main section.main .tab_contents .bible .contents .select_element .verse");
		this.resultContainer = $("main section.main .tab_contents .bible .contents .result");
	}

	/**
	 * Populates the book select element with 66 books of the bible
	 * @param {Array} books Array of all 66 books in the bibleView
	 */
	populateBookSelectInput(books) {
		this.bookSelectInput.empty();
		this.bookSelectInput.append(`<option data-chapter="0" value ="" select>Select A Book</option>`);
		for (const book of books) {
			const option = `<option data-chapter="${book.chapters}" value="${book.abbrev.en}">${book.name}</option>`;
			this.bookSelectInput.append(option);
		}
	}

	/**
	 * Populates the chapter select element with the number of chapters in a book
	 * @param {number} chapter number of chapters
	 */
	populateChapterSelectInput(chapter) {
		this.chapterSelectInput.empty();
		this.chapterSelectInput.append(`<option value ="" select>Select A Chapter</option>`);
		for (let i = 1; i <= chapter; i++) {
			const option = `<option value="${i}">${i}</option>`;
			this.chapterSelectInput.append(option);
		}
	}

	/**
	 * Populates the Verse select element with the number of verses in a chapter
	 * @param {number} verse number of verse in a chapter
	 */
	populateVerseSelectInput(verse) {
		this.verseSelectInput.empty();
		this.verseSelectInput.append(`<option value ="" select>Select A Verse</option>`);
		for (let i = 1; i <= verse; i++) {
			const option = `<option value="${i}">${i}</option>`;
			this.verseSelectInput.append(option);
		}
	}

	/**
	 * Displays the Book, chapter, verse and text on the page.
	 * @param {string} book Book of the bible
	 * @param {number} chapter Number of chapters of a specific book
	 * @param {number} verse Number of verses in a chapter
	 * @param {string} text the actual verse
	 */
	displayBibleData(book, chapter, verse, text) {
		const template = `
        <h1>${book}</h1>
        <div class="more">
            <p class="chapter">Chapter: ${chapter}</p>
            <p class="verse">Verse: ${verse}</p>
        </div>
        <hr>
            <p class="text">${text}</p>
        <hr>`;

		this.resultContainer.html(template);
	}

	/**
	 * Register event handlers for each select element
	 * @param {Function} bookSelectionHandler Book Select Handler
	 * @param {Function} chapterSelectionHandler Chapter Select Handler
	 * @param {Function} verseSelectionHandler Verse Select Handler
	 */
	registerEvents(bookSelectionHandler, chapterSelectionHandler, verseSelectionHandler) {
		this.bookSelectInput.on("change", bookSelectionHandler);
		this.chapterSelectInput.on("change", chapterSelectionHandler);
		this.verseSelectInput.on("change", verseSelectionHandler);
	}
}

export default BibleView;
