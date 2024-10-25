import React from 'react';

type Props = {
  setReaction: (reaction: string) => void;
};

export default function ReactionSelector({ setReaction }: Props) {
  return (
    <div
      className="absolute bottom-20 left-0 ring-0 mx-auto w-fit transform rounded-full bg-white px-2"
      onPointerMove={(e) => e.stopPropagation()}
    >
      <ReactionBtn reaction="👍" onSelect={setReaction} />
      <ReactionBtn reaction="🔥" onSelect={setReaction} />
      <ReactionBtn reaction="😍" onSelect={setReaction} />
      <ReactionBtn reaction="👀" onSelect={setReaction} />
      <ReactionBtn reaction="😱" onSelect={setReaction} />
      <ReactionBtn reaction="🙁" onSelect={setReaction} />
    </div>
  );
}

function ReactionBtn({
  reaction,
  onSelect,
}: {
  reaction: string;
  onSelect: (reaction: string) => void;
}) {
  return (
    <button
      className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => onSelect(reaction)}
    >
      {reaction}
    </button>
  );
}
