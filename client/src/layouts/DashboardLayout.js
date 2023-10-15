import React from "react";
import { Outlet } from "react-router-dom";
import { Center, Divider, Container } from "@chakra-ui/react";
import HeaderMenu from "../components/HeaderMenu";
function DashboardLayout() {
  return (
    <Center>
      <Container minW="250px" maxW="600px" m="20px">
        <HeaderMenu />
        <Divider mb="10px" />
        <Outlet />
      </Container>
    </Center>
  );
}

export default DashboardLayout;
