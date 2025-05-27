import FadeLoader from "react-spinners/FadeLoader";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <FadeLoader size={250} />
    </div>
  );
};
