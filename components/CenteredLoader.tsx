import { ClipLoader } from "react-spinners";

const CenteredLoader = ({ minH = 320 }: { minH?: number }) => {
  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ minHeight: minH }}
    >
      <ClipLoader size={48} color="#9ca3af" />
    </div>
  );
};

export default CenteredLoader;
