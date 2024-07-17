// ParentComponent.jsx
import React, { useState } from 'react';
import ChildComponent from "./Child";

const ParentComponent = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <ChildComponent data={inputValue} />
        </div>
    );
};

export default ParentComponent;

