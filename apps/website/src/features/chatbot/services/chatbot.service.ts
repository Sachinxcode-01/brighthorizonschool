import { publicApi } from '../../../services/api';

export const chatbotService = {
  askAi: async (query: string) => {
    return await publicApi.askAiAssistant(query);
  }
};
