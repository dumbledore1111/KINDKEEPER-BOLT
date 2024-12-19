import { openDB } from 'idb';

export interface ChatMessage {
  id: string;
  userId: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachment?: string;
  category?: string;
  amount?: number;
}

const DB_NAME = 'kindkeeper-chat';
const STORE_NAME = 'messages';

class ChatStorageService {
  private async getDB() {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('userId', 'userId');
          store.createIndex('timestamp', 'timestamp');
        }
      },
    });
  }

  async saveMessage(message: ChatMessage): Promise<void> {
    const db = await this.getDB();
    await db.add(STORE_NAME, message);
  }

  async getMessages(userId: string): Promise<ChatMessage[]> {
    const db = await this.getDB();
    const messages = await db.getAllFromIndex(STORE_NAME, 'userId', userId);
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async clearMessages(userId: string): Promise<void> {
    const db = await this.getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const messages = await store.index('userId').getAllKeys(userId);
    await Promise.all(messages.map(key => store.delete(key)));
  }
}

export const chatStorageService = new ChatStorageService();