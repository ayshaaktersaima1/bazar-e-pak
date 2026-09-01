import { Code2 } from "lucide-react";
import { teamTechStack } from "@/data/team";

const TeamTechStack = () => {
  return (
    <section className="bg-[#001B08] py-16 md:py-20">
      <div className="mx-auto grid w-[90%] max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8BB44] text-[#001B08]">
            <Code2 size={21} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
            Technology
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Built with modern tools.
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-white/55">
            Our stack gives us the flexibility to build responsive interfaces,
            reliable APIs, secure authentication, and scalable marketplace
            features.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          {teamTechStack.map((technology) => (
            <span
              key={technology}
              className="badge h-auto border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamTechStack;