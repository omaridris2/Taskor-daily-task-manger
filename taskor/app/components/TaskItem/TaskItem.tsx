import React from 'react'
import {useDraggable} from '@dnd-kit/react';
import styles from "./TaskItem.module.css";


export function TaskItem({ task }: any) {
  const { ref } = useDraggable({
    id: task.id,
  });

  return (
    <li className={styles.listitem} ref={ref}>
      {task.name}
    </li>
  );
}
