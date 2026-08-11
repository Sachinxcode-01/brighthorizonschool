import { publicApi } from '../../../services/api';
import { AdmissionEnquiryFormData } from '../schemas/admission.schema';

export const admissionsService = {
  submitEnquiry: async (data: AdmissionEnquiryFormData) => {
    return await publicApi.submitEnquiry(data);
  }
};
