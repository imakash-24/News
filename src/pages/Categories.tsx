import React from 'react';

function Categories() {
  const categories = ['Technology', 'Science', 'Business', 'Politics', 'Entertainment', 'Sports'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{category}</h2>
            <p className="text-gray-600">View all articles in {category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;