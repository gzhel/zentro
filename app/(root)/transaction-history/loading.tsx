import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full p-6">
      <ClipLoader size={48} color="#9ca3af" />
    </div>
  );
};

export default Loading;
