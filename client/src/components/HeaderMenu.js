import React from "react";
// React Router
import { NavLink, useLocation } from "react-router-dom";
// Chakra-UI
import { Menu, Link as ChakraLink } from "@chakra-ui/react";
function HeaderMenu() {
  let location = useLocation();
  return (
    <Menu>
      <ChakraLink
        _hover={{ borderBottom: "2px" }}
        as={NavLink}
        to="/"
        borderBottom={location.pathname === "/" ? "2px" : ""}
        mr="20px"
        aria-current="page"
      >
        Home
      </ChakraLink>
      <ChakraLink
        _hover={{ borderBottom: "2px" }}
        as={NavLink}
        to="#"
        borderBottom={location.pathname === "#" ? "2px" : ""}
        mr="20px"
      >
        New Event
      </ChakraLink>
    </Menu>
  );
}

export default HeaderMenu;
