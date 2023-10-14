import React from "react";
// React Router
import { useParams } from "react-router-dom";
// Apollo Client
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "./queries";
// chakra-ui
import {
  VStack,
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  StackDivider,
  Spacer,
} from "@chakra-ui/react";

function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: {
      id,
    },
  });
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
    <Box
      border="1px"
      borderColor="gray.200"
      rounded="md"
      minh="60px"
      p="10px"
      w="600px"
    >
      <Flex>
        <Box w="515px">
          <Heading as="h4" size="md">
            {data.event.title}
          </Heading>
        </Box>
        <Box w="65px">
          <Text fontSize="xs" align={"right"}>
            {data.event.date.replaceAll("-", ".")}
          </Text>
        </Box>
      </Flex>
      <Box>
        <Text fontSize="xs">{data.event.desc}</Text>
      </Box>
      <Flex mt="5px">
        <Text fontSize="xs" align={"left"} fontWeight={"bold"}>
          Event Organizer: {data.event.user.username}
        </Text>
        <Spacer />
        <Text fontSize="xs" align={"right"} fontStyle={"italic"}>
          Location: {data.event.location.name}
        </Text>
      </Flex>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        mt="20px"
      >
        <Heading as="h5" size="sm">
          Participants ({data.event.participants.length})
        </Heading>
        {data.event.participants.length === 0 && (
          <Box>There are no participants</Box>
        )}
        {data.event.participants.map((participant) => (
          <Box key={participant.id}>{participant.user.username}</Box>
        ))}
      </VStack>
    </Box>
  );
}

export default Event;
