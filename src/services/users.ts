import http from "@/lib/http";
import { UserWithStories } from "@/types/user";

export async function getUserAndStories(): Promise<UserWithStories[]> {
  const users = await http.get("/users?_embed=stories");

  return users;
}
