import React, {useState, useEffect} from 'react';
import "./section.css";
import Input from "../input/Input";
import TaskItem, {Item} from "./TaskItem";

const Section: React.FC = () => {
    const [tasks, setTasks] = useState<Item[]>([]);

    // Функция для загрузки задач из localStorage
    const loadTasksFromLocalStorage = (): Item[] => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            console.log('Загруженные задачи из localStorage:', savedTasks);
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch (error) {
            console.error('Ошибка при загрузке задач из localStorage:', error);
            return [];
        }
    };

    // Функция для сохранения задач в localStorage
    const saveTasksToLocalStorage = (tasks: Item[]) => {
        try {
            console.log('Сохранение задач в localStorage:', tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Ошибка при сохранении задач в localStorage:', error);
        }
    };

    // Загрузка задач при первой загрузке компонента
    useEffect(() => {
        const storedTasks = loadTasksFromLocalStorage();
        setTasks(storedTasks);
    }, []);

    // Сохранение задач при каждом изменении состояния tasks
    useEffect(() => {
        if (tasks.length > 0) {
            saveTasksToLocalStorage(tasks);
        }
    }, [tasks]);

    const handleTaskDelete = (id: Item['id']) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
    };

    const handleAddTask = (title: string) => {
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        const newTask = {id: newId, title, completed: false};
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        console.log('Добавленная задача:', newTask);
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
                {incompleteTasks.length <= 0 && (
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
            {completedTasks.length <= 0 && (
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
