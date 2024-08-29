import dynamic from "next/dynamic";
import HeroSection from "@/components/hero-section";
import {slideComponents} from "@/components/hero-slide";
const ReservationForm = dynamic(
    () => import("../components/reservation-form"),
    { ssr: false },
);

export default function Home() {
  return (
      <main>
          <HeroSection slides={slideComponents}/>
          <section className="container relative z-30 -mt-[100px] mb-5 px-4 xl:px-0">
              <ReservationForm/>
          </section>
      </main>
  );
}
