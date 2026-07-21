import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink  } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  /* imports: [
    RouterOutlet,
    TodosListComponent, 
    UserTable, 
    EmployeeTableComponent, 
    ProductCatalogComponent, 
    TaskBoardComponent,
    PostListComponent,
    EmployeeRegFormComponent
   ]  */

  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
