"use client";
import { useState } from "react";
import styles from "./Home.module.css";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { TaskItem } from "../components/TaskItem/TaskItem";

const MOCK_TASKS = [
  { id: "1", name: "Buy groceries", level: 1 },
  { id: "2", name: "Finish project", level: 2 },
  { id: "3", name: "Read a book", level: 3 },
  { id: "4", name: "Workout", level: 4 },
];

export default function HomePage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === active.id);
      const newIndex = prev.findIndex((t) => t.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  function handleSort(ascending: boolean) {
    // Apply sort directly into state so drag works from the new order
    setTasks((prev) =>
      [...prev].sort((a, b) => ascending ? a.level - b.level : b.level - a.level)
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => handleSort(true)}>
        Sort Ascending
      </button>
      <button className={styles.button} onClick={() => handleSort(false)}>
        Sort Descending
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={styles.list}>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}