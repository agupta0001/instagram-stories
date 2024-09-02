import { Story } from "./story";

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};

export type UserWithStories = User & { stories: Story[] };
