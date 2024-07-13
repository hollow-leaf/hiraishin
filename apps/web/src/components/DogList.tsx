"use client";

import React from "react";

import Image from "next/image";

import {
  ImageList,
  ImageListItem,
  Box,
  Typography,
  ImageListItemBar,
  Chip,
} from "@mui/material";

interface DogListProps {
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

const Dogs: React.FC<DogListProps> = ({ missedDog }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 mb-20">
      <div className="w-80 rounded-md overflow-hidden relative">
        <div className="w-full flex items-start">
          <Typography variant="h6" className="mb-2">
            可能在附近的狗狗
          </Typography>
        </div>
        <ImageList variant="masonry" cols={1} gap={40}>
          {missedDog.map((item) => {
            return (
              <ImageListItem>
                <div className="group rounded-3xl overflow-hidden relative">
                  <div
                    style={{ width: 300, height: 160, position: "relative" }}
                  >
                    <Image
                      width={300}
                      height={160}
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
                        {item.dogName} - {item.breed}
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
                        className="mr-4 mt-2"
                      />
                    </>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </div>
  );
};

export default Dogs;
