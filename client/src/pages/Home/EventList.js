import { useEffect } from "react";
// chakra-ui
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Center,
  Spacer,
} from "@chakra-ui/react";
// React Router
import { Link } from "react-router-dom";

function EventList({ error, data, loading, subscribeToNewComments }) {
  useEffect(
    () => subscribeToNewComments(),
    // why: this should only run once. take a look at the official docs
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
    <>
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
    </>
  );
}

export default EventList;
