import { publicApi } from '../../../services/api';
import { ContactFormData } from '../schemas/contact.schema';

export const contactService = {
  submitContact: async (data: ContactFormData) => {
    return await publicApi.submitContact(data);
  }
};
