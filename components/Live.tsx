import { CursorMode, ReactionEvent } from '@/types/type';
import CursorChat from './cursor/CursorChat';
import LiveCursors from './cursor/LiveCursors';
import { useLiveHandlers } from '@/hooks/useLiveHandlers';
import ReactionSelector from './reaction/ReactionBtn';
import FlyingReaction from './reaction/FlyingReaction';
import useInterval from '@/hooks/useInterval';
import { useBroadcastEvent, useEventListener } from '@liveblocks/react';
import { v4 as uuidv4 } from 'uuid';
type Props = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};
// test for fixing github config - work and personal accounts
const Live = ({ canvasRef }: Props) => {
  const broadcast = useBroadcastEvent();
  useInterval(() => {
    setReactions((reaction) =>
      reaction.filter((r) => r.timestamp > Date.now() - 3000)
    );
  }, 1000);
  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReactions((preReaction) =>
      preReaction.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });
  // move this
  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReactions((preReaction) =>
        preReaction.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );
    }
    broadcast({
      x: cursor?.x,
      y: cursor?.y,
      value: cursorState?.reaction,
    });
  }, 200);
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
      id="canvas"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="border-2 border-green-500 h-screen w-full flex justify-center items-center"
    >
      <canvas ref={canvasRef} />
      {reactions.map((r) => (
        <FlyingReaction
          key={uuidv4()}
          x={r.point.x}
          y={r.point.y}
          timestamp={r.timestamp}
          value={r.value}
        />
      ))}
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
