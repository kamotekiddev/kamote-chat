import { ButtonHTMLAttributes, ComponentProps } from "react";
import { FiLogOut } from "react-icons/fi";

const LogoutIconButton = ({ ...props }: ComponentProps<"button">) => {
  return (
    <button
      className="group block rounded-lg p-2 transition-all duration-75 ease-linear hover:bg-white"
      {...props}
    >
      <FiLogOut className="h-7 w-7 text-indigo-500 group-hover:text-indigo-600" />
    </button>
  );
};

export default LogoutIconButton;
