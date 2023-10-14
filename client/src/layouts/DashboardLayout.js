import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Center, Divider } from "@chakra-ui/react";
import HeaderMenu from "../components/HeaderMenu";
function DashboardLayout() {
  return (
    <Center>
      <Box mt="20px" mb="20px">
        <HeaderMenu />
        <Divider mb="10px" />
        <Outlet />
      </Box>
    </Center>
  );
}

export default DashboardLayout;
