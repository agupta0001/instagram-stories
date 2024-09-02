import { UserWithStories } from "@/types/user";
import axios from "axios";

export async function getUserAndStories(): Promise<UserWithStories[]> {
  const users = await axios.get("/api/stories");

  return users.data;
}
