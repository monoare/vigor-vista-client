import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const LatestArticles = () => {
  const [articles, setArticles] = useState();
  const trimText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + " ...";
  };
  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => setArticles(data));
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Journey into Health: Recent Articles
        </h2>
        <div>
          {articles?.map((article, index) => (
            <div
              key={index}
              className="bg-white p-6 mb-12 rounded-lg shadow-md"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-1/ object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-2">
                By {article.author} on {article.date}
              </p>
              <p className="text-gray-700 mb-4">
                {trimText(article.description, 200)}
                <Link to={`/fullBlog/${article.id}`}>
                  <button className="ml-4 text-green-500 font-semibold">
                    Read More
                  </button>
                </Link>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center"></div>
      </div>
    </div>
  );
};

export default LatestArticles;
