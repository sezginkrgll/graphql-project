import React from "react";
// chakra-ui
import { VStack, Heading } from "@chakra-ui/react";
// Apollo Client
import { useQuery } from "@apollo/client";
import { GET_EVENTS, EVENTS_SUBSCRIPTION } from "./queries";

import EventList from "./EventList";

function Home() {
  const { subscribeToMore, ...result } = useQuery(GET_EVENTS);

  // useEffect(() => {
  //   if (!loading) {
  //     subscribeToMore({
  //       document: EVENTS_SUBSCRIPTION,
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         return {
  //           events: [subscriptionData.data.eventCreated, ...prev.events],
  //         };
  //       },
  //     });
  //   }
  // }, [loading, subscribeToMore]);

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h3" size="lg">
        Event List
      </Heading>
      <EventList
        {...result}
        subscribeToNewComments={() =>
          subscribeToMore({
            document: EVENTS_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              return {
                events: [subscriptionData.data.eventCreated, ...prev.events],
              };
            },
          })
        }
      />
    </VStack>
  );
}

export default Home;
