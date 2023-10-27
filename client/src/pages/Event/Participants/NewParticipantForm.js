import React, { useState } from "react";
// chakra-ui
import {
  Heading,
  Select,
  VStack,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";
// Apollo Client
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, CREATE_PARTICIPANT_MUTATION } from "./queries";

function NewParticipantForm({ event_id }) {
  const [createParticipant, { loading }] = useMutation(
    CREATE_PARTICIPANT_MUTATION
  );
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
  const [user_id, setUser_id] = useState("");
  const [fieldErrors, setFieldErrors] = useState(false);

  const toast = useToast();

  const handleSubmit = async () => {
    if (user_id !== "") {
      try {
        await createParticipant({
          variables: {
            data: { user_id, event_id },
          },
        });
        toast({
          title: "Success",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } catch (e) {
        toast({
          title: "Participant not saved!",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } else {
      toast({
        title: "Please complete all the fields on the form.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h5" size="sm">
        New Participant
      </Heading>
      <Flex>
        <Select
          name="user_id"
          placeholder="Please select a user"
          onChange={(e) => {
            setUser_id(e.target.value);
          }}
          isInvalid={fieldErrors}
          onBlur={() =>
            user_id === "" ? setFieldErrors(true) : setFieldErrors(false)
          }
          isDisabled={get_users_loading}
        >
          {users_data &&
            users_data.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
        </Select>
        <Button
          ml="10px"
          minW="130px"
          colorScheme="teal"
          isLoading={loading}
          type="submit"
          onClick={handleSubmit}
        >
          Add Participant
        </Button>
      </Flex>
    </VStack>
  );
}

export default NewParticipantForm;
