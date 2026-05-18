export type ApplicantStatus = 'Applied' | 'Interview' | 'Passed' | 'Rejected';

export interface Applicant {
  id: string;
  name: string;
  phone: string;
  email: string;
  position: string;
  status: ApplicantStatus;
  note: string;
  created_at: string;
}

export interface CreateApplicantPayload {
  name: string;
  phone: string;
  email: string;
  position: string;
  note?: string;
}

export interface UpdateApplicantPayload {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  position?: string;
  status?: ApplicantStatus;
  note?: string;
}
