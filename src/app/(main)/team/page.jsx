import {
  TeamCTA,
  TeamHero,
  TeamMembers,
  TeamTechStack,
  TeamValues,
} from "@/components/homepage/team";

const TeamPage = () => {
  return (
    <main className="min-h-screen bg-[#F7F5EF]">
      <TeamHero />
      <TeamMembers />
      <TeamValues />
      <TeamTechStack />
      <TeamCTA />
    </main>
  );
};

export default TeamPage;