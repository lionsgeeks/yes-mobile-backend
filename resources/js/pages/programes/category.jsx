import AppLayout from '@/layouts/app-layout';
import CreateCategorie from './components/createCategorie';
import { Trash2, Eye, Pen } from 'lucide-react'; // 👈 import icons
import DeleteCategory from './components/deleteCategorie';
import UpdateCategorie from './components/UpdateCategorie';
import { Head, router } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

const CategoriesCard = ({ categories }) => (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Categories" />
        <div className="p-2 lg:p-6">
            {/* Create Button */}
            <div className="flex justify-end mb-4">
                <CreateCategorie />
            </div>

            {/* Category Cards */}
            <div className="flex flex-wrap gap-4" >
                {categories && categories.length > 0 ? (
                    categories.map((category, idx) => (
                        <div
                            key={idx}
                            className="relative bg-gray-50 min-w-[250px] max-w-sm w-full p-4 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            {/* Action Icons */}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    title="View / Edit"
                                >
                                    <UpdateCategorie
                                        category={category}
                                    />

                                </button>
                                <button
                                    title="Delete"
                                >
                                    <DeleteCategory id={category.id} />
                                </button>
                            </div>
                            <div onClick={() => router.visit('/programe')}>

                            {/* Category Info */}
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Description:</span> {category.description}</p>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Location:</span> {category.location}</p>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Start Date:</span> {category.start_date}</p>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">End Date:</span> {category.end_date}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold">Date:</span> {category.date}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No categories found.</p>
                )}
            </div>
        </div>
    </AppLayout>
);

export default CategoriesCard;
