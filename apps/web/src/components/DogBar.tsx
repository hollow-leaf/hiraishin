"use client";

import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import Image from "next/image";

interface DogProps {
  dogs: {
    chipId: string;
    breed: string;
    dogName: string;
    img: string;
  };
}

const TabPage: React.FC<DogProps> = ({ dogs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-100 rounded-md overflow-hidden relative p-4">
        <div className="w-full flex items-start">
          <Typography variant="h6" className="mb-2">
            My Profile
          </Typography>
        </div>
        <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
          <Tab label="Dog Profile" />
          <Tab label="Scan Profile" />
          <Tab label="Find Profile" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className="flex flex-col items-center">
            <Image src={dogs.img} alt={`${dogs.dogName}`} width={100} height={100} className="rounded-full" />
            <Typography variant="h6" className="mt-2">{dogs.dogName}</Typography>
            <Typography variant="body1">Breed: {dogs.breed}</Typography>
            <Typography variant="body1">Chip ID: {dogs.chipId}</Typography>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography>Scan Profile content goes here.</Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Find Profile content goes here.</Typography>
        </TabPanel>
      </div>
    </div>
  );
};

export default TabPage;
