import { BsChatText } from "react-icons/bs";

interface Props {
  title?: string;
  message?: string;
}
const EmptyState = ({ title, message }: Props) => {
  return (
    <main className="grid h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="md:items-left flex flex-col items-center text-center">
        <BsChatText className="h-32 w-32 text-gray-900" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {title || "No Open Coversation"}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {message || "Please select a friend to start with a coversation."}
        </p>
      </div>
    </main>
  );
};

export default EmptyState;
