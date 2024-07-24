import React, {useState, useEffect} from 'react';
import "./section.css";
import Input from "../input/Input";
import TaskItem, {Item} from "./TaskItem";

const Section: React.FC = () => {
    const [tasks, setTasks] = useState<Item[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const loadTasksFromLocalStorage = (): Item[] => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch (error) {
            return [];
        }
    };

    const saveTasksToLocalStorage = (tasks: Item[]) => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
        }
    };

    useEffect(() => {
        const storedTasks = loadTasksFromLocalStorage();
        setTasks(storedTasks);
        setIsInitialLoad(false);
    }, []);

    useEffect(() => {
        if (!isInitialLoad) {
            saveTasksToLocalStorage(tasks);
        }
    }, [tasks, isInitialLoad]);

    const handleTaskDelete = (id: Item['id']) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const handleAddTask = (title: string) => {
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        const newTask = {id: newId, title, completed: false};
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
    };

    const handleTaskComplete = (id: Item['id']) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? {...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
    };

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <section className="container">
            <Input onAddTask={handleAddTask}/>
            <div className="wrap">
                {incompleteTasks.length === 0 && (
                    <div className="text">No Tasks</div>
                )}
                <ul id="result">
                    {incompleteTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={handleTaskDelete}
                            onComplete={handleTaskComplete}
                        />
                    ))}
                </ul>
            </div>
            <hr/>
            {completedTasks.length === 0 && (
                <div className="text2">No Completed Tasks</div>
            )}
            <ul id="completed">
                {completedTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={handleTaskDelete}
                        onComplete={handleTaskComplete}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Section;
