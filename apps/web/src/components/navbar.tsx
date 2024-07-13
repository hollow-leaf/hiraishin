"use client";

import * as React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

const pages = ["About", "Groups", "Videos", "MixPlayer"];

function NavBar() {
  const pathname = usePathname();
  const showNavbar = pathname !== "/";
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (!showNavbar) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white">
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "flex" } }}>
              <IconButton
                size="large"
                aria-label="notifications"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={`/${page.toLowerCase()}`} // Create a lowercase version of the page name for the URL path
                    color="inherit" // Ensure it inherits the correct color
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" className="text-md font-bold align-middle text-black">
                Hiraishin
              </Typography>
              <Typography variant="body2" className="text-sm font-bold text-center justify-center align-middle text-gray-500">
                Paws for points
              </Typography>
            </Box>
            <Avatar alt="Remy Sharp" src="/hiraishin.png" />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default NavBar;
