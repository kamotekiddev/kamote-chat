import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface Props {
  href: string;
  icon: IconType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ href, isActive, icon: Icon, label, onClick }: Props) => {
  const handleClick = () => onClick && onClick();

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={twMerge(
        "group flex w-full gap-4 rounded-lg p-2 transition-all duration-75 ease-linear hover:bg-white",
        isActive && "bg-white"
      )}
    >
      {Icon && (
        <Icon
          className={twMerge(
            "h-7 w-7 text-indigo-500 group-hover:text-indigo-600",
            isActive && "text-indigo-600"
          )}
        />
      )}
      {label}
    </Link>
  );
};

export default SidebarItem;
