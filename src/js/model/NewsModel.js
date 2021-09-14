
class NewsModel{

    static url = "https://newsapi.org/v2/everything";
    static key = "311ed67e61b24259918bac6bd47b24e4";

    /**
     * Fetches new articles pertaining to a random subject
     * @returns {promise} returns a promise that resolves with new data
     */
    fetchNews() {
        const subject = ["tesla", "microsoft", "facebook", "bitcoin", "twitter", "snapchat"];
        const subj = subject[Math.floor(Math.random() * subject.length)];
        const url = `${NewsModel.url}?q=${subj}&sortBy=popularity&apiKey=${NewsModel.key}`;
        return $.ajax({url: url});
    }

}

export default NewsModel;