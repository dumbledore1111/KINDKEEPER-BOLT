import { getChatResponse } from '../openai';

export async function processChatMessage(message: string) {
  try {
    // Get AI response
    const response = await getChatResponse(message);
    return response;
  } catch (error) {
    console.error('Error processing chat message:', error);
    throw error;
  }
}