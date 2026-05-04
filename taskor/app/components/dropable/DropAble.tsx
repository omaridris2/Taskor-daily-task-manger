import React from "react";
import { useDroppable } from "@dnd-kit/react";

type DroppableProps = {
  id: string | number;
  children?: React.ReactNode;
};

export function Droppable({ id, children }: DroppableProps) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div ref={ref} style={{ width: 300, height: 300 }}>
      {children}
    </div>
  );
}