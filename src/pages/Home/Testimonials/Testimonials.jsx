import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import profileImage1 from "../../../assets/profile/image (1).jpg";
import profileImage2 from "../../../assets/profile/image (2).jpg";
import profileImage3 from "../../../assets/profile/image (3).jpg";
import profileImage4 from "../../../assets/profile/image (4).jpg";
import profileImage5 from "../../../assets/profile/image (5).jpg";
import profileImage6 from "../../../assets/profile/image (12).jpg";

const Testimonials = () => {
  return (
    <div className="py-20">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-10 w-1/2 mx-auto text-center">
        Transformative Tales: Real Stories of Success with Our Fitness Platform
      </h1>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper w-2/3"
      >
        <SwiperSlide className="flex flex-col items-center justify-center">
          <div className="flex justify-center mb-5">
            <img
              src={profileImage1}
              alt="Profile 1"
              className="profile-image w-52 h-52 rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 pb-5">Sarah W.</p>
            <p className="text-gray-600">
              &ldquo;Joining this fitness platform was a game-changer for me.
              The personalized workout plans and expert guidance helped me
              achieve my fitness goals faster than I ever imagined. I&apos;ve
              lost 20 pounds and gained a new level of confidence!&rdquo;
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center mb-5">
            <img
              src={profileImage2}
              alt="Profile 1"
              className="profile-image w-52 h-52 rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 pb-5">Emily S.</p>
            <p className="text-gray-600">
              &ldquo;I was skeptical at first, but after a month of using this
              platform, I can&apos;t imagine my fitness journey without it. The
              variety of workouts keeps things interesting, and the progress
              tracking feature motivates me to push harder every day. I&apos;m
              in the best shape of my life!&rdquo;
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center mb-5">
            <img
              src={profileImage3}
              alt="Profile 1"
              className="profile-image w-52 h-52 rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 pb-5">Jason M.</p>
            <p className="text-gray-600">
              &ldquo;As a busy professional, finding time for the gym was always
              a challenge. This platform&apos;s flexibility allowed me to work
              out on my own schedule. Thanks to the convenience and
              effectiveness of the programs, I&apos;ve not only reached my
              weight loss goal but maintained it!&rdquo;
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center mb-5">
            <img
              src={profileImage4}
              alt="Profile 1"
              className="profile-image w-52 h-52 rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 pb-5">Alex P.</p>
            <p className="text-gray-600">
              &ldquo;I&apos;ve tried countless fitness apps, but this one stands
              out. The community support is incredible, and the trainers are so
              motivating. I never thought I&apos;d enjoy working out this much.
              It&apos;s not just a platform; it&apos;s a lifestyle that has
              transformed me both physically and mentally.&rdquo;
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center mb-5">
            <img
              src={profileImage5}
              alt="Profile 1"
              className="profile-image w-52 h-52 rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 pb-5">Mark R.</p>
            <p className="text-gray-600">
              &ldquo;I&apos;ve been a fitness enthusiast for years, but this
              platform took my training to a whole new level. The detailed
              analytics helped me identify areas for improvement, and the
              platform&apos;s constant updates keep my workouts fresh and
              challenging. It&apos;s the ultimate tool for anyone serious about
              their fitness journey.&rdquo;
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="flex justify-center mb-5">
            <img
              src={profileImage6}
              alt="Profile 1"
              className="profile-image w-52 h-52 rounded-full"
            />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-800 pb-5">Jessica L.</p>
            <p className="text-gray-600">
              &ldquo;After having two kids, I struggled to find the motivation
              to get back in shape. This platform made it easy with its
              postpartum-friendly workouts and supportive community. I&apos;m
              proud to say I&apos;ve not only regained my pre-pregnancy body but
              surpassed it!&rdquo;
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
