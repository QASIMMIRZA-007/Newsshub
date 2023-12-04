import { useState, useEffect } from "react";
import AOS from 'aos';

function NewsCard() {
  AOS.init()
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=695a41b7c2b841c68bbaf40ce6c8cf95`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setCardData(parsedData.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <h2 className="heading">Visit Newshub for Hot news</h2>
      <div  data-aos="fade-in" className="container">
        {cardData?.map((item) => {
          return (
            <div key={item.id} className="card ">
              <img
                src={
                  item.urlToImage
                    ? item.urlToImage
                    : "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                }
                className="card-img-top img"
                alt="News Thumbnail"
              />
              <div className="card-body"></div>
              <h5 className="card-title">
                {item.title
                  ? item.title
                  : "Anthony Edwards, Team USA survive ‘tricky’ Montenegro at FIBA World Cup -Athletic "}
              </h5>
              <p className="card-text">
                {item.description
                  ? item.description
                  : "The Wolves guard, who went scoreless in the first half, responded with a team-high 17 points in the second half."}
              </p>
              <a href={item.url} target="_blank" className="btn">
                Visit news
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default NewsCard;
