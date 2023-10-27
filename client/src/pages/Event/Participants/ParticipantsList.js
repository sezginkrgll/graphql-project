import React, { useRef, useEffect } from "react";
// chakra-ui
import { VStack, Box, Heading, StackDivider } from "@chakra-ui/react";
import NewParticipantForm from "./NewParticipantForm";

function ParticipantsList({ data }) {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [data]);

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
      {data.event.participants.length > 0 && (
        <Box
          maxH="300px"
          overflow="auto"
          pr="10px"
          pl="10px"
          sx={{
            "&::-webkit-scrollbar": {
              height: "4px",
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "gray.400",
              borderRadius: "24px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "red.300",
            },
          }}
        >
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {data.event.participants.map((participant) => (
              <Box key={participant.id}>{participant.user.username}</Box>
            ))}
          </VStack>
          <Box ref={messageRef} />
        </Box>
      )}
      <NewParticipantForm event_id={data.event.id} />
    </VStack>
  );
}

export default ParticipantsList;
