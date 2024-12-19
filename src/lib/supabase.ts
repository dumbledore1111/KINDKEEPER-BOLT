import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Keep your existing auth functions...

// Expenses
export async function addExpense(expense: {
  amount: number;
  category: string;
  description: string;
  date?: string;
}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        user_id: user.id,
        ...expense,
        date: expense.date || now,
        created_at: now
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding expense:', error);
    return { success: false, error };
  }
}

// Income
export async function addIncome(income: {
  amount: number;
  source: string;
  description: string;
  date?: string;
}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('income_entries')
      .insert([{
        user_id: user.id,
        ...income,
        date: income.date || now,
        created_at: now
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding income:', error);
    return { success: false, error };
  }
}

// Service Providers
export async function addServiceProvider(provider: {
  name: string;
  service_type: string;
  salary?: number;
  payment_frequency?: string;
}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('service_providers')
      .insert([{
        user_id: user.id,
        ...provider,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding service provider:', error);
    return { success: false, error };
  }
}

// Attendance Logs
export async function addAttendanceLog(log: {
  provider_id: string;
  date?: string;
  present: boolean;
  notes?: string;
}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('attendance_logs')
      .insert([{
        user_id: user.id,
        ...log,
        date: log.date || now,
        created_at: now
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding attendance log:', error);
    return { success: false, error };
  }
}

// Reminders
export async function addReminder(reminder: {
  title: string;
  amount?: number;
  description?: string;
  due_date: string;
  recurring?: boolean;
  frequency?: string;
}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('reminders')
      .insert([{
        user_id: user.id,
        ...reminder,
        status: 'PENDING',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding reminder:', error);
    return { success: false, error };
  }
}

// Get functions for each type
export async function getExpenses(options: {
  startDate?: Date;
  endDate?: Date;
  category?: string;
} = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    let query = supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (options.startDate) {
      query = query.gte('date', options.startDate.toISOString());
    }
    if (options.endDate) {
      query = query.lte('date', options.endDate.toISOString());
    }
    if (options.category) {
      query = query.eq('category', options.category);
    }

    const { data, error } = await query;
    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error getting expenses:', error);
    return { success: false, error };
  }
}

export async function getIncome(options: {
  startDate?: Date;
  endDate?: Date;
  source?: string;
} = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    let query = supabase
      .from('income_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    if (options.startDate) {
      query = query.gte('date', options.startDate.toISOString());
    }
    if (options.endDate) {
      query = query.lte('date', options.endDate.toISOString());
    }
    if (options.source) {
      query = query.eq('source', options.source);
    }

    const { data, error } = await query;
    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error getting income entries:', error);
    return { success: false, error };
  }
}

export async function getServiceProviders() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('service_providers')
      .select('*')
      .eq('user_id', user.id)
      .order('name');

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error getting service providers:', error);
    return { success: false, error };
  }
}

export async function getAttendanceLogs(providerId: string, options: {
  startDate?: Date;
  endDate?: Date;
} = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    let query = supabase
      .from('attendance_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('provider_id', providerId)
      .order('date', { ascending: false });

    if (options.startDate) {
      query = query.gte('date', options.startDate.toISOString());
    }
    if (options.endDate) {
      query = query.lte('date', options.endDate.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error getting attendance logs:', error);
    return { success: false, error };
  }
}

export async function getReminders(options: {
  status?: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  startDate?: Date;
  endDate?: Date;
} = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    let query = supabase
      .from('reminders')
      .select('*')
      .eq('user_id', user.id)
      .order('due_date', { ascending: true });

    if (options.status) {
      query = query.eq('status', options.status);
    }
    if (options.startDate) {
      query = query.gte('due_date', options.startDate.toISOString());
    }
    if (options.endDate) {
      query = query.lte('due_date', options.endDate.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error getting reminders:', error);
    return { success: false, error };
  }
}

export async function getMonthlySummary(month: Date) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('monthly_summaries')
      .select('*')
      .eq('user_id', user.id)
      .eq('month', month.toISOString().slice(0, 7))
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error getting monthly summary:', error);
    return { success: false, error };
  }
}

export const addVoiceEntry = async ({ transcript, amount, category, description, is_reminder, due_date }: {
  transcript: string;
  amount?: number;
  category?: string;
  description: string;
  is_reminder?: boolean;
  due_date?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('voice_entries')
      .insert([{
        transcript,
        amount,
        category,
        description,
        is_reminder,
        due_date
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error adding voice entry:', error);
    return { success: false, error };
  }
};

export async function getVoiceEntries(userId: string, options: { startDate: Date; endDate: Date }) {
  try {
    const { data, error } = await supabase
      .from('voice_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', options.startDate.toISOString())
      .lte('created_at', options.endDate.toISOString());

    if (error) throw error;
    return { success: true, entries: data };
  } catch (error) {
    console.error('Error getting voice entries:', error);
    return { success: false, error };
  }
}

export async function addEmergencyContact(userId: string, data: {
  name: string;
  relationship: string;
  phone: string;
}) {
  try {
    const { data: contact, error } = await supabase
      .from('emergency_contacts')
      .insert([{ user_id: userId, ...data }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, contact };
  } catch (error) {
    console.error('Error adding emergency contact:', error);
    return { success: false, error };
  }
}

export async function addLinkedBank(userId: string, data: {
  bankName: string;
  accountType: string;
  accountNumber: string;
}) {
  try {
    const { data: bank, error } = await supabase
      .from('linked_banks')
      .insert([{ user_id: userId, ...data }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, bank };
  } catch (error) {
    console.error('Error adding linked bank:', error);
    return { success: false, error };
  }
}