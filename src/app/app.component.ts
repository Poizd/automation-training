import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items!: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home',
        automationId: 'home-page',
      },
      {
        label: 'Todo list',
        icon: 'pi pi-fw pi-list',
        routerLink: '/todo',
        automationId: 'todo-page',
      },
      {
        label: 'Posts',
        icon: 'pi pi-fw pi-check-square',
        routerLink: '/posts',
        automationId: 'posts-page',
      },
      {
        label: 'Gallery',
        icon: 'pi pi-fw pi-image',
        routerLink: '/gallery',
        automationId: 'gallery-page',
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-compass',
        routerLink: '/about',
        automationId: 'about-page',
      },
    ];
  }
}
