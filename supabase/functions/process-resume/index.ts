
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.3.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ResumeData {
  candidate_name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string;
  experience_years?: number;
  education?: string;
  certifications?: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { resume_text, resume_id } = await req.json()

    // Initialize OpenAI
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })
    const openai = new OpenAIApi(configuration)

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse resume using OpenAI
    const prompt = `Please analyze this resume and extract the following information in JSON format:
    - candidate_name: Full name of the candidate
    - email: Email address
    - phone: Phone number
    - skills: Array of technical skills
    - experience: Summary of work experience
    - experience_years: Total years of experience (number)
    - education: Educational background
    - certifications: Array of certifications

    Resume text:
    ${resume_text}`

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a helpful assistant that extracts information from resumes." },
        { "role": "user", "content": prompt }
      ],
    })

    const parsedData: ResumeData = JSON.parse(completion.data.choices[0].message?.content ?? '{}')

    // Generate embedding for the resume
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: resume_text,
    })

    const embedding = embeddingResponse.data.data[0].embedding

    // Update resume record with parsed data and embedding
    const { error: updateError } = await supabaseClient
      .from('resumes')
      .update({
        candidate_name: parsedData.candidate_name,
        email: parsedData.email,
        phone: parsedData.phone,
        skills: parsedData.skills,
        experience: parsedData.experience,
        experience_years: parsedData.experience_years,
        education: parsedData.education,
        certifications: parsedData.certifications,
        embedding: embedding,
        hash_signature: crypto.subtle.digest('SHA-256', new TextEncoder().encode(resume_text)).toString(),
      })
      .eq('id', resume_id)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ message: 'Resume processed successfully', data: parsedData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing resume:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
