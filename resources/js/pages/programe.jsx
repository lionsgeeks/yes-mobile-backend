import React from 'react';
import { useForm } from '@inertiajs/react';

const Programe = ({programes}) => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        capacity: '',
        location: '',
        date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('programe.store'));
    };



    const handlupdate = (program) => {
        console.log(program.id);


        post(route('programe.update', program.id ));
    }

    return (
        <>

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Program</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>
                    <div>
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date:</label>
                        <input
                            type="time"
                            id="start_date"
                            name="start_date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                    </div>
                    <div>
                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date:</label>
                        <input
                            type="time"
                            id="end_date"
                            name="end_date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                    </div>
                    <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity:</label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            value={data.capacity}
                            onChange={(e) => setData('capacity', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.capacity && <div className="text-red-500 text-sm">{errors.capacity}</div>}
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.location && <div className="text-red-500 text-sm">{errors.location}</div>}
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.date && <div className="text-red-500 text-sm">{errors.date}</div>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {processing ? 'Processing...' : 'Create Program'}
                    </button>
                </form>

            </div>
        </div>


        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {programes && programes.map((program, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-bold text-gray-800">{program.name}</h3>
                        <p className="text-sm text-gray-600">{program.description}</p>
                        <p className="text-sm text-gray-600 mt-2">
                            <strong>Start Date:</strong> {program.start_date}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>End Date:</strong> {program.end_date}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Capacity:</strong> {program.capacity}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Location:</strong> {program.location}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Date:</strong> {program.date}
                        </p>
                        {/* <button onClick={handlupdate(program)}>click me</button> */}

                    </div>
                ))}
            </div>
        </div>

        </>

    );
};

export default Programe;
