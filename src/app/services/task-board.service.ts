import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskBoardService {
  private readonly storageKey = 'taskBoardTasks';
  private readonly defaultTasks: Task[] = [
    { id: 't1', title: 'Design login page', priority: 'High', status: 'TODO' },
    { id: 't2', title: 'Set up CI/CD pipeline', priority: 'Medium', status: 'TODO' },
    { id: 't3', title: 'Integrate Stripe API', priority: 'High', status: 'TODO' },
    { id: 't4', title: 'Implement user profile page', priority: 'Medium', status: 'IN_PROGRESS' },
    { id: 't5', title: 'Write unit tests for auth', priority: 'High', status: 'IN_PROGRESS' },
    { id: 't6', title: 'Fix header logo alignment', priority: 'Low', status: 'DONE' },
    { id: 't7', title: 'Update README with setup instructions', priority: 'Low', status: 'DONE' },
    { id: 't8', title: 'Optimize database queries', priority: 'Medium', status: 'DONE' },
    { id: 't9', title: 'Refactor cart component', priority: 'Medium', status: 'TODO' },
    { id: 't10', title: 'Implement dark mode toggle', priority: 'Low', status: 'IN_PROGRESS' },
    { id: 't11', title: 'Add search functionality to product catalog', priority: 'High', status: 'TODO' },
    { id: 't12', title: 'Fix 404 error on user settings page', priority: 'Medium', status: 'DONE' },
    { id: 't13', title: 'Update dependencies to latest versions', priority: 'Low', status: 'TODO' },
    { id: 't14', title: 'Implement email notifications for order updates', priority: 'High', status: 'IN_PROGRESS' },
    { id: 't15', title: 'Create landing page for marketing campaign', priority: 'Medium', status: 'DONE' },
  ];

  getTasks(): Task[] {
    const saved = localStorage.getItem(this.storageKey);
    console.log('Saved tasks from localStorage:', saved);
    if (!saved) {
      this.saveToLocalStorage(this.defaultTasks);
      return [...this.defaultTasks];
    }

    try {
      return JSON.parse(saved) as Task[];
    } catch {
      return [...this.defaultTasks];
    }
  }

  addTask(task: Omit<Task, 'id'>): Task[] {
    const tasks = this.getTasks();
    const next = [...tasks, { id: this.generateId(), ...task }];
    this.saveToLocalStorage(next);
    return next;
  }

  deleteTask(task: Task): Task[] {
    const tasks = this.getTasks();
    const next = tasks.filter(t => t.id !== task.id);
    this.saveToLocalStorage(next);
    return next;
  }

  updateTask(updatedTask: Task): Task[] {
    const tasks = this.getTasks();
    const next = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveToLocalStorage(next);
    return next;
  }

  saveToLocalStorage(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
