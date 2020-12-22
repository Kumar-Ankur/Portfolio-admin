import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import dummy from "../assets/dummy_image.png";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://newsapi.org/v2/top-headlines?country=in&apiKey=15cc56d3f5ba4a7da39a08ec798e2f85")
      .then((res) => res.json())
      .then((res) => {
        const carouselData = res.articles.map((news) => {
          return (
            <>
              {news.urlToImage ? (
                <img src={news.urlToImage} alt={news.title} key={news.title} className="sliderImg" />
              ) : (
                <img src={dummy} alt={news.title} key={news.title} className="sliderImg" />
              )}
              <p className="slider_title">{news.title}</p>
            </>
          );
        });
        setNews(carouselData);
      })
      .catch((err) => console.log(err));
  }, []);

  const responsive = {
    0: { items: 1 },
    1024: { items: 1 },
  };
  return (
    <div>
      <AliceCarousel
        items={news}
        responsive={responsive}
        autoPlayInterval={5000}
        autoPlayDirection="ltr"
        autoPlay={true}
        fadeOutAnimation={true}
        infinite={true}
      />
    </div>
  );
};

export default News;
