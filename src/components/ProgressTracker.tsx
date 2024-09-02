import { FC, useEffect, useState } from "react";

type ProgressTrackerProps = {
  storiesCount: number;
  currentStoryId: number;
  duration?: number;
  handleNext: () => void;
  isLoading: boolean;
};

const ProgressTracker: FC<ProgressTrackerProps> = ({
  storiesCount,
  currentStoryId,
  duration = 1000,
  isLoading,
  handleNext,
}) => {
  useEffect(() => {
    addEventListener("webkitAnimationEnd", handleNext);
    addEventListener("animationend", handleNext);
    addEventListener("oanimationend", handleNext);

    return () => {
      removeEventListener("webkitAnimationEnd", handleNext);
      removeEventListener("animationend", handleNext);
      removeEventListener("oanimationend", handleNext);
    };
  }, [handleNext]);

  return (
    <div className="flex gap-[2px]">
      {new Array(storiesCount).fill(0).map((_, idx) => {
        const isStoryActive = idx === currentStoryId;
        return (
          <div
            className={`flex-1 h-[2px] bg-white relative overflow-hidden ${
              !isStoryActive && idx < currentStoryId
                ? "opacity-1"
                : "bg-opacity-35"
            }`}
            key={idx}
          >
            {isStoryActive && (
              <div
                className={`size-full bg-white absolute`}
                style={{
                  transformOrigin: "left",
                  animation: `${duration}ms linear 0ms slidein`,
                  animationPlayState: isLoading ? "paused" : "running",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTracker;
