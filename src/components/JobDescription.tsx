
import React, { useState } from 'react';
import { File } from 'lucide-react';

interface JobDescriptionProps {
  onSubmit: (description: string) => void;
}

const JobDescription = ({ onSubmit }: JobDescriptionProps) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(description);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <File className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Job Description</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the job description here..."
          className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Analyze Resumes
        </button>
      </form>
    </div>
  );
};

export default JobDescription;
