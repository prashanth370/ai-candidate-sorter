
import { User, Briefcase, GraduationCap, Award } from 'lucide-react';

interface CandidateCardProps {
  candidate: {
    name: string;
    matchScore: number;
    experience: string;
    education: string;
    skills: string[];
  };
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 transition-all duration-200 hover:shadow-md animate-fadeIn">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{candidate.name}</h3>
            <p className="text-sm text-gray-500">Match Score: {candidate.matchScore}%</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="font-medium">Experience</p>
            <p className="text-sm text-gray-600">{candidate.experience}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <GraduationCap className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="font-medium">Education</p>
            <p className="text-sm text-gray-600">{candidate.education}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="font-medium">Key Skills</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
