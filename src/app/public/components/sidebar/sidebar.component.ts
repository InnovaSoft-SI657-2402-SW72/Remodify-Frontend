import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatBadgeModule } from "@angular/material/badge";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../../../reStyle/security/services/user.service";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatSidenavModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatBadgeModule,
        RouterLink
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

    type: string = '';
    id: any | undefined;
    userData: any = {};
    isLoading: boolean = true;

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.type = sessionStorage.getItem("userType") || '';
        this.id = sessionStorage.getItem("signInId");

        if (this.id) {
            this.userService.getUserById(this.id).subscribe(
                (response: any) => {
                    this.userData = response;
                    this.isLoading = false;
                },
                (error) => {
                    console.error('Error al leer usuario', error);
                    this.isLoading = false;
                }
            );
        } else {
            this.isLoading = false;
        }
    }


    redirectToRemodelers() {
        this.router.navigateByUrl('/business');
    }
    redirectToComingSoon() {
        this.router.navigateByUrl('/coming-soon');
    }
    redirectToReviews() {
        if (this.type === 'remodeler') {
            alert('Solo los contratistas pueden acceder a esta sección');
        } else if (this.type === 'contractor') {
            this.router.navigateByUrl('/reviews');
        }
    }
    inDevelopment() {
        alert('Esta opción está en desarrollo, Disculpe las molestias!');
    }

    redirectToProyects() {
        if (this.type === 'remodeler') {
            this.router.navigate(['portfolio']);
        } else if (this.type === 'contractor') {
            this.router.navigateByUrl('/coming-soon');
        }
    }
    redirectToSupport() {
        this.router.navigate([`support`])
    }

    redirectToProfile() {
        this.router.navigate([`home/profile/remodeler/${this.id}`])
    }

    logOut() {
        sessionStorage.clear();
        this.router.navigate(['/home']);
    }

}
