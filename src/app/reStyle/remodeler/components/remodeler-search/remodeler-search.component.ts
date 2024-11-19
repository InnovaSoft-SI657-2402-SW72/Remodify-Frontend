import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from "@angular/material/paginator";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RemodelerApiService } from "../../services/remodeler-api.service";
import { SidebarComponent } from "../../../../public/components/sidebar/sidebar.component";
import { ToolbarComponent } from "../../../../public/components/toolbar/toolbar.component";
import { ContractorSidebarComponent } from "../../../../public/components/sidebarcontractor/sidebar.component";
import { ToolbarRemodelerComponent } from "../../../../public/components/toolbar-remodeler/toolbar-remodeler.component";

@Component({
  selector: 'app-remodeler-search',
  standalone: true,
  imports: [
    MatPaginator,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    CommonModule,
    FormsModule,
    SidebarComponent,
    ToolbarComponent,
    ContractorSidebarComponent,
    ToolbarRemodelerComponent
  ],
  templateUrl: './remodeler-search.component.html',
  styleUrl: './remodeler-search.component.css'
})
export class RemodelerSearchComponent implements OnInit {
  businesses: any[] = [];
  projects: any[] = [];
  filteredProjects: any[] = [];
  searchTerm: string = '';
  type: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private remodelerApiService: RemodelerApiService, private router: Router) {}

  ngOnInit() {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloaded');
      this.type = sessionStorage.getItem("userType") || '';
      this.getResources();
    }
  }

  getResources(): void {
    this.remodelerApiService.getBusiness().subscribe(
      (data: any) => {
        this.businesses = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.remodelerApiService.getProjects().subscribe(
      (data: any) => {
        this.projects = data;
        this.filteredProjects = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  applySearchFilter(): void {
    if (this.searchTerm) {
      this.filteredProjects = this.projects.filter((project: any) =>
        project.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProjects = this.projects;
    }
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.filteredProjects = this.projects;
  }
}
