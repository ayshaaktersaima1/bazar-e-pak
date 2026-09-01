import {
  Handshake,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { teamValues } from "@/data/team";

const icons = [Handshake, Lightbulb, ShieldCheck, TrendingUp];

const TeamValues = () => {
  return (
    <section className="bg-[#F7F5EF] py-16 md:py-20">
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E8BB44]">
            What Drives Us
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#001B08] md:text-4xl">
            How we build Bazar-e-Pak
          </h2>

          <p className="mt-4 leading-7 text-[#001B08]/55">
            Our approach is simple: build useful things, keep improving them,
            and make every part of the experience better.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamValues.map((value, index) => {
            const Icon = icons[index];

            return (
              <div
                key={value.title}
                className="card border border-[#001B08]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="card-body">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#001B08] text-[#E8BB44]">
                    <Icon size={21} />
                  </div>

                  <h3 className="card-title mt-2 text-lg text-[#001B08]">
                    {value.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#001B08]/55">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamValues;