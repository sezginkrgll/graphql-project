import React from "react";
import { Link } from "react-router-dom";
import { Heading, Text, Box } from "@chakra-ui/react";

function Error404() {
  return (
    <Box textAlign="center" mt="40px">
      <Heading>Error404</Heading>
      <Text fontSize="3xl">page not found</Text>
      <Text fontSize="3xl" as="u">
        <Link to="/">Try to return to home page</Link>
      </Text>
    </Box>
  );
}

export default Error404;
