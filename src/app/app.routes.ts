import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'todos', pathMatch: 'full' },
	{
		path: 'todos',
		loadComponent: () => import('./pages/todos-list/todos-list.component').then(m => m.TodosListComponent)
	},
	{
		path: 'users',
		loadComponent: () => import('./pages/user-table/user-table.component').then(m => m.UserTableComponent)
	},
	{
		path: 'employees',
		loadComponent: () => import('./pages/employee-table/employee-table.component').then(m => m.EmployeeTableComponent)
	},
	{
		path: 'products',
		loadComponent: () => import('./pages/product-catalog/product-catalog.component').then(m => m.ProductCatalogComponent)
	},
	{
		path: 'tasks',
		loadComponent: () => import('./pages/task-board/task-board-component').then(m => m.TaskBoardComponent)
	},
	{
		path: 'posts',
		loadComponent: () => import('./pages/post-list/post-list.component').then(m => m.PostListComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./pages/employee-reg-form/employee-reg-form.component').then(m => m.EmployeeRegFormComponent)
	},
	{ path: '**', redirectTo: 'todos' }
];
