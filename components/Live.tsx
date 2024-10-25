import { CursorMode } from '@/types/type';
import CursorChat from './cursor/CursorChat';
import LiveCursors from './cursor/LiveCursors';
import { useLiveHandlers } from '@/hooks/useLiveHandlers';
import ReactionSelector from './reaction/ReactionBtn';

const Live = () => {
  const {
    others,
    handlePointerLeave,
    handlePointerMove,
    handlePointerDown,
    cursor,
    cursorState,
    setCursorState,
    updateMyPresence,
    reactions,
    setReactions,
    handleSetReactions,
    handlePointerUp,
  } = useLiveHandlers();

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="border-2 border-green-500 h-screen w-full flex justify-center items-center"
    >
      <h1 className="text-2xl text-white">LiveBlock - Figma Clone</h1>;
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={handleSetReactions} />
      )}
      <LiveCursors others={others} />
    </div>
  );
};

export default Live;
