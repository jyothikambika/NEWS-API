// Reference to the news container
const newsContainer = document.getElementById('news-container');

// Fetch news data from local JSON file
async function fetchNews() {
    const url = './news.json';  // Local JSON file
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the file contains articles
        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>No news articles available.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>There was an error loading news.</p>';
    }
}

// Display the news articles
function displayNews(articles) {
    newsContainer.innerHTML = '';  // Clear any previous content

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/300x150';
        const newsHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.description ? article.description : 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsCard.innerHTML = newsHTML;
        newsContainer.appendChild(newsCard);
    });
}

// Fetch news when the page loads
window.onload = () => {
    fetchNews();
};
