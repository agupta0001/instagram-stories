import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Stories from "./Stories";
import { UserWithStories } from "@/types/user";
import { StoryType } from "@/types/story";

const mockCloseStory = jest.fn();
const mockNextStory = jest.fn();
const mockPrevStory = jest.fn();

const userStory: UserWithStories = {
  id: "SDqolnwhpM6HsQhuD5eNr",
  name: "Orlando Langworth",
  username: "Lonzo.Nikolaus30",
  avatar: "https://avatars.githubusercontent.com/u/90824885",
  stories: [
    {
      id: "MZFgz1xL6w5p8IY5fb9fB",
      url: "https://picsum.photos/seed/Qc9s9TVP0x/640/480",
      created: "2024-08-29T01:12:32.399Z",
      userId: "SDqolnwhpM6HsQhuD5eNr",
      type: StoryType.IMG,
    },
    {
      id: "lxKJpRNg5XGYMkRdPY3Zt",
      url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      created: "2024-08-29T01:25:29.241Z",
      userId: "SDqolnwhpM6HsQhuD5eNr",
      type: StoryType.VID,
    },
  ],
};

describe("Stories Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with image story", () => {
    render(
      <Stories
        userStory={userStory}
        storyIndex={0}
        closeStory={mockCloseStory}
        nextStory={mockNextStory}
        prevStory={mockPrevStory}
      />
    );

    expect(screen.getByAltText("story")).toBeInTheDocument();
    expect(screen.queryByRole("video")).not.toBeInTheDocument();
  });

  test("renders correctly with video story", () => {
    render(
      <Stories
        userStory={userStory}
        storyIndex={1}
        closeStory={mockCloseStory}
        nextStory={mockNextStory}
        prevStory={mockPrevStory}
      />
    );

    expect(screen.queryByAltText("story")).not.toBeInTheDocument();
    expect(screen.getByTestId("video-story")).toBeInTheDocument();
  });

  test("calls nextStory when clicking on the right side", () => {
    render(
      <Stories
        userStory={userStory}
        storyIndex={0}
        closeStory={mockCloseStory}
        nextStory={mockNextStory}
        prevStory={mockPrevStory}
      />
    );

    const container = screen.getByTestId("navigation-element");
    fireEvent.click(container, { clientX: window.innerWidth / 2 + 1 });
    expect(mockNextStory).toHaveBeenCalled();
  });

  test("calls prevStory when clicking on the left side", () => {
    render(
      <Stories
        userStory={userStory}
        storyIndex={1}
        closeStory={mockCloseStory}
        nextStory={mockNextStory}
        prevStory={mockPrevStory}
      />
    );

    const container = screen.getByTestId("navigation-element");
    fireEvent.click(container, { clientX: window.innerWidth / 2 - 1 });
    expect(mockPrevStory).toHaveBeenCalled();
  });

  test("shows spinner while loading image", () => {
    render(
      <Stories
        userStory={userStory}
        storyIndex={0}
        closeStory={mockCloseStory}
        nextStory={mockNextStory}
        prevStory={mockPrevStory}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("removes spinner after image has loaded", async () => {
    render(
      <Stories
        userStory={userStory}
        storyIndex={0}
        closeStory={mockCloseStory}
        nextStory={mockNextStory}
        prevStory={mockPrevStory}
      />
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    const image = screen.getByAltText("story");
    fireEvent.load(image);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });
  });

  test("sets video duration on video load", () => {
    render(
      <Stories
        userStory={userStory}
        storyIndex={1}
        closeStory={mockCloseStory}
        nextStory={mockNextStory}
        prevStory={mockPrevStory}
      />
    );

    const videoElement = screen.getByTestId("video-story");
    Object.defineProperty(videoElement, "duration", {
      value: 10,
      writable: true,
    });
    fireEvent.loadedData(videoElement);
    expect(videoElement.duration).toBeGreaterThan(0);
  });
});
