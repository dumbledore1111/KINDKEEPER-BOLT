import { getChatResponse } from '../openai';
import { addVoiceEntry, addExpense, addIncome, addMaidAttendance, addReminder } from '../db';
import { emitEntryAdded } from '../events';
import { chatStorageService } from './chatStorageService';

interface ProcessedMessage {
  category?: string;
  amount?: number;
  description: string;
  isReminder?: boolean;
  dueDate?: Date;
}

class MessageProcessingService {
  async processMessage(userId: string, text: string): Promise<{
    aiResponse: string;
    processedData: ProcessedMessage;
  }> {
    try {
      // Get structured response from OpenAI
      const response = await getChatResponse(text);
      const { userResponse, dbOperations } = response;

      // Process each database operation
      for (const operation of dbOperations) {
        try {
          const { table, data } = operation;

          switch (table) {
            case 'expenses':
              await addExpense(userId, {
                amount: data.amount,
                category: data.category,
                description: data.description,
                date: new Date(data.date)
              });
              break;

            case 'income_entries':
              await addIncome(userId, {
                amount: data.amount,
                source: data.source,
                description: data.description,
                date: new Date(data.date)
              });
              break;

            case 'maid_daily_log':
              await addMaidAttendance(userId, {
                maidName: data.maid_name,
                date: new Date(data.date),
                present: data.present,
                notes: data.notes
              });
              break;

            case 'reminders':
              await addReminder(userId, {
                title: data.title,
                amount: data.amount,
                dueDate: new Date(data.due_date),
                recurring: data.recurring
              });
              break;
          }
        } catch (error) {
          console.error(`Error processing operation for ${table}:`, error);
        }
      }

      // Store the voice entry
      const entry = await addVoiceEntry(userId, {
        transcript: text,
        amount: dbOperations[0]?.data?.amount,
        category: dbOperations[0]?.data?.category,
        description: text,
        isReminder: dbOperations[0]?.table === 'reminders',
        dueDate: dbOperations[0]?.data?.due_date
      });

      if (entry) {
        emitEntryAdded(entry);
      }

      // Store chat messages
      await chatStorageService.saveMessage({
        id: crypto.randomUUID(),
        userId,
        type: 'user',
        content: text,
        timestamp: new Date(),
        category: dbOperations[0]?.data?.category,
        amount: dbOperations[0]?.data?.amount
      });

      await chatStorageService.saveMessage({
        id: crypto.randomUUID(),
        userId,
        type: 'assistant',
        content: userResponse,
        timestamp: new Date()
      });

      // Return the processed data
      const processedData: ProcessedMessage = {
        category: dbOperations[0]?.data?.category,
        amount: dbOperations[0]?.data?.amount,
        description: text,
        isReminder: dbOperations[0]?.table === 'reminders',
        dueDate: dbOperations[0]?.data?.due_date ? new Date(dbOperations[0].data.due_date) : undefined
      };

      return {
        aiResponse: userResponse,
        processedData
      };
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }
}

export const messageProcessingService = new MessageProcessingService();