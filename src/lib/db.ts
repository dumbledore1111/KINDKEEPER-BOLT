// src/lib/db.ts
import { supabase } from './supabase'

export async function addVoiceEntry(userId: string, entry: {
  transcript: string;
  amount?: number;
  category?: string;
  description: string;
  is_reminder?: boolean;
  due_date?: string;
}) {
  const { data, error } = await supabase
    .from('voice_entries')
    .insert([
      {
        user_id: userId,
        transcript: entry.transcript,
        amount: entry.amount,
        category: entry.category,
        description: entry.description,
        is_reminder: entry.is_reminder,
        due_date: entry.due_date,
        date: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function addExpense(userId: string, expense: {
  amount: number;
  category: string;
  description: string;
  date?: string;
}) {
  const { data, error } = await supabase
    .from('expenses')
    .insert([
      {
        user_id: userId,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
        date: expense.date || new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function addMaidAttendance(userId: string, attendance: {
  provider_id: string;
  date?: string;
  present: boolean;
  notes?: string;
}) {
  const { data, error } = await supabase
    .from('attendance_logs')
    .insert([
      {
        user_id: userId,
        provider_id: attendance.provider_id,
        date: attendance.date || new Date().toISOString(),
        present: attendance.present,
        notes: attendance.notes
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function addReminder(userId: string, reminder: {
  title: string;
  amount?: number;
  description?: string;
  due_date: string;
  recurring?: boolean;
}) {
  const { data, error } = await supabase
    .from('reminders')
    .insert([
      {
        user_id: userId,
        title: reminder.title,
        amount: reminder.amount,
        description: reminder.description,
        due_date: reminder.due_date,
        recurring: reminder.recurring || false,
        status: 'PENDING'
      }
    ])
    .select()
    .single()

  if (error) throw error
  return data
}