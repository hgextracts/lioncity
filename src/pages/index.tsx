import Dao from "@/landing/Dao";
import Hero from "@/landing/Hero";
import LionGrid from "@/landing/LionGrid";
import Residents from "@/landing/Residents";
import Staking from "@/landing/Staking";
import Wellness from "@/landing/Wellness";
import Team from "@/pages/team";

export default function Home() {
  return (
    <div className="flex flex-col gap-[4rem] items-center justify-center my-6 p-4">
      <Hero />
      <LionGrid />
      <Staking />
      <Residents />
      <Wellness />
      <Dao />
      <Team />
    </div>
  );
}
