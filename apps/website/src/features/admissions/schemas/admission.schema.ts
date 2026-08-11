import * as z from 'zod';

export const admissionEnquirySchema = z.object({
  applicantName: z.string().min(2, 'Student name must be at least 2 characters'),
  parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  gradeApplying: z.string().min(1, 'Grade applying for is required'),
  previousSchool: z.string().optional(),
  message: z.string().optional()
});

export type AdmissionEnquiryFormData = z.infer<typeof admissionEnquirySchema>;
