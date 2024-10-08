import LiveCursors from "./cursor/LiveCursors";
import { useLiveHandlers } from "@/hooks/useLiveHandlers";

const Live = () => {
  const { others, handlePointerLeave, handlePointerMove, handlePointerDown } =
    useLiveHandlers();

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="border-2 border-green-500 h-screen w-full flex justify-center items-center"
    >
      <h1 className="text-2xl text-white">LiveBlock - Figma Clone</h1>;
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
