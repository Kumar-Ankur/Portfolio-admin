import React from "react";
import News from "./news";
import Weather from "./weather";

const Content = () => {
  return (
    <div className="content">
      <div className="content_main">
        <div className="content_main-section"></div>
        <div className="content_main-subsection">
          <div className="content_main-subsection_weather">
            <Weather />
          </div>
          <div className="content_main-subsection_news">
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
