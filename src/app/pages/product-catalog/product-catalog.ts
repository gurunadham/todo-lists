import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
}

@Component({
  selector: 'app-product-catalog',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css',
  standalone: true
})
export class ProductCatalog implements OnInit {

  products: Product[] = [];

  filteredProducts: Product[] = [];

  searchText = '';

  selectedCategory = '';

  selectedPriceRange = '';

  sortBy = '';

  ngOnInit(): void {
    // Initialize the product catalog with some sample data
    this.products = [
      { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, rating: 4.5, stock: 10 },
      { id: 2, name: 'Book', category: 'Education', price: 19.99, rating: 4.0, stock: 50 },
      { id: 3, name: 'Headphones', category: 'Electronics', price: 149.99, rating: 4.2, stock: 25 },
      { id: 4, name: 'Coffee Maker', category: 'Home Appliances', price: 79.99, rating: 4.1, stock: 15 },
      { id: 5, name: 'Smartphone', category: 'Electronics', price: 699.99, rating: 4.6, stock: 30 },
      { id: 6, name: 'Desk Chair', category: 'Furniture', price: 129.99, rating: 4.3, stock: 20 },
      { id: 7, name: 'Running Shoes', category: 'Sportswear', price: 89.99, rating: 4.4, stock: 40 },
      { id: 8, name: 'Blender', category: 'Home Appliances', price: 59.99, rating: 4.0, stock: 18 },
      { id: 9, name: 'Tablet', category: 'Electronics', price: 399.99, rating: 4.5, stock: 12 },
      { id: 10, name: 'Backpack', category: 'Accessories', price: 49.99, rating: 4.2, stock: 35 },
      { id: 11, name: 'Gaming Console', category: 'Electronics', price: 499.99, rating: 4.7, stock: 8 },
      { id: 12, name: 'Water Bottle', category: 'Accessories', price: 14.99, rating: 4.1, stock: 60 },
      { id: 13, name: 'Electric Kettle', category: 'Home Appliances', price: 39.99, rating: 4.3, stock: 22 },
      { id: 14, name: 'Fitness Tracker', category: 'Electronics', price: 129.99, rating: 4.4, stock: 28 },
      { id: 15, name: 'Desk Lamp', category: 'Furniture', price: 29.99, rating: 4.0, stock: 18 },
      { id: 16, name: 'Wireless Mouse', category: 'Electronics', price: 24.99, rating: 4.2, stock: 45 },
      { id: 17, name: 'Yoga Mat', category: 'Sportswear', price: 39.99, rating: 4.5, stock: 30 },
      { id: 18, name: 'Digital Camera', category: 'Electronics', price: 599.99, rating: 4.6, stock: 10 },
      { id: 19, name: 'Cookware Set', category: 'Home Appliances', price: 149.99, rating: 4.3, stock: 12 },
      { id: 20, name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, rating: 4.4, stock: 25 }
    ];
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearchText = product.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
      const matchesPriceRange = this.selectedPriceRange ? this.isWithinPriceRange(product.price, this.selectedPriceRange) : true;

      return matchesSearchText && matchesCategory && matchesPriceRange;
    });

    this.sortProducts();
  }

  sortProducts() {
    if (this.sortBy === 'priceAsc') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'priceDesc') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'ratingAsc') {
      this.filteredProducts.sort((a, b) => a.rating - b.rating);
    } else if (this.sortBy === 'ratingDesc') {
      this.filteredProducts.sort((a, b) => b.rating - a.rating);
    }
  }

  isWithinPriceRange(price: number, range: string): boolean {
    const [min, max] = range.split('-').map(Number);
    return price >= min && price <= max;
  }

  getUniqueCategories(): string[] {
    const categories = this.products.map(product => product.category);
    return Array.from(new Set(categories));
  }

}
