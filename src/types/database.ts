export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | "freelancer"
  | "employer"
  | "agency"
  | "service_provider"
  | "affiliate_marketer"
  | "investor";

export type OnboardingStep =
  | "upload-resume"
  | "setup-profile"
  | "choose-skill"
  | "connect-wallet"
  | "complete-profile"
  | "completed";

export type ExtractionStatus =
  | "pending"
  | "processing"
  | "completed"
  | "partial"
  | "failed";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          role: UserRole;
          first_name: string | null;
          last_name: string | null;
          country_of_residence: string | null;
          country_of_citizenship: string | null;
          phone: string | null;
          english_proficiency: string | null;
          notice_period: string | null;
          job_commitment: string | null;
          preferred_hourly_rate: number | null;
          timezone: string | null;
          onboarding_step: OnboardingStep;
          onboarding_completed: boolean;
          profile_completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          role?: UserRole;
          first_name?: string | null;
          last_name?: string | null;
          country_of_residence?: string | null;
          country_of_citizenship?: string | null;
          phone?: string | null;
          english_proficiency?: string | null;
          notice_period?: string | null;
          job_commitment?: string | null;
          preferred_hourly_rate?: number | null;
          timezone?: string | null;
          onboarding_step?: OnboardingStep;
          onboarding_completed?: boolean;
          profile_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          role?: UserRole;
          first_name?: string | null;
          last_name?: string | null;
          country_of_residence?: string | null;
          country_of_citizenship?: string | null;
          phone?: string | null;
          english_proficiency?: string | null;
          notice_period?: string | null;
          job_commitment?: string | null;
          preferred_hourly_rate?: number | null;
          timezone?: string | null;
          onboarding_step?: OnboardingStep;
          onboarding_completed?: boolean;
          profile_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          file_name: string;
          file_path: string;
          mime_type: string;
          file_size: number;
          extraction_status: ExtractionStatus;
          extracted_text: string | null;
          extracted_data: Json;
          extraction_error: string | null;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_name: string;
          file_path: string;
          mime_type: string;
          file_size: number;
          extraction_status?: ExtractionStatus;
          extracted_text?: string | null;
          extracted_data?: Json;
          extraction_error?: string | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_name?: string;
          file_path?: string;
          mime_type?: string;
          file_size?: number;
          extraction_status?: ExtractionStatus;
          extracted_text?: string | null;
          extracted_data?: Json;
          extraction_error?: string | null;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      educations: {
        Row: {
          id: string;
          user_id: string;
          degree: string | null;
          university: string | null;
          start_month: string | null;
          start_year: number | null;
          end_month: string | null;
          end_year: number | null;
          is_current: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          degree?: string | null;
          university?: string | null;
          start_month?: string | null;
          start_year?: number | null;
          end_month?: string | null;
          end_year?: number | null;
          is_current?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          degree?: string | null;
          university?: string | null;
          start_month?: string | null;
          start_year?: number | null;
          end_month?: string | null;
          end_year?: number | null;
          is_current?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      work_experiences: {
        Row: {
          id: string;
          user_id: string;
          position: string | null;
          workplace: string | null;
          start_month: string | null;
          start_year: number | null;
          end_month: string | null;
          end_year: number | null;
          is_current: boolean;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          position?: string | null;
          workplace?: string | null;
          start_month?: string | null;
          start_year?: number | null;
          end_month?: string | null;
          end_year?: number | null;
          is_current?: boolean;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          position?: string | null;
          workplace?: string | null;
          start_month?: string | null;
          start_year?: number | null;
          end_month?: string | null;
          end_year?: number | null;
          is_current?: boolean;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          user_id: string;
          certificate_name: string | null;
          certificate_link: string | null;
          certificate_file_path: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          certificate_name?: string | null;
          certificate_link?: string | null;
          certificate_file_path?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          certificate_name?: string | null;
          certificate_link?: string | null;
          certificate_file_path?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          portfolio_link: string | null;
          portfolio_file_path: string | null;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          portfolio_link?: string | null;
          portfolio_file_path?: string | null;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string | null;
          portfolio_link?: string | null;
          portfolio_file_path?: string | null;
          description?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      freelancer_skill_selections: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          subcategory: string;
          skills: string[];
          suggested_skills: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category: string;
          subcategory: string;
          skills?: string[];
          suggested_skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category?: string;
          subcategory?: string;
          skills?: string[];
          suggested_skills?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      wallet_connections: {
        Row: {
          id: string;
          user_id: string;
          provider: string;
          wallet_address: string;
          network: string | null;
          is_primary: boolean;
          connected_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider: string;
          wallet_address: string;
          network?: string | null;
          is_primary?: boolean;
          connected_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider?: string;
          wallet_address?: string;
          network?: string | null;
          is_primary?: boolean;
          connected_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
