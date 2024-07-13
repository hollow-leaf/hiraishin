"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface PriceProps {
  amount: number;
}

const TokenBar: React.FC<PriceProps> = ({ amount }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-30 rounded-md overflow-hidden relative p-2">
        <div className="w-full flex items-start">
          <Typography variant="h6" className="mb-2">
            My Token
          </Typography>
        </div>
        <div className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md ">
          <div className="flex items-center">
            <Image
                src="/paw.png"
                alt="paw"
                width={30}
                height={30}
                className="rounded-full"
                />
            <Typography variant="body1" className="ml-2 font-semibold">
              Paw Point:
            </Typography>
          </div>
          <Typography variant="body1" className="font-semibold">
            {amount}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TokenBar;
