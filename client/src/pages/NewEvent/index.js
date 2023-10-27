// chakra-ui
import {
  Box,
  Heading,
  Input,
  Select,
  VStack,
  Textarea,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
// Apollo Client
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS, GET_LOCATIONS, CREATE_EVENT_MUTATION } from "./queries";
import { GET_EVENTS } from "../Home/queries";
// React Router
import { useNavigate } from "react-router-dom";

function NewEvent() {
  const [saveEvent, { loading }] = useMutation(CREATE_EVENT_MUTATION);

  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
  const { loading: get_loc_loading, data: loc_data } = useQuery(GET_LOCATIONS);

  const navigate = useNavigate();

  const [formData, setformData] = useState({
    title: "",
    desc: "",
    date: "",
    from: "",
    to: "",
    location_id: "",
    user_id: "",
  });
  const [fieldErrors, setfieldErrors] = useState({
    title: false,
    desc: false,
    date: false,
    from: false,
    to: false,
    location_id: false,
    user_id: false,
  });

  const handleFormChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFormField = (e) => {
    if (formData[e.target.name] === "") {
      setfieldErrors({ ...fieldErrors, [e.target.name]: true });
    } else {
      setfieldErrors({ ...fieldErrors, [e.target.name]: false });
    }
  };

  const findEmptyKey = (obj) => {
    for (let key in obj) {
      if (obj[key] === "") {
        return key;
      }
    }
    return null;
  };

  const toast = useToast();

  const handleFormSubmit = async () => {
    const emptyKey = findEmptyKey(formData);
    if (!emptyKey) {
      try {
        await saveEvent({
          variables: {
            data: formData,
          },
          refetchQueries: [GET_EVENTS],
        });
        toast({
          title: "Success",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      } catch (e) {
        toast({
          title: "Event not saved!",
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
    <Box>
      <Heading as="h3" size="lg">
        New Event
      </Heading>
      <VStack
        spacing={2}
        align="stretch"
        mt="15px"
        border="1px"
        borderColor="gray.200"
        rounded="md"
        p="10px"
      >
        <Select
          name="user_id"
          placeholder="Please select a user"
          onChange={handleFormChange}
          isInvalid={fieldErrors.user_id}
          onBlur={validateFormField}
          isDisabled={get_users_loading}
        >
          {users_data &&
            users_data.users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
        </Select>
        <Input
          placeholder="Please enter your title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          isInvalid={fieldErrors.title}
          onBlur={validateFormField}
        />
        <Textarea
          placeholder="Please enter your description"
          type="text"
          name="desc"
          value={formData.desc}
          onChange={handleFormChange}
          isInvalid={fieldErrors.desc}
          onBlur={validateFormField}
        />
        <Select
          name="location_id"
          placeholder="Please select a location"
          onChange={handleFormChange}
          isInvalid={fieldErrors.location_id}
          onBlur={validateFormField}
          isDisabled={get_loc_loading}
        >
          {loc_data &&
            loc_data.locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
        </Select>
        <FormControl>
          <FormLabel>Please select event date</FormLabel>
          <Input
            placeholder="Please select event date"
            type="date"
            name="date"
            onChange={handleFormChange}
            isInvalid={fieldErrors.date}
            onBlur={validateFormField}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Please select the event start time</FormLabel>
          <Input
            placeholder="Please select the event start time"
            type="time"
            name="from"
            onChange={handleFormChange}
            isInvalid={fieldErrors.from}
            onBlur={validateFormField}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Please select the event end time</FormLabel>
          <Input
            placeholder="Please select the event end time"
            type="time"
            name="to"
            onChange={handleFormChange}
            isInvalid={fieldErrors.to}
            onBlur={validateFormField}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          isLoading={loading}
          type="submit"
          onClick={handleFormSubmit}
        >
          Add Event
        </Button>
      </VStack>
    </Box>
  );
}

export default NewEvent;
