import Image from "next/image";
import { FC } from "react";

type HeaderProps = {
  avatar: string;
  name: string;
  closeStory: () => void;
};

const Header: FC<HeaderProps> = ({ avatar, name, closeStory }) => {
  return (
    <div className="flex mt-2 justify-between">
      <div className="flex">
        <Image
          src={avatar}
          className="size-10 rounded-full mr-3"
          width="40"
          height="40"
          alt={`${name}'s avatar`}
        />
        <span className="flex">
          <p className="text-white opacity-90 text-sm">{name}</p>
        </span>
      </div>
      <button>
        <Image
          src="close.svg"
          alt="Close Story"
          width="24"
          height="24"
          className="text-white"
          onClick={() => closeStory()}
          data-testid="close-story"
        />
      </button>
    </div>
  );
};

export default Header;
