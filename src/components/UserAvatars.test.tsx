import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserAvatars from "./UserAvatars";
import { describe, it, expect } from "@jest/globals";
import { UserWithStories } from "@/types/user";
import { StoryType } from "@/types/story";

const mockUsers: UserWithStories[] = [
  {
    id: "SDqolnwhpM6HsQhuD5eNr",
    name: "User 1",
    username: "User1",
    avatar: "https://avatars.githubusercontent.com/u/27469926",
    stories: [
      {
        id: "MZFgz1xL6w5p8IY5fb9fB",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        created: "2024-08-29T01:12:32.399Z",
        userId: "SDqolnwhpM6HsQhuD5eNr",
        type: StoryType.VID,
      },
      {
        id: "lxKJpRNg5XGYMkRdPY3Zt",
        url: "https://picsum.photos/seed/rzuY1PT/640/480",
        created: "2024-08-29T01:25:29.241Z",
        userId: "SDqolnwhpM6HsQhuD5eNr",
      },
    ],
  },
  {
    id: "dpBDTmmpkLccLQORUCQ13",
    name: "User 2",
    username: "User2",
    avatar: "https://avatars.githubusercontent.com/u/69004360",
    stories: [
      {
        id: "cSSDljPRGWQQVH6UcqkZy",
        url: "https://loremflickr.com/640/480?lock=5817403933982720",
        created: "2024-08-29T10:35:39.966Z",
        userId: "dpBDTmmpkLccLQORUCQ13",
      },
      {
        id: "hOx64b_yj8azUUqshNN6a",
        url: "https://loremflickr.com/640/480?lock=5812637132652544",
        created: "2024-08-28T23:54:20.312Z",
        userId: "dpBDTmmpkLccLQORUCQ13",
      },
    ],
  },
];

describe("UserAvatars", () => {
  it("should render user avatars", () => {
    render(<UserAvatars users={mockUsers} openStory={jest.fn()} />);

    const avatars = screen.getAllByRole("img");
    expect(avatars).toHaveLength(mockUsers.length);

    expect(avatars[0]).toHaveAttribute(
      "src",
      expect.stringContaining(
        "/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F27469926&w=128&q=75"
      )
    );
    expect(avatars[1]).toHaveAttribute(
      "src",
      expect.stringContaining(
        "/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F69004360&w=128&q=75"
      )
    );
  });

  it("should call openStory with correct arguments when an avatar is clicked", () => {
    const mockOpenStory = jest.fn();
    render(<UserAvatars users={mockUsers} openStory={mockOpenStory} />);

    const firstAvatar = screen.getAllByRole("img")[0];
    fireEvent.click(firstAvatar);

    expect(mockOpenStory).toHaveBeenCalledWith(0, 0);

    const secondAvatar = screen.getAllByRole("img")[1];
    fireEvent.click(secondAvatar);

    expect(mockOpenStory).toHaveBeenCalledWith(1, 0);
  });

  it("should render avatar alt text correctly", () => {
    render(<UserAvatars users={mockUsers} openStory={jest.fn()} />);

    const firstAvatar = screen.getByAltText("User 1");
    const secondAvatar = screen.getByAltText("User 2");

    expect(firstAvatar).toBeInTheDocument();
    expect(secondAvatar).toBeInTheDocument();
  });
});
