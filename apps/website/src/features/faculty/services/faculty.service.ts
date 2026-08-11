import { publicApi } from '../../../services/api';

export const facultyService = {
  getFaculty: async () => {
    return await publicApi.getFaculty();
  }
};
