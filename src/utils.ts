export interface Item {
    id: number;
    title: string;
    completed: boolean;
}
export const loadTasksFromLocalStorage = (): Item[] => {
    try {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
        return [];
    }
};

export const saveTasksToLocalStorage = (tasks: Item[]) => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
    }
};