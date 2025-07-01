export interface Todo {
  id?: number;
  description: string;
  targetDate: string | Date;
  completed: boolean;
  userId?: number;
}