import { useEffect, useState } from "react";

const Team = () => {
  const [members, setMembers] = useState(null);
  useEffect(() => {
    fetch("/team.json")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
      });
  }, []);

  return (
    <section className="bg-neutral-light md:pb-20 pt-5">
      <div className="container mx-auto text-center">
        <h2 className="text-xl md:text-4xl font-bold md:mb-8">
          Vigor Vista Team Members
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members?.map((member, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-xl h-72 w-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-base md:text-xl">
                  Instructor: {member.name}
                </h2>
                <p className="font-medium text-sm md:text-base">
                  Experience: {member.experience} years{" "}
                </p>

                <p className="text-gray-700 text-xs md:text-base">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
