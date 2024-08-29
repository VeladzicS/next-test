import HeroSection from "@/components/hero-section";
import {slideComponents} from "@/components/hero-slide";


export default function Home() {
  return (
      <main>
          <HeroSection slides={slideComponents}/>

      </main>
  );
}
