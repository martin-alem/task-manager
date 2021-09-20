class NewsModel {
	static url = "https://newsapi.org/v2/everything";
	static key = "2155552f4e3845158e9dc45c5e83ca3c";

	/**
	 * Fetches new articles pertaining to a random subject
	 * @returns {promise} returns a promise that resolves with new data
	 */
	fetchNews() {
		const subject = ["tesla", "microsoft", "facebook", "bitcoin", "twitter", "snapchat"];
		const subj = subject[Math.floor(Math.random() * subject.length)];
		const url = `${NewsModel.url}?q=${subj}&sortBy=popularity&apiKey=${NewsModel.key}`;
		return $.ajax({ url: url });
	}
}

export default NewsModel;
