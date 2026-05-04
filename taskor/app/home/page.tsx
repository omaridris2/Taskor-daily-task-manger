"use client";
import { useState } from "react";
import styles from "./Home.module.css";
import {useDraggable} from '@dnd-kit/react';
import { TaskItem } from "../components/TaskItem/TaskItem";
import { Droppable } from "../components/dropable/DropAble";
import { DragDropProvider } from "@dnd-kit/react";
export default function HomePage() {
 /* const [tasks, setTasks] = useState<any[]>([]);*/
   const [isDropped, setIsDropped] = useState(false);
  
  const {ref} = useDraggable({
    id: 'draggable',
  });
/*
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");

      if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
        return;
      }

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
*/
  const MOCK_TASKS = [
  { id: "1", name: "Buy groceries" },
  { id: "2", name: "Finish project" },
  { id: "3", name: "Read a book" },
  { id: "4", name: "Workout" },
];
const [tasks, setTasks] = useState<any[]>(MOCK_TASKS);

  return (
    <div className={styles.container}>
      <button className={styles.button} /*onClick={fetchTasks}*/ >
        Fetch Tasks
      </button>
      
       <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const { target } = event.operation;
          setIsDropped(target?.id === "droppable");
        }}
      >
        <ul className={styles.list}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>

        <Droppable id="droppable">
          {isDropped && tasks.length > 0 && (
            <TaskItem task={tasks[tasks.length - 1]} />
          )}
        </Droppable>
      </DragDropProvider>
      
    </div>
  );
}