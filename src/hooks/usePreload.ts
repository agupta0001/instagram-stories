import { Story } from "@/types/story";
import { UserWithStories } from "@/types/user";
import { useEffect, useMemo } from "react";

const PRELOAD_COUNT = 5;

const urlsCached = new Set<string>();

const shouldPreload = (story: Story) => {
  if (!story.url) return false;
  if (urlsCached.has(story.url)) return false;

  return true;
};

const cacheAssets = async (stories: Story[]) => {
  const promises = stories.map((story) => {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = story.url;
      img.onload = (...args) => {
        urlsCached.add(story.url);
        res(args);
      };
      img.onerror = rej;
    });
  });

  await Promise.all(promises);
};

export const usePreload = (
  userWithStories: UserWithStories[],
  pointers: { userIndex: number; storyIndex: number }
) => {
  const stories = useMemo(
    () =>
      userWithStories.reduce(
        (storiesAcc: Story[], currentUser: UserWithStories) => [
          ...storiesAcc,
          ...currentUser.stories,
        ],
        []
      ),
    [userWithStories]
  );

  const flattenedIndex = useMemo(
    () =>
      userWithStories
        .slice(0, pointers.userIndex)
        .reduce((acc, curr) => acc + curr.stories.length, 0) +
      pointers.storyIndex,
    [userWithStories, pointers]
  );

  useEffect(() => {
    const preloadTill = flattenedIndex + PRELOAD_COUNT + 1;

    const toPreload = stories
      .slice(flattenedIndex + 1, preloadTill)
      .filter(shouldPreload);

    cacheAssets(toPreload);
  }, [flattenedIndex, stories]);
};
