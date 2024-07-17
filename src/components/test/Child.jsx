import React from 'react';

const ChildComponent = ({ data }) => {
    return (
        <div>
            <p>Data from parent: {data}</p>
        </div>
    );
};

export default ChildComponent;
