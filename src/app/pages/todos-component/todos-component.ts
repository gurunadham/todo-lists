import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosServce } from './todos-servce';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos-component',
  imports: [CommonModule],
  templateUrl: './todos-component.html',
  styleUrl: './todos-component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
    todos : any[] = [];

    readonly limit = 20;

    skip = 0;

    isLoading = false;

    constructor(private todosService: TodosServce) {}


    ngOnInit() {
        this.loadTodos();
    }

    loadTodos() : void {

        if(this.isLoading || this.todos.length >= 100) {
            return;
        }
        
        this.isLoading = true;

        this.todosService.getTodos(this.limit, this.skip).subscribe({
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
