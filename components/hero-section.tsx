"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

type SlideComponent = {
  id: number;
  element: React.ReactNode;
};
type HeroSectionProps = {
  slides: SlideComponent[];
};
export default function HeroSection({ slides }: HeroSectionProps) {
  return (
    <section className="mx-auto h-[590px] max-w-[1675px] overflow-hidden md:rounded-bl-lg md:rounded-br-lg lg:h-[665px] 3xl:max-w-[1870px]">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={0}
        className="relative h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>{slide.element}</SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
