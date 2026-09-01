import { teamMembers } from "@/data/team";
import TeamCard from "./TeamCard";

const TeamMembers = () => {
  return (
    <section id="team" className="bg-white py-16 md:py-20">
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
            Our Team
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
            The people building the platform
          </h2>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#001B08]" />
            <span className="text-[#E8BB44]">★</span>
            <span className="h-px w-14 bg-[#001B08]" />
          </div>

          <p className="mt-5 leading-7 text-[#001B08]/55">
            Different responsibilities, different perspectives, and one shared
            goal.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;