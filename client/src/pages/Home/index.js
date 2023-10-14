import React from "react";
// chakra-ui
import { VStack, Box, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
// Apollo Client
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "./queries";
// React Router
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <VStack spacing={4} align="stretch" w="600px">
      <Heading as="h3" size="lg">
        Event List
      </Heading>
      {data.events.map((event) => (
        <Link key={event.id} to={`event/${event.id}`}>
          <Box
            minh="60px"
            p="10px"
            border="1px"
            borderColor="gray.200"
            rounded="md"
          >
            <Flex>
              <Box w="515px">
                <Heading as="h5" size="sm">
                  {event.title}
                </Heading>
              </Box>
              <Box w="65px">
                <Text fontSize="xs" align={"right"}>
                  {event.date.replaceAll("-", ".")}
                </Text>
              </Box>
            </Flex>
            <Box>
              <Text fontSize="xs">{event.desc.slice(0, 130)}...</Text>
            </Box>
          </Box>
        </Link>
      ))}
    </VStack>
  );
}

export default Home;
