import { nanoid } from "nanoid";
import { pipe, filter } from "graphql-yoga";

export const resolvers = {
  Subscription: {
    // Event
    eventCreated: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.subscribe("eventCreated");
      },
      resolve: (payload) => payload,
    },
    eventCount: {
      subscribe: (_, __, { pubSub, db: { events } }) => {
        setTimeout(() => {
          pubSub.publish("eventCount", events.length);
        });
        return pubSub.subscribe("eventCount");
      },
      resolve: (payload) => payload,
    },
    // User
    userCreated: {
      subscribe: (_, __, { pubSub }) => {
        return pubSub.subscribe("userCreated");
      },
      resolve: (payload) => payload,
    },
    // Participant
    participantCreated: {
      subscribe: (_, { event_id }, { pubSub }) => {
        if (event_id) {
          return pipe(
            pubSub.subscribe("participantCreated"),
            filter((participant) => participant.event_id === event_id)
          );
        }
        return pubSub.subscribe("participantCreated");
      },
      resolve: (payload) => payload,
    },
  },
  Mutation: {
    // Event
    createEvent: (_, { data }, { pubSub, db: { events } }) => {
      const event = { id: nanoid(), ...data };
      events.unshift(event);
      pubSub.publish("eventCreated", event);
      pubSub.publish("eventCount", events.length);
      return event;
    },
    updateEvent: (_, { id, data }, { db: { events } }) => {
      const event_index = events.findIndex(
        (event) => event.id.toString() === id
      );
      if (event_index === -1) {
        throw new Error("Event not found.");
      }
      const updated_event = (events[event_index] = {
        ...events[event_index],
        ...data,
      });
      return updated_event;
    },
    deleteEvent: (_, { id }, { db: { events } }) => {
      const event_index = events.findIndex(
        (event) => event.id.toString() === id
      );
      if (event_index === -1) {
        throw new Error("Event not found.");
      }
      const deleted_event = events[event_index];
      events.splice(event_index, 1);
      return deleted_event;
    },
    deleteAllEvents: (_, __, { db: { events } }) => {
      const length = events.length;
      events.splice(0, length);
      return { count: length };
    },
    // User
    createUser: (_, { data }, { pubSub, db: { users } }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      pubSub.publish("userCreated", user);
      return user;
    },
    updateUser: (_, { id, data }, { db: { users } }) => {
      const user_index = users.findIndex((user) => user.id.toString() === id);
      if (user_index === -1) {
        throw new Error("User not found.");
      }
      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      return updated_user;
    },
    deleteUser: (_, { id }, { db: { users } }) => {
      const user_index = users.findIndex((user) => user.id.toString() === id);
      if (user_index === -1) {
        throw new Error("User not found.");
      }
      const deleted_user = users[user_index];
      users.splice(user_index, 1);
      return deleted_user;
    },
    deleteAllUsers: (_, __, { db: { users } }) => {
      const length = users.length;
      users.splice(0, length);
      return { count: length };
    },
    // Location
    createLocation: (_, { data }, { db: { locations } }) => {
      const location = { id: nanoid(), ...data };
      locations.push(location);
      return location;
    },
    updateLocation: (_, { id, data }, { db: { locations } }) => {
      const location_index = locations.findIndex(
        (location) => location.id.toString() === id
      );
      if (location_index === -1) {
        throw new Error("Location not found.");
      }
      const updated_location = (locations[location_index] = {
        ...locations[location_index],
        ...data,
      });
      return updated_location;
    },
    deleteLocation: (_, { id }, { db: { locations } }) => {
      const location_index = locations.findIndex(
        (location) => location.id.toString() === id
      );
      if (location_index === -1) {
        throw new Error("Location not found.");
      }
      const deleted_location = locations[location_index];
      locations.splice(location_index, 1);
      return deleted_location;
    },
    deleteAllLocations: (_, __, { db: { locations } }) => {
      const length = locations.length;
      locations.splice(0, length);
      return { count: length };
    },
    // Participant
    createParticipant: (_, { data }, { pubSub, db: { participants } }) => {
      const participant = { id: nanoid(), ...data };
      participants.push(participant);
      pubSub.publish("participantCreated", participant);
      return participant;
    },
    updateParticipant: (_, { id, data }, { db: { participants } }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id.toString() === id
      );
      if (participant_index === -1) {
        throw new Error("Participant not found.");
      }
      const updated_participant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });
      return updated_participant;
    },
    deleteParticipant: (_, { id }, { db: { participants } }) => {
      const participant_index = participants.findIndex(
        (participant) => participant.id.toString() === id
      );
      if (participant_index === -1) {
        throw new Error("Participant not found.");
      }
      const deleted_participant = participants[participant_index];
      participants.splice(participant_index, 1);
      return deleted_participant;
    },
    deleteAllParticipants: (_, __, { db: { participants } }) => {
      const length = participants.length;
      participants.splice(0, length);
      return { count: length };
    },
  },
  Query: {
    // Event
    events: (_, __, { db: { events } }) => events,
    event: (_, args, { db: { events } }) => {
      const result = events.find((event) => event.id.toString() === args.id);
      if (!result) {
        throw new Error("Event not found");
      }
      return result;
    },
    //Location
    locations: (_, __, { db: { locations } }) => locations,
    location: (_, args, { db: { locations } }) => {
      const result = locations.find(
        (location) => location.id.toString() === args.id
      );
      if (!result) {
        throw new Error("Location not found");
      }
      return result;
    },
    // User
    users: (_, __, { db: { users } }) => users,
    user: (_, args, { db: { users } }) => {
      const result = users.find((user) => user.id.toString() === args.id);
      if (!result) {
        throw new Error("User not found");
      }
      return result;
    },
    // Participant
    participants: (_, __, { db: { participants } }) => participants,
    participant: (_, args, { db: { participants } }) => {
      const result = participants.find(
        (participant) => participant.id.toString() === args.id
      );
      if (!result) {
        throw new Error("Participant not found");
      }
      return result;
    },
  },
  Event: {
    location: (parent, __, { db: { locations } }) => {
      const result = locations.find(
        (location) => location.id.toString() === parent.location_id.toString()
      );
      return result;
    },
    user: (parent, __, { db: { users } }) => {
      const result = users.find(
        (user) => user.id.toString() === parent.user_id.toString()
      );
      return result;
    },
    participants: (parent, __, { db: { participants } }) => {
      const result = participants.filter(
        (participant) =>
          participant.event_id.toString() === parent.id.toString()
      );
      return result;
    },
  },
  User: {
    events: (parent, __, { db: { events } }) => {
      const result = events.filter(
        (event) => event.user_id.toString() === parent.id.toString()
      );
      return result;
    },
    attended_events: (parent, __, { db: { participants, events } }) => {
      const attended_events = participants.filter(
        (participant) => participant.user_id.toString() === parent.id.toString()
      );
      let arr = [];
      attended_events.forEach((item) => {
        const result = events.find(
          (event) => event.id.toString() === item.event_id.toString()
        );
        if (result) {
          arr.push(result);
        }
      });
      return arr;
    },
  },
  Participant: {
    user: (parent, __, { db: { users } }) => {
      const result = users.find(
        (user) => user.id.toString() === parent.user_id.toString()
      );
      return result;
    },
    event: (parent, __, { db: { events } }) => {
      const result = events.find(
        (event) => event.id.toString() === parent.event_id.toString()
      );
      return result;
    },
  },
};
