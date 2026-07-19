import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskBoardService, Task } from '../../services/task-board.service';

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './task-board-component.html',
  styleUrls: ['./task-board-component.css'],
  standalone: true
})
export class TaskBoardComponent implements OnInit {

  tasks: Task[] = [];

  newTaskTitle = '';
  newTaskPriority: Task['priority'] = 'Medium';
  searchQuery = '';
  filterPriority: 'All' | Task['priority'] = 'All';

  constructor(private taskBoardService: TaskBoardService) {}

  ngOnInit() {
    this.tasks = this.taskBoardService.getTasks();
  }

  addTask() {
    const title = this.newTaskTitle.trim();
    if (!title) {
      return;
    }

    const task: Task = {
        title,
        priority: this.newTaskPriority,
        status: 'TODO',
        id: ''
    };

    this.tasks = this.taskBoardService.addTask(task);
    this.newTaskTitle = '';
    this.newTaskPriority = 'Medium';
  }

  moveTask(task: Task, newStatus: Task['status']) {
    const updatedTask = { ...task, status: newStatus };
    this.tasks = this.taskBoardService.updateTask(updatedTask);
  }

  deleteTask(task: Task) {
    this.tasks = this.taskBoardService.deleteTask(task);
  }

  drop(event: CdkDragDrop<Task[]>, status: Task['status']) {
    const task = event.item.data as Task;
    if (task && task.status !== status) {
      const updatedTask = { ...task, status };
      this.tasks = this.taskBoardService.updateTask(updatedTask);
    }
  }

  get filteredTasks() {
    const q = this.searchQuery.trim().toLowerCase();

    return this.tasks.filter(task => {
      const matchesPriority = this.filterPriority === 'All' || task.priority === this.filterPriority;
      const matchesSearch = !q || task.title.toLowerCase().includes(q);
      return matchesPriority && matchesSearch;
    });
  }
}