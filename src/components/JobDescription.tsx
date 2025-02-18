
import React, { useState } from 'react';
import { File } from 'lucide-react';
import { createJobDescription } from '@/lib/resume-utils';
import { useToast } from './ui/use-toast';

interface JobDescriptionProps {
  onSubmit: (description: string) => void;
}

const JobDescription = ({ onSubmit }: JobDescriptionProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Extract requirements from description (simple implementation)
      const requirements = description
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.trim());

      await createJobDescription(title, description, requirements);
      onSubmit(description);

      toast({
        title: "Job description saved",
        description: "Your job description has been saved and will be used for matching candidates.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border animate-fadeIn">
      <div className="flex items-center gap-3 mb-4">
        <File className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Job Description</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter job title..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the job description and requirements here..."
          className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          required
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
