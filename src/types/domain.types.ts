import type { LifeAreaId } from "@/constants/life-areas";

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  timezone: string;
  theme: "light" | "dark";
  active_modules: string[];
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  life_area: LifeAreaId | null;
  target_date: string | null;
  status: "active" | "completed" | "abandoned";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Task {
  id: string;
  user_id: string;
  goal_id: string | null;
  title: string;
  due_date: string | null;
  priority: "low" | "medium" | "high";
  status: "todo" | "done";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Habit {
  id: string;
  user_id: string;
  title: string;
  life_area: LifeAreaId | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface HabitCompletion {
  id: string;
  habit_id: string;
  user_id: string;
  completed_date: string;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  life_area: LifeAreaId | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface WeightLog {
  id: string;
  user_id: string;
  weight: number;
  logged_date: string;
  created_at: string;
}

export interface MoodLog {
  id: string;
  user_id: string;
  mood: 1 | 2 | 3 | 4 | 5;
  note: string | null;
  logged_date: string;
  created_at: string;
}

export interface SleepLog {
  id: string;
  user_id: string;
  hours: number;
  quality: 1 | 2 | 3 | 4 | 5;
  logged_date: string;
  created_at: string;
}

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string | null;
  total_pages: number | null;
  status: "want-to-read" | "reading" | "finished" | "abandoned";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ReadingSession {
  id: string;
  user_id: string;
  book_id: string;
  pages_read: number;
  session_date: string;
  note: string | null;
  created_at: string;
}

export interface ExpenseCategory {
  id: string;
  user_id: string;
  name: string;
  emoji: string;
  color: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string | null;
  amount: number;
  type: "income" | "expense";
  description: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
