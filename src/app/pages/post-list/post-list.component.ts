import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post';
import { PostListService } from '../../services/post-list.service';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  displayedPosts: Post[] = [];
  filteredPosts: Post[] = [];
  page = 1;
  limit = 10;
  isLoading = false;
  searchTerm = '';
  sortOrder = '';
  hasMore = true;
  private isNearBottom = false;

  constructor(private postListService: PostListService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Load posts from the API and append to existing posts
   */
  loadPosts(): void {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;
    const skip = (this.page - 1) * this.limit;

    this.postListService.getPosts(this.limit, skip).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        const newPosts = Array.isArray(response) ? response : [];
        if (newPosts.length === 0) {
          this.hasMore = false;
        } else {
          this.posts = [...this.posts, ...newPosts];
          this.page++;
        }
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Handle scroll event to load more posts
   */
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const atBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 200;

    if (atBottom && !this.isNearBottom && !this.isLoading) {
      this.isNearBottom = true;
      this.loadPosts();
      setTimeout(() => {
        this.isNearBottom = false;
      }, 1000);
    }
  }

  /**
   * Search posts by title and body
   */
  searchPosts(): void {
    this.applyFilters();
  }

  /**
   * Sort posts by specified order
   */
  sortPosts(): void {
    this.applyFilters();
  }

  /**
   * Apply filters and sort to posts
   */
  applyFilters(): void {
    let filtered = [...this.posts];
    console.log('Applying filters. Current posts:', filtered);
    // Apply search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.body.toLowerCase().includes(term)
      );
    }

    // Apply sort
    if (this.sortOrder === 'A-Z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortOrder === 'Z-A') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    this.filteredPosts = filtered;
  }

  /**
   * Reset search and filters
   */
  reset(): void {
    this.searchTerm = '';
    this.sortOrder = '';
    this.applyFilters();
  }

  /**
   * TrackBy function for ngFor optimization
   */
  trackById(index: number, item: Post): number {
    return item.id;
  }
}

