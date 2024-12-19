import { getChatResponse } from '../openai';
import { addVoiceEntry, addExpense, addIncome, addServiceProvider, addAttendanceLog, addReminder } from '../supabase';
import { emitEntryAdded } from '../events';
import { chatStorageService } from './chatStorageService';

interface ProcessedMessage {
  category?: string;
  amount?: number;
  description: string;
  isReminder?: boolean;
  dueDate?: Date;
}

interface DbOperation {
  table: string;
  data: any;
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
      for (const operation of dbOperations as DbOperation[]) {
        const { table, data } = operation;
        try {
          switch (table) {
            case 'expenses':
              await addExpense({
                amount: data.amount,
                category: data.category,
                description: data.description,
                date: data.date
              });
              break;

            case 'income_entries':
              await addIncome({
                amount: data.amount,
                source: data.source,
                description: data.description,
                date: data.date
              });
              break;

            case 'maid_daily_log':
              // First, check if service provider exists or create one
              const providerResult = await addServiceProvider({
                name: data.maid_name,
                service_type: 'maid',
                salary: data.salary,
                payment_frequency: 'monthly'
              });

              if (providerResult.success && providerResult.data) {
                await addAttendanceLog({
                  provider_id: providerResult.data.id,
                  date: data.date,
                  present: data.present,
                  notes: data.notes
                });
              }
              break;

            case 'reminders':
              await addReminder({
                title: data.title,
                amount: data.amount,
                description: data.description,
                due_date: data.due_date,
                recurring: data.recurring
              });
              break;
          }
        } catch (error) {
          console.error(`Error processing operation for ${table}:`, error);
        }
      }

      // Store the voice entry
      const voiceEntryResult = await addVoiceEntry({
        transcript: text,
        amount: dbOperations[0]?.data?.amount,
        category: dbOperations[0]?.data?.category,
        description: text,
        is_reminder: dbOperations[0]?.table === 'reminders',
        due_date: dbOperations[0]?.data?.due_date
      });

      if (voiceEntryResult.success && voiceEntryResult.data) {
        emitEntryAdded(voiceEntryResult.data);
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