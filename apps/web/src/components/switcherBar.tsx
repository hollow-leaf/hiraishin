"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

function SwitchBar() {
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const ProfileIcon = () => (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.25 11.25C17.5931 11.25 16.25 9.90685 16.25 8.25V6.75C16.25 5.09315 17.5931 3.75 19.25 3.75H23.25C24.9069 3.75 26.25 5.09315 26.25 6.75V8.25C26.25 9.90685 24.9069 11.25 23.25 11.25H19.25ZM6.75 16.25C5.09315 16.25 3.75 14.9069 3.75 13.25V6.75C3.75 5.09315 5.09315 3.75 6.75 3.75H10.75C12.4069 3.75 13.75 5.09315 13.75 6.75V13.25C13.75 14.9069 12.4069 16.25 10.75 16.25H6.75ZM19.25 26.25C17.5931 26.25 16.25 24.9069 16.25 23.25V16.75C16.25 15.0931 17.5931 13.75 19.25 13.75H23.25C24.9069 13.75 26.25 15.0931 26.25 16.75V23.25C26.25 24.9069 24.9069 26.25 23.25 26.25H19.25ZM6.75 26.25C5.09315 26.25 3.75 24.9069 3.75 23.25V21.75C3.75 20.0931 5.09315 18.75 6.75 18.75H10.75C12.4069 18.75 13.75 20.0931 13.75 21.75V23.25C13.75 24.9069 12.4069 26.25 10.75 26.25H6.75Z"
        fill="#2DD8FE"
      />
    </svg>
  );

  const FourCircle = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 23.25C6.16667 23.25 4.39583 22.5208 2.9375 21.0625C1.47917 19.6042 0.75 17.8333 0.75 15.75V8.25C0.75 6.16667 1.47917 4.39583 2.9375 2.9375C4.39583 1.47917 6.16667 0.75 8.25 0.75H15.75C17.8333 0.75 19.6042 1.47917 21.0625 2.9375C22.5208 4.39583 23.25 6.16667 23.25 8.25V15.75C23.25 17.8333 22.5208 19.6042 21.0625 21.0625C19.6042 22.5208 17.8333 23.25 15.75 23.25H8.25ZM10.0429 16.2929C10.4334 16.6834 11.0666 16.6834 11.4571 16.2929L17.5429 10.2071C17.9334 9.81658 17.9334 9.18342 17.5429 8.79289L17.2071 8.45711C16.8166 8.06658 16.1834 8.06658 15.7929 8.45711L11.4571 12.7929C11.0666 13.1834 10.4334 13.1834 10.0429 12.7929L8.70711 11.4571C8.31658 11.0666 7.68342 11.0666 7.29289 11.4571L6.95711 11.7929C6.56658 12.1834 6.56658 12.8166 6.95711 13.2071L10.0429 16.2929Z"
        fill="#EADE9D"
      />
    </svg>
  );

  return (
    <div className="fixed left-0 bottom-0 z-10 flex w-full justify-center">
      <AppBar position="static">
        <Container maxWidth={false} className="bg-white">
          <Toolbar className="flex justify-between">
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="profile"
                component={Link}
                href="/profile"
              >
                <ProfileIcon />
              </IconButton>
              <span className="text-black">Profile</span>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="videos"
                component={Link}
                href="/videos"
              >
                <FourCircle />
              </IconButton>
              <span className={path == "/map" ? "text-gray-500":"text-black"}>Videos</span>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" overflow="hidden">
              <Image
                src="/map.png"
                alt="map"
                width={60}
                height={60}
              />
              <span className={path == "/map" ? "text-gray-500":"text-black"}>Hiraishin</span>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              <Image
                src="/hiraishin.png"
                alt="Hiraishin"
                width={40}
                height={40}
              />
              <span className={path == "/map" ? "text-gray-500":"text-black"}>Videos</span>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center" >
              <Image
                src="/hiraishin.png"
                alt="Hiraishin"
                width={40}
                height={40}
              />
              <span className={path == "/map" ? "text-gray-500":"text-black"}>Videos</span>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default SwitchBar;
