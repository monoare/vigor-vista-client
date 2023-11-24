import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CatalogMagic from "./loader";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(24);

  const fetchData = () => {
    fetch("/galleryData.json")
      .then((res) => res.json())
      .then((data) => {
        setItems([...items, ...data]); // Concatenate new data with existing data
        setPage(page + 1);
        setTotalItems(data.total);
      });
  };

  useEffect(() => {
    fetchData(); // Load initial data
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pt-28">
      <p className="fixed -z-10 text-4xl font-bold text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Visual Showcase
      </p>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={items.length < totalItems}
        loader={<CatalogMagic height={400}></CatalogMagic>}
        endMessage={
          <p className="text-xl text-center my-4">
            Wow, you&apos;ve seen it all!
          </p>
        }
      >
        <div className="grid grid-cols-4 gap-4 z-10">
          {items.map((item) => (
            <div key={item.id} className="shadow-lg">
              <img
                src={item.src}
                alt={item.title}
                className="object-cover h-48 w-full p-4"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
