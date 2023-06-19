import Image from "next/image";
import React from "react";

import userNoProfile from "@/assets/userNoProfile.png";

interface Props {
  imageUrl?: string | null;
  name?: string | null;
  email?: string | null;
}
const UserAvatar = ({ imageUrl }: Props) => {
  return (
    <div className="inline-grid h-10 w-10 place-items-center rounded-lg bg-white">
      <div className="relative h-8 w-8 overflow-hidden rounded-lg object-cover">
        <Image fill src={imageUrl || userNoProfile} alt="Profile Picture" />
      </div>
    </div>
  );
};

export default UserAvatar;
