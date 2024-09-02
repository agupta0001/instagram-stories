import { FC, MouseEvent, ReactEventHandler, useRef, useState } from "react";
import ProgressTracker from "./ProgressTracker";
import Image from "next/image";
import Header from "./Header";
import { UserWithStories } from "@/types/user";
import Spinner from "./Spinner";
import { StoryType } from "@/types/story";

type StoriesProps = {
  userStory?: UserWithStories;
  storyIndex: number;
  closeStory: (userIdx?: number) => void;
  nextStory: () => void;
  prevStory: () => void;
};

const DEFAULT_DURATION = 5000;

const Stories: FC<StoriesProps> = ({
  userStory,
  storyIndex,
  closeStory,
  nextStory,
  prevStory,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoDuration, setVideoDuration] = useState(DEFAULT_DURATION);
  const videoRef = useRef<HTMLVideoElement>(null);

  const story = userStory?.stories?.[storyIndex];

  const handleNavigation = (e: MouseEvent<HTMLDivElement>) => {
    const clickPosition = e.clientX;
    const targetElement = e.target as HTMLElement;

    if (clickPosition < (targetElement.offsetWidth || window.innerWidth) / 2) {
      prevStory();
    } else {
      nextStory();
    }
  };

  if (!userStory || !story) return null;

  const handleVideoLoad = () => {
    if (!videoRef.current) return;
    setVideoDuration(videoRef.current.duration * 1000);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full">
      <div
        id="header"
        className="pt-5 pb-8 px-4 absolute top-0 left-0 w-full story_header z-10"
      >
        <ProgressTracker
          storiesCount={userStory.stories.length}
          currentStoryId={storyIndex}
          duration={
            story.type === StoryType.VID ? videoDuration : DEFAULT_DURATION
          }
          handleNext={() => {
            setIsLoading(true);
            nextStory();
          }}
          isLoading={isLoading}
        />
        <Header
          avatar={userStory.avatar}
          name={userStory.name}
          closeStory={closeStory}
        />
      </div>
      <div
        className="absolute top-0 left-0 w-full flex justify-center items-center h-dvh bg-black"
        onClick={handleNavigation}
        data-testid="navigation-element"
      >
        {isLoading && <Spinner />}
        {(!story.type || story.type === StoryType.IMG) && (
          <Image
            data-teststoryid={story.id}
            src={story.url}
            alt="story"
            width="480"
            height="640"
            className={`w-full ${isLoading ? "opacity-0" : ""}`}
            onLoad={handleLoad}
          />
        )}
        {story.type === StoryType.VID && (
          <video
            data-teststoryid={story.id}
            data-testid="video-story"
            src={story.url}
            ref={videoRef}
            onLoadedData={handleVideoLoad}
            autoPlay
          />
        )}
      </div>
    </div>
  );
};

export default Stories;
