import NewsModel from "../model/NewsModel.js";
import NewsView from "../view/NewsView.js";

class NewsController{

    constructor(){
        this.newsModel = new NewsModel();
        this.newsView = new NewsView();
    }

    /**
     * Loads news from API
     */
    async _loadNews(){

        try {
            const news = await this.newsModel.fetchNews();
            if(news["status"] === "ok"){
                this.newsView.displayNews(news["articles"]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    init(){
        this._loadNews();
    }
}

const newsController = new NewsController();
export default newsController;