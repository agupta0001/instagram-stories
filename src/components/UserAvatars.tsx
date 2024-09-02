import { FC } from "react";
import Image from "next/image";

import { UserWithStories } from "@/types/user";

type UserAvatarsProps = {
  users: UserWithStories[];
  openStory: (userIndex: number, storyIndex: number) => void;
};

export const UserAvatars: FC<UserAvatarsProps> = ({ users, openStory }) => {
  return (
    <div className="h-[88px] w-full flex overflow-x-auto px-4 py-3 gap-3">
      {users.map((user, idx) => (
        <Image
          key={user.avatar}
          src={user.avatar}
          width={64}
          height={64}
          className="rounded-full border-2 border-orange-700 cursor-pointer w-16 h-16"
          alt={user.name}
          onClick={() => openStory(idx, 0)}
        />
      ))}
    </div>
  );
};

export default UserAvatars;
