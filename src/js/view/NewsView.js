class NewsView{

    constructor(){
        this.newsContainer = $("main section.main .tab_contents .latest_news .contents");
    }

    
    /**
     * Displays news data on the page
     * @param {object} newsData news data retrieved from API
     */
     displayNews(newsData) {

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
                    <img src="${newsData[i]["urlToImage"]}" alt="News Image" class="news_image">
                </div>
            </div>`;

            this.newsContainer.append(article);
        }
    }
}

export default NewsView;