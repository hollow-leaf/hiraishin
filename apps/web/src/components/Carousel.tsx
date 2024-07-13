"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
  ImageListItem,
  ImageListItemBar,
  Chip,
  Box,
  Typography,
} from "@mui/material";

interface CarouselProps {
  missedDog: {
    id: string;
    owner: string;
    breed: string;
    dogName: string;
    area: string;
    img: string;
    price: number;
  }[];
}
const Carousel: React.FC<CarouselProps> = ({ missedDog }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elem = carouselRef.current as HTMLDivElement;
    const { width, height } = elem.getBoundingClientRect();
    setCarouselSize({ width, height });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-80 h-60 rounded-md overflow-hidden relative">
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="w-full h-full absolute flex transition-all duration-300"
        >
          {missedDog.map((item) => (
            <div key={item.id} className="relative shrink-0 w-full h-full">
              <ImageListItem>
                <div className="group rounded-3xl overflow-hidden relative">
                  <div
                    style={{ width: 320, height: 180, position: "relative" }}
                  >
                    <Image
                      width={320}
                      height={180}
                      src={item.img}
                      alt={item.id}
                      loading="lazy"
                      className="rounded-3xl p-0 w-full h-full object-cover"
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        padding: "8px",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {item.dogName} x {item.breed}
                      </Typography>
                    </Box>
                  </div>
                </div>
                <ImageListItemBar
                  title={`${item.area}`}
                  position="below"
                  sx={{
                    marginLeft: 2,
                    color: "gray",
                  }}
                  actionIcon={
                    <>
                      <Chip
                        label={`$${item.price} `}
                        color="primary"
                        size="small"
                        className="mr-2 mt-2"
                      />
                    </>
                  }
                />
              </ImageListItem>
            </div>
          ))}
        </div>
        <button
          disabled={currentImg === 0}
          onClick={() => setCurrentImg((prev) => prev - 1)}
          className={`absolute left-0 top-1/4 px-4 py-2 font-bold text-transparent ${currentImg === 0 && "opacity-50"} hover:text-white`}
        >
          {"<"}
        </button>
        <button
          disabled={currentImg === missedDog.length - 1}
          onClick={() => setCurrentImg((prev) => prev + 1)}
          className={`absolute right-0 top-1/4 px-4 py-2 font-bold text-transparent ${currentImg === missedDog.length - 1 && "opacity-50"} hover:text-white`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
