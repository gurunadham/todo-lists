export interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}