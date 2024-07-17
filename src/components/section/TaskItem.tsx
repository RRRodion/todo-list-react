import React from 'react';
import "./taskItem.css";

export interface Item {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Item;
    onDelete: (id: Item['id']) => void;
    onComplete: (id: Item['id']) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onComplete }) => {
    return (
        <li className="lii">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onComplete(task.id)}
            />
            {task.title}
            <button className="btnDel" onClick={() => onDelete(task.id)}>Delete</button>
        </li>
    );
};

export default TaskItem;
