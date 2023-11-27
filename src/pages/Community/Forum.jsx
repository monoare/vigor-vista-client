import { Helmet } from "react-helmet-async";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
// import ForumPost from "./ForumPost";

const Forum = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const { data } = useQuery({
    queryKey: ["forums", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/forums?page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const totalCount = data?.count;

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);

  if (!data) {
    return (
      <div className="w-5vw flex justify-center items-center mt-40">
        <span className="loading loading-ring w-[200px]"></span>
      </div>
    );
  }
  const pages = data ? [...Array(numberOfPages).keys()] : [];

  const forumData = data?.result;

  console.log(pages);
  console.log(forumData);

  const handleItemsPerPage = (e) => {
    console.log(e.target.value);
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar />
      <Helmet>Vigor Vista | Forum</Helmet>
      <div className="min-h-screen w-full lg:w-[60vw] mx-auto">
        <div className="pt-28">
          <h1 className="text-4xl font-bold text-center mt-10 mb-5">
            Community Chronicles
          </h1>
          <p className="text-center mb-10 px-20">
            Welcome to Community Chronicles, your go-to destination for all
            things fitness and wellness! Dive into a vibrant online community
            where gym enthusiasts, fitness experts, and wellness seekers come
            together to share their journeys, insights, and tips. From workout
            routines to nutrition hacks, Community Chronicles is your hub for
            inspiration and support on the path to a healthier lifestyle. Join
            the conversation, celebrate achievements, and connect with a
            community that champions your fitness goals. Let&apos;s embark on a
            fitness journey together, turning aspirations into achievements at
            Community Chronicles!
          </p>
        </div>

        <div className="forum-posts-container">
          {forumData?.map((post) => (
            <div key={post._id} className="forum-post">
              <img
                src={post?.image}
                alt={post?.title}
                className="w-full h-[50vh] object-cover"
              />
              <div className="mx-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold py-2">
                    Title: {post?.title}
                  </h2>
                  <p className="post-date">
                    Published Date: {new Date(post?.publishDate).toDateString()}
                  </p>
                </div>
                <div className="post-details">
                  <p className="text-lg py-2">Category: {post?.category}</p>
                  <div className="flex gap-4 items-center">
                    <div className="flex min-w-fit items-center border-2 rounded-full">
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img
                            src={post?.authorImg}
                            alt={`${post?.author}'s profile`}
                            className="post-image"
                          />
                        </div>
                      </div>
                      <p className="text-xl mx-4 font-semibold">
                        Author: {post?.author}
                      </p>
                    </div>

                    <p className="post-description border-b-2 pb-2">
                      {post?.shortDescription}
                    </p>
                  </div>
                  {/* Additional details can be added as needed */}
                  <div className="mt-5">
                    <div>
                      {post?.description.map((singleLine, index) => (
                        <p className="pb-4 text-justify" key={index}>
                          {singleLine}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <p>Up Votes: {post?.upVote}</p>
                    <p>Down Votes: {post?.downVote}</p>
                  </div>
                </div>
              </div>
              <p className="border-b-2 px-20 my-10"></p>
            </div>
          ))}
        </div>

        <div className="pagination mt-5 mb-2 text-center">
          <button
            onClick={handlePrevPage}
            className="btn btn-primary"
            disabled={currentPage === 0}
          >
            Prev
          </button>
          {pages?.map((page, index) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page ? "bg-blue-500 btn" : "bg-green-500 btn"
              }
              key={index}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className="btn btn-primary"
            disabled={currentPage === numberOfPages - 1}
          >
            Next
          </button>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            className="ml-2 rounded-lg border-2 p-3"
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Forum;
