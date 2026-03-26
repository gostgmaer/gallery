import React from 'react';

function Features() {
  const features = [
    {
      id: 1,
      title: 'Custom Templates',
      description: 'Choose from a variety of professionally designed templates to make your resume stand out.',
    },
    {
      id: 2,
      title: 'Easy Editing',
      description: 'Edit and update your resume effortlessly with our user-friendly interface.',
    },
    {
      id: 3,
      title: 'Online Storage',
      description: 'Securely store and access your resume online from anywhere at any time.',
    },
    {
      id: 4,
      title: 'Export to PDF',
      description: 'Export your resume to PDF format for easy sharing and printing.',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-blue-950">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
