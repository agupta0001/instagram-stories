import Stories from "@/components/Stories";
import UserAvatars from "@/components/UserAvatars";
import { usePreload } from "@/hooks/usePreload";
import { GET_USERS_AND_STORIES } from "@/lib/queryKeys";
import { StoryActionType, storyReducer } from "@/reducers/story";
import { getUserAndStories } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useReducer } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [storyState, dispatch] = useReducer(storyReducer, {
    currentUserIndex: null,
    currentStoryIndex: 0,
    stories: [],
  });

  const usersAndStoriesQuery = useQuery({
    queryKey: [GET_USERS_AND_STORIES],
    queryFn: getUserAndStories,
  });

  usePreload(storyState.stories, {
    userIndex: storyState.currentUserIndex || 0,
    storyIndex: storyState.currentStoryIndex,
  });

  useEffect(() => {
    dispatch({
      type: StoryActionType.SET_STORIES,
      payload: usersAndStoriesQuery.data || [],
    });
  }, [usersAndStoriesQuery.data]);

  const nextStory = useCallback(() => {
    dispatch({ type: StoryActionType.NEXT_STORY });
  }, []);

  const closeStory = useCallback(() => {
    dispatch({ type: StoryActionType.CLOSE_STORY });
  }, []);

  const prevStory = useCallback(() => {
    dispatch({ type: StoryActionType.PREV_STORY });
  }, []);

  const openStory = useCallback((userIndex: number) => {
    dispatch({ type: StoryActionType.OPEN_STORY, payload: userIndex });
  }, []);

  if (usersAndStoriesQuery.isLoading)
    return (
      <div className="size-full flex justify-center items-center">
        Loading...
      </div>
    );

  if (usersAndStoriesQuery.isError) return "Something went wrong...";

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className} size-full overflow-hidden`}
    >
      <div className="max-w-2xl w-full relative">
        <UserAvatars
          users={usersAndStoriesQuery.data || []}
          openStory={openStory}
        />
        {storyState.currentUserIndex !== null && (
          <Stories
            storyIndex={storyState.currentStoryIndex}
            closeStory={closeStory}
            userStory={storyState.stories[storyState.currentUserIndex]}
            nextStory={nextStory}
            prevStory={prevStory}
          />
        )}
      </div>
    </main>
  );
}
