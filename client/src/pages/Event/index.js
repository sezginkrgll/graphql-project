import React, { useEffect } from "react";
// chakra-ui
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Spacer,
  Center,
} from "@chakra-ui/react";
// React Router
import { useParams } from "react-router-dom";
// Apollo Client
import { useQuery } from "@apollo/client";
import { GET_EVENT, PARTICIPANTS_SUBSCRIPTION } from "./queries";
import Participants from "./Participants";

function Event() {
  const { id } = useParams();
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENT, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (!loading) {
      subscribeToMore({
        document: PARTICIPANTS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newparticipantItem = subscriptionData.data.participantCreated;
          return {
            event: {
              ...prev.event,
              participants: [...prev.event.participants, newparticipantItem],
            },
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
    <Box border="1px" borderColor="gray.200" rounded="md" minh="60px" p="10px">
      <Flex>
        <Heading as="h4" size="md">
          {data.event.title}
        </Heading>
        <Spacer />
        <Text fontSize="xs" align={"right"}>
          {data.event.date.replaceAll("-", ".")}
        </Text>
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
      <Participants data={data} />
    </Box>
  );
}

export default Event;
