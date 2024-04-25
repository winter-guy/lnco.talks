import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PACKAGE_JSON, providePackageJson } from '@lib/providers';
import { LogoComponent } from '../logo/logo.component';
import { HttpService } from '@lib/services/http/http-client-wrapper.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StatusComponent } from './status/status';
import { HealthService } from '@lib/services/health/health.service';
import { AuthService } from '@auth0/auth0-angular';
import { needConfirmation } from '@lib/content/dialog.directive';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule, LogoComponent, MatDialogModule],
    providers: [providePackageJson()],
    templateUrl: './footer.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    readonly packageJson = inject(PACKAGE_JSON);
    readonly health = inject(HttpService);
    readonly matDialog = inject(MatDialog);
    readonly hs = inject(HealthService);
    constructor(public auth: AuthService, @Inject(DOCUMENT) private _doc: Document) {}

    readonly currentYear = new Date().getFullYear();

    state!: number;
    ngOnInit(): void {
        this.health.status$.subscribe((res) => {
            this.state = res;
        });
    }

    open(): void {
        this.matDialog.open(StatusComponent, {
            data: { status: false },
            disableClose: false,
            panelClass: ['rounded'],
        });
    }

    @needConfirmation({
        message: `Are you sure you want to log out?`,
        description: `Logging out will terminate your current session and require you to 
                        sign in again to access your account and modify artifacts. `,
        label: 'sign out',
        disableCloseBtn: true,
    })
    public logout(): void {
        this.auth.logout({ logoutParams: { returnTo: this._doc.location.origin } });
    }
    //create it through behaviour subject
}
