import CursorSVG from '@/public/assets/CursorSVG';

type CursorProps = {
  color: string;
  x: number;
  y: number;
  message: string;
  id: number;
};

const Cursor = ({ color, message, x, y, id }: CursorProps) => {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <CursorSVG color={color} />
      <span className="text-white">{id}</span>
      {/* Message here */}
      {message && (
        <div
          className="absolute right-2 top-5 rounded-3xl px-4 py-2"
          style={{ backgroundColor: color }}
        >
          <p className="text-white whitespace-nowrap leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cursor;
