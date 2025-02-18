
import { supabase } from "@/integrations/supabase/client";

export interface ParsedResume {
  skills: string[];
  experience: string;
  education: string;
}

export async function uploadResume(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Failed to upload resume: ${uploadError.message}`);
  }

  const { data: resumeData, error: insertError } = await supabase
    .from('resumes')
    .insert({
      original_filename: file.name,
      file_path: filePath,
      content_type: file.type,
    })
    .select()
    .single();

  if (insertError) {
    throw new Error(`Failed to save resume metadata: ${insertError.message}`);
  }

  return resumeData.id;
}

export async function createJobDescription(title: string, description: string, requirements: string[]) {
  const { data, error } = await supabase
    .from('job_descriptions')
    .insert({
      title,
      description,
      requirements,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create job description: ${error.message}`);
  }

  return data;
}
