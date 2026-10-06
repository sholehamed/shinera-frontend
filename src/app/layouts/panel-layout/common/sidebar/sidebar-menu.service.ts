import { Injectable } from '@angular/core';

export interface MenuCategoryDto {
  title: string;
  items: MenuDto[];
}

export interface MenuDto {
  route?: string;
  title: string;
  icon: string;
  childs: MenuDto[];
}

export type SidebarMenuSection = MenuCategoryDto;

@Injectable({ providedIn: 'root' })
export class SidebarMenuService {
  readonly sections: MenuCategoryDto[] = [
    {
      title: 'اصلی',
      items: [
        {
          title: 'داشبورد',
          route: '/app/dashboard',
          icon: 'dashboard',
          childs: []
        }
      ]
    }
  ];
}
