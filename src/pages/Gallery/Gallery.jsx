import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const Gallery = () => {
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const axiosPublic = useAxiosPublic();

  const { data: photos } = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pictures");
      return res.data;
    },
  });

  useEffect(() => {
    if (photos) {
      // Display only the first four photos initially
      setDataSource(photos.slice(0, 12));
    }
  }, [photos]);

  const fetchMoreData = () => {
    // MAKING API CALL
    if (dataSource.length < photos.length) {
      // Load more photos as needed
      setTimeout(() => {
        const nextSet = photos.slice(dataSource.length, dataSource.length + 12);
        setDataSource([...dataSource, ...nextSet]);
      }, 500);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className=" pt-28">
        <div className="container z-100 p-8">
          <InfiniteScroll
            dataLength={dataSource.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="skeleton grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"></div>
            }
            endMessage={
              <p className="text-center text-gray-500">
                You&apos;ve seen all the photos!
              </p>
            }
            height={"80vh"}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {dataSource.map((item, index) => (
                <div className="border-2 p-4" key={index}>
                  {/* Render your photo data here */}
                  <img
                    className="w-full h-auto rounded-lg shadow-md"
                    src={item.src}
                    alt={`Photo ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
          <p className="absolute top-1/2 -z-10 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-300">
            Visualization of gallery
          </p>
        </div>
      </div>
      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );
};

export default Gallery;
