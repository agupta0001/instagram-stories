import { StoryType } from "@/types/story";
import {
  storyReducer,
  StoryActionType,
  StoryReducerState,
  StoryReducerAction,
} from "./story";
import { UserWithStories } from "@/types/user";

if (typeof global.structuredClone === "undefined") {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

const mockStories: UserWithStories[] = [
  {
    id: "SDqolnwhpM6HsQhuD5eNr",
    name: "Orlando Langworth",
    username: "Lonzo.Nikolaus30",
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
    name: "Dustin Adams",
    username: "Trent42",
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

const initialState: StoryReducerState = {
  currentUserIndex: null,
  currentStoryIndex: 0,
  stories: [],
};

describe("storyReducer", () => {
  it("should set stories", () => {
    const action: StoryReducerAction = {
      type: StoryActionType.SET_STORIES,
      payload: mockStories,
    };
    const newState = storyReducer(initialState, action);
    expect(newState.stories).toEqual(mockStories);
  });

  it("should open a story", () => {
    const action: StoryReducerAction = {
      type: StoryActionType.OPEN_STORY,
      payload: 0,
    };
    const newState = storyReducer(initialState, action);
    expect(newState.currentUserIndex).toBe(0);
    expect(newState.currentStoryIndex).toBe(0);
  });

  it("should close a story", () => {
    const action: StoryReducerAction = {
      type: StoryActionType.CLOSE_STORY,
    };
    const stateWithStoryOpened = {
      ...initialState,
      currentUserIndex: 0,
      currentStoryIndex: 0,
    };
    const newState = storyReducer(stateWithStoryOpened, action);
    expect(newState.currentUserIndex).toBe(null);
    expect(newState.currentStoryIndex).toBe(0);
  });

  it("should move to the next story in the same user", () => {
    const stateWithStoryOpened = {
      ...initialState,
      currentUserIndex: 0,
      currentStoryIndex: 0,
      stories: mockStories,
    };
    const action: StoryReducerAction = { type: StoryActionType.NEXT_STORY };
    const newState = storyReducer(stateWithStoryOpened, action);
    expect(newState.currentStoryIndex).toBe(1);
    expect(newState.currentUserIndex).toBe(0);
  });

  it("should move to the next user when all stories are viewed", () => {
    const stateWithStoryOpened = {
      ...initialState,
      currentUserIndex: 0,
      currentStoryIndex: 1,
      stories: mockStories,
    };
    const action: StoryReducerAction = { type: StoryActionType.NEXT_STORY };
    const newState = storyReducer(stateWithStoryOpened, action);
    expect(newState.currentStoryIndex).toBe(0);
    expect(newState.currentUserIndex).toBe(1);
  });

  it("should close stories when the last story of the last user is viewed", () => {
    const stateWithStoryOpened = {
      ...initialState,
      currentUserIndex: 1,
      currentStoryIndex: 0,
      stories: mockStories,
    };
    const action: StoryReducerAction = { type: StoryActionType.NEXT_STORY };
    let newState = storyReducer(stateWithStoryOpened, action);
    newState = storyReducer(newState, action);
    newState = storyReducer(newState, action);

    expect(newState.currentUserIndex).toBe(null);
  });

  it("should move to the previous story in the same user", () => {
    const stateWithStoryOpened = {
      ...initialState,
      currentUserIndex: 0,
      currentStoryIndex: 1,
      stories: mockStories,
    };
    const action: StoryReducerAction = { type: StoryActionType.PREV_STORY };
    const newState = storyReducer(stateWithStoryOpened, action);
    expect(newState.currentStoryIndex).toBe(0);
    expect(newState.currentUserIndex).toBe(0);
  });

  it("should move to the previous user when the first story is viewed", () => {
    const stateWithStoryOpened = {
      ...initialState,
      currentUserIndex: 1,
      currentStoryIndex: 0,
      stories: mockStories,
    };
    const action: StoryReducerAction = { type: StoryActionType.PREV_STORY };
    const newState = storyReducer(stateWithStoryOpened, action);
    expect(newState.currentStoryIndex).toBe(1);
    expect(newState.currentUserIndex).toBe(0);
  });
});
