import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullBlog = () => {
  const { id } = useParams();
  const [fullBlog, setFullBlog] = useState(null);

  useEffect(() => {
    fetch("/blogs.json")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.find((blog) => blog.id === Number(id));
        setFullBlog(filterData);
      });
  }, [id]);

  if (!fullBlog) {
    // You can display a loading spinner or message while fetching data
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render the full blog content here */}
      <img
        src={fullBlog.image}
        alt={fullBlog.title}
        className="w-full h-auto mb-4"
      />
      <h1 className="text-3xl font-bold py-4">{fullBlog.title}</h1>
      <p className="text-gray-600 mb-2">
        By {fullBlog.author} on {fullBlog.date}
      </p>
      <p className="text-gray-700 mb-4 text-justify">{fullBlog.description}</p>
    </div>
  );
};

export default FullBlog;
