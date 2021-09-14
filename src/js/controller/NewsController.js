import NewsModel from "../model/NewsModel.js";
import NewsView from "../view/NewsView.js";

class NewsController{

    constructor(){
        this.newsModel = new NewsModel();
        this.newsView = new NewsView();
    }

    async _loadNews(){

        try {
            const news = await this.newsModel.fetchNews();
            if(news["status"] === "ok"){
                this._displayNews(news["articles"]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    _displayNews(newsData) {

        for(let i = 0; i < 20; i++) {

            const article =
                `<div class="article">
                <div class="section1">
                    <h1 class="source">${newsData[i]["source"]["name"]}</h1>
                    <p class="date">${newsData[i]["publishedAt"]}</p>
                    <div class="title"><a href="${newsData[i]["url"]}">${newsData[i]["title"]}</a></div>
                    <p class="description">${newsData[i]["description"]}</p>
                    <p class="author">${newsData[i]["author"]}</p>
                </div>
                <div class="image">
                    <img src="${newsData[i]["urlToImage"]}" alt="" class="news_image">
                </div>
            </div>`;

            this.newsView.newsContainer.append(article);
        }
    }

    init(){
        this._loadNews();
    }
}

const newsController = new NewsController();
export default newsController;