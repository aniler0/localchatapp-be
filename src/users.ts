import { User } from "./types/Users";

export const users: User[] = [];

export const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name,
  );

  if (existingUser) {
    return { error: "Username is taken !" };
  }

  const user: User = { id, name, room };
  users.push(user);
  return { user };
};

export const removeUser = (id) => {
  return users.filter((user) => user.id !== id);
};
export const getUser = (id) => {
  return users.find((user) => user.id === id);
};
export const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};
