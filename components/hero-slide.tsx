import React from "react";
import Image from "next/image";
const dummyData: SlideData[] = [
  {
    id: 1,
    imageSrc: "/images/rotator_1.jpg",
    altText: "Rotator 1",
    title: "Lorem ipsum dolor sit amet, consectetur.",
    description:
      "Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui.",
  },
  {
    id: 2,
    imageSrc: "/images/rotator_2.jpg",
    altText: "Rotator 2",
    title: "Lorem ipsum dolor sit amet, consectetur.",
    description:
      "Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nib dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui. Integer vulputate, nibh vel sagittis egestas, dui dolor vehicula dui.",
  },
];
type SlideData = {
  id: number;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
};

type SlideProps = {
  item: SlideData;
  priority: boolean;
};

const HeroSlide: React.FC<SlideProps> = ({ item, priority }) => {
  return (
    <div className="relative h-full w-full px-2 pb-[150px]">
      <div className="absolute left-0 right-0 top-0 z-10 h-full w-full bg-[rgba(1,58,151,0.5)] md:bg-[rgba(1,58,151,0.6)]"></div>
      <Image
        src={item.imageSrc}
        alt={item.altText}
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        priority={priority}
        sizes="
          (min-width: 1940px) 1870px,
          (min-width: 1780px) 1675px,
          (min-width: 380px) calc(93.84vw + 23px),
          calc(66.67vw + 100px)
           "
        fill={true}
      />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col items-center justify-end text-center text-white">
        <h2 className="pb-4 text-2xl font-bold lg:text-4xl 2xl:text-5xl">
          {item.title}
        </h2>
        <p className="line-clamp-5 overflow-hidden text-ellipsis text-lg font-normal leading-6 2xl:text-xl 2xl:leading-8">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default HeroSlide;

export const slideComponents = dummyData.map((slide, index) => ({
  id: slide.id,
  element: <HeroSlide key={slide.id} item={slide} priority={index === 0} />,
}));
