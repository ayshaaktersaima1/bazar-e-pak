import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn,
  FaExternalLinkAlt,
} from "react-icons/fa";

const TeamCard = ({ member }) => {
  return (
    <article className="card overflow-hidden border border-[#001B08]/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="group relative aspect-[4/3] overflow-hidden bg-[#F7F5EF]">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </figure>

      <div className="card-body p-6">
        <div>
          <h3 className="card-title text-xl font-bold text-[#001B08]">
            {member.name}
          </h3>

          <p className="mt-1 text-sm font-semibold text-[#E8BB44]">
            {member.role}
          </p>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#001B08]/60">
          {member.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="badge border-0 bg-[#F7F5EF] px-3 py-3 text-xs font-medium text-[#001B08]"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="card-actions mt-5 items-center justify-between border-t border-[#001B08]/10 pt-4">
          <div className="flex gap-2">
            {member.github && (
              <Link
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} GitHub`}
                className="btn btn-circle btn-sm border-0 bg-[#001B08] text-white hover:bg-[#E8BB44] hover:text-[#001B08]"
              >
                <FaGithub size={16} />
              </Link>
            )}

            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="btn btn-circle btn-sm border-0 bg-[#001B08] text-white hover:bg-[#E8BB44] hover:text-[#001B08]"
              >
                <FaLinkedinIn size={16} />
              </Link>
            )}

            {member.portfolio && (
              <Link
                href={member.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} portfolio`}
                className="btn btn-circle btn-sm border-0 bg-[#001B08] text-white hover:bg-[#E8BB44] hover:text-[#001B08]"
              >
                <FaExternalLinkAlt size={14} />
              </Link>
            )}
          </div>

          <span className="text-xs font-medium text-[#001B08]/40">
            Bazar-e-Pak Team
          </span>
        </div>
      </div>
    </article>
  );
};

export default TeamCard;