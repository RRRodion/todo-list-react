import React, { useState } from 'react';
import "./input.css";

interface InputProps {
    onAddTask: (title: string) => void;
}

const Input: React.FC<InputProps> = ({ onAddTask }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (value === '') {
            alert('You can\'t add an empty task!');
            return;
        }
        console.log('Добавление задачи:', value);
        onAddTask(value);
        setValue('');
    };

    return (
        <div className="wrap">
            <label>
                <input
                    className="input"
                    type="text"
                    id="input"
                    placeholder="Enter new task"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
            <button id="btn" onClick={handleSubmit}>Add</button>
        </div>
    );
};

export default Input;
