import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export interface PublicGalleryItem {
  id: string;
  image: string;
  thumbnail?: string;
  title?: string;
  category?: string;
}

@Component({
  selector: 'app-profile-gallery',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  @Input()
  items: PublicGalleryItem[] = [];

  @Input()
  categories: string[] = [];
  selectedCategory = 'all';

  selectedItem?: PublicGalleryItem;

  get filteredItems(): PublicGalleryItem[] {
    if (this.selectedCategory === 'all') {
      return this.items;
    }

    return this.items.filter((item) => item.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  openImage(item: PublicGalleryItem): void {
    this.selectedItem = item;
  }

  closeImage(): void {
    this.selectedItem = undefined;
  }
}
