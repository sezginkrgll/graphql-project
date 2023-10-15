import React, { useEffect } from "react";
// chakra-ui
import {
  VStack,
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Center,
  Spacer,
} from "@chakra-ui/react";
// Apollo Client
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENTS_SUBSCRIPTION } from "./queries";
// React Router
import { Link } from "react-router-dom";

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    if (!loading) {
      subscribeToMore({
        document: EVENTS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return {
            events: [subscriptionData.data.eventCreated, ...prev.events],
          };
        },
      });
    }
  }, [loading, subscribeToMore]);

  if (loading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <VStack spacing={4} align="stretch">
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
              <Heading as="h5" size="sm">
                {event.title}
              </Heading>
              <Spacer />
              <Text fontSize="xs" align={"right"}>
                {event.date.replaceAll("-", ".")}
              </Text>
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
