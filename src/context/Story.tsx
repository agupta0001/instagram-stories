import { UserWithStories } from "@/types/user";
import { createContext, FC, ReactNode } from "react";

type IStoryContext = {
  stories: UserWithStories[];
  currentUserIndex: number | null;
  currentStoryIndex: number | null;
};

export const initialState: IStoryContext = {
  stories: [],
  currentUserIndex: null,
  currentStoryIndex: null,
};

const StoryContext = createContext<IStoryContext>(initialState);

const StoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <StoryContext.Provider value={initialState}>
      {children}
    </StoryContext.Provider>
  );
};

export default StoryProvider;
