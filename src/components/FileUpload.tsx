
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  className?: string;
}

const FileUpload = ({
  onFileSelect,
  acceptedFileTypes = ['.pdf', '.doc', '.docx'],
  maxFiles = 5,
  className,
}: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileSelect(acceptedFiles);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative p-8 border-2 border-dashed rounded-lg transition-all duration-200',
        isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          {isDragActive ? (
            <p className="text-primary font-medium">Drop the files here</p>
          ) : (
            <>
              <p className="text-gray-600 font-medium">
                Drag & drop resume files here, or click to select files
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX (max {maxFiles} files)
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
