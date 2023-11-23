import gymImage from "../../../assets/image/about.jpg"; // Replace with your actual image path

const AboutSection = () => {
  return (
    <section className="bg-neutral-light pb-20">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-8">About Us</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={gymImage}
              alt="Gym Interior"
              className="rounded-md shadow-md object-cover w-full h-80 mb-6 lg:h-96"
            />
          </div>

          <div className="text-left">
            <p className="text-lg mb-4">
              Welcome to Vigor Vista, where fitness meets inspiration. Our
              commitment is to provide a state-of-the-art fitness experience
              that caters to individuals of all fitness levels.
            </p>

            <p className="text-lg mb-4">
              At Vigor Vista, we believe in the transformative power of fitness.
              Whether you&apos;re a seasoned athlete or just starting your
              fitness journey, our expert trainers and cutting-edge facilities
              are here to support your goals.
            </p>

            <p className="text-lg mb-4">
              Our mission is to create a vibrant community that embraces health
              and wellness. Join us in achieving not only physical strength but
              also mental resilience. We&apos;re more than just a gym;
              we&apos;re a lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
