import type { Applicant, CreateApplicantPayload, UpdateApplicantPayload } from '../types/applicant';

const API_URL = import.meta.env.PUBLIC_GAS_API_URL;

export const applicantService = {
  async getAll(): Promise<Applicant[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch applicants');
    return response.json();
  },

  async create(payload: CreateApplicantPayload): Promise<{ success: boolean; id?: string; error?: string }> {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'CREATE', payload }),
    });
    if (!response.ok) throw new Error('Failed to create applicant');
    return response.json();
  },

  async update(payload: UpdateApplicantPayload): Promise<{ success: boolean; error?: string }> {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'UPDATE', payload }),
    });
    if (!response.ok) throw new Error('Failed to update applicant');
    return response.json();
  },

  async delete(id: string): Promise<{ success: boolean; error?: string }> {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'DELETE', payload: { id } }),
    });
    if (!response.ok) throw new Error('Failed to delete applicant');
    return response.json();
  },
};
