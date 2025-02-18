
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import JobDescription from '@/components/JobDescription';
import CandidateCard from '@/components/CandidateCard';
import { useToast } from '@/components/ui/use-toast';
import { pipeline } from '@huggingface/transformers';

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<any[]>([]);

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    toast({
      title: "Files uploaded successfully",
      description: `${selectedFiles.length} resume(s) ready for analysis`,
    });
  };

  const handleJobDescription = async (description: string) => {
    setIsAnalyzing(true);
    try {
      // Simulated analysis for demonstration
      // In a real implementation, this would use the ML model to analyze resumes
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockCandidates = [
        {
          name: "Alex Johnson",
          matchScore: 92,
          experience: "5 years in Software Development",
          education: "MS in Computer Science",
          skills: ["React", "Node.js", "Python", "Machine Learning"]
        },
        {
          name: "Sarah Smith",
          matchScore: 85,
          experience: "3 years in Web Development",
          education: "BS in Information Technology",
          skills: ["JavaScript", "HTML/CSS", "React", "AWS"]
        },
        // Add more mock candidates as needed
      ];
      
      setCandidates(mockCandidates);
      toast({
        title: "Analysis Complete",
        description: "Candidates have been ranked based on job requirements",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze resumes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold mb-4">AI Resume Screener</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload resumes and job descriptions to automatically match the best candidates using AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6 animate-slideUp">
            <FileUpload onFileSelect={handleFileSelect} />
            <div className="text-sm text-gray-500 text-center">
              {files.length > 0 && `${files.length} file(s) selected`}
            </div>
          </div>
          
          <div className="animate-slideUp">
            <JobDescription onSubmit={handleJobDescription} />
          </div>
        </div>

        {isAnalyzing && (
          <div className="text-center py-12 animate-pulse">
            <p className="text-lg text-gray-600">Analyzing resumes...</p>
          </div>
        )}

        {candidates.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">Top Candidates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidates.map((candidate, index) => (
                <CandidateCard key={index} candidate={candidate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
