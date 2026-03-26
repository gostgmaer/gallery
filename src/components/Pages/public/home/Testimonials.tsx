import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      content: "I've never had an easier time creating a professional resume. This tool is amazing!",
      author: "John Doe",
    },
    {
      id: 2,
      content: "Resume Builder helped me stand out in the job market. Highly recommended!",
      author: "Jane Smith",
    },
    {
      id: 3,
      content: "Simplifies the resume-building process. Great templates and user-friendly.",
      author: "Michael Johnson",
    },
  ];

  return (
    <section className="bg-gray-300 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-blue-900 mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6 bg-white shadow-md rounded-lg">
              <p className="text-lg text-gray-700">{testimonial.content}</p>
              <p className="text-gray-600 mt-4">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
