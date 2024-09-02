import { UserWithStories } from "@/types/user";

export enum StoryActionType {
  SET_STORIES = "SET_STORIES",
  OPEN_STORY = "OPEN_STORY",
  CLOSE_STORY = "CLOSE_STORY",
  NEXT_STORY = "NEXT_STORY",
  PREV_STORY = "PREV_STORY",
}

export type StoryReducerState = {
  currentUserIndex: number | null;
  currentStoryIndex: number;
  stories: UserWithStories[];
};

export type StoryReducerAction =
  | {
      type: StoryActionType.SET_STORIES;
      payload: UserWithStories[];
    }
  | {
      type: StoryActionType.OPEN_STORY;
      payload: number;
    }
  | {
      type: StoryActionType.CLOSE_STORY;
      payload?: number;
    }
  | {
      type: StoryActionType.NEXT_STORY | StoryActionType.PREV_STORY;
      payload?: any;
    };

export function storyReducer(
  state: StoryReducerState,
  action: StoryReducerAction
): StoryReducerState {
  const { type, payload } = action;

  switch (type) {
    case StoryActionType.SET_STORIES: {
      return { ...state, stories: payload };
    }
    case StoryActionType.OPEN_STORY: {
      return {
        ...state,
        currentUserIndex: payload,
        currentStoryIndex: 0,
      };
    }

    case StoryActionType.CLOSE_STORY: {
      const userIndex = payload || null;

      return { ...state, currentUserIndex: userIndex, currentStoryIndex: 0 };
    }

    case StoryActionType.NEXT_STORY: {
      const { currentStoryIndex, stories, currentUserIndex } = state;

      if (currentUserIndex === null) return state;

      const newState = structuredClone(state);
      if (currentStoryIndex < stories[currentUserIndex].stories.length - 1) {
        newState.currentStoryIndex++;
      } else if (currentUserIndex < stories.length - 1) {
        newState.currentUserIndex = currentUserIndex + 1;
        newState.currentStoryIndex = 0;
      } else {
        newState.currentUserIndex = null;
      }

      return newState;
    }

    case StoryActionType.PREV_STORY: {
      const { currentStoryIndex, currentUserIndex, stories } = state;

      if (currentUserIndex === null) return state;

      const newState = structuredClone(state);

      if (currentStoryIndex > 0) {
        newState.currentStoryIndex--;
      } else if (currentUserIndex > 0) {
        newState.currentUserIndex = currentUserIndex - 1;
        newState.currentStoryIndex =
          stories[newState.currentUserIndex].stories.length - 1;
      }

      return newState;
    }

    default:
      return state;
  }
}
