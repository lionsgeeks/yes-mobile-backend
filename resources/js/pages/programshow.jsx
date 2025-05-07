import React from 'react';

const ProgramShow = ({ programe }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Program Show</h1>
            <p><strong>Name:</strong> {programe.name}</p>
            <p><strong>Description:</strong> {programe.description}</p>
            <p><strong>Start Date:</strong> {programe.start_date}</p>
            <p><strong>End Date:</strong> {programe.end_date}</p>
            <p><strong>Capacity:</strong> {programe.capacity}</p>
            <p><strong>Location:</strong> {programe.location}</p>
            <p><strong>Date:</strong> {programe.date}</p>
        </div>
    );
};

export default ProgramShow;
