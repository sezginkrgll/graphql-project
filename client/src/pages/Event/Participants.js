import React from "react";
// chakra-ui
import { VStack, Box, Heading, StackDivider } from "@chakra-ui/react";

function Participants({ data }) {
  return (
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
  );
}

export default Participants;
