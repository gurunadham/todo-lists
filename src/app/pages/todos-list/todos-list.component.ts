import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosListService } from '../../services/todos-list.servce';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-list',
  imports: [CommonModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
    todos : any[] = [];

    readonly limit = 20;

    skip = 0;

    isLoading = false;

    constructor(private todosListService: TodosListService) {}


    ngOnInit() {
        this.loadTodos();
    }

    loadTodos() : void {

        if(this.isLoading || this.todos.length >= 100) {
            return;
        }
        
        this.isLoading = true;

        this.todosListService.getTodos(this.limit, this.skip).subscribe({
            next: (response) => {
                this.todos = [...this.todos, ...(response.todos ?? [])];
                this.skip += this.limit;
                this.isLoading = false;
            },
            error: () => {
                this.isLoading = false;
            }
        });
    }

    trackByTodoId(index: number, todo: any): number {
        return todo.id;
    }

    get showLoadMore() : boolean {
        return this.todos.length < 100;
    }
    
}
