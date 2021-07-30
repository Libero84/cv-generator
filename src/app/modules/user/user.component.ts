import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './sersvices/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMsg } from '../../helper/errorMsg';
import { User, UserBanned } from '../../models/user';
import { AuthService } from '../../core/services/auth-service/auth.service';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { find as _find, some as _some } from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements AfterViewInit, OnDestroy {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'email', 'username', 'createdAt', 'updatedAt'];
  private getUser$!: Observable<string[] | null>;
  private getUsers$!: Observable<string[] | null>;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  ngAfterViewInit(): void {
    this.getUser$ = this.authService.roles$.pipe(
      filter((res: string[] | null) => {
        return !this.isReturnUsers(res);
      })
    );

    this.getUsers$ = this.authService.roles$.pipe(
      filter((res: string[] | null) => {
        return this.isReturnUsers(res);
      })
    );

    this.getUser$
      .pipe(
        switchMap(() => this.userService.getLoggedUserInfo()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res: User) => {
          this.users = [res];
        },
        (error: HttpErrorResponse) => errorMsg(error)
      );

    this.getUsers$
      .pipe(
        switchMap(() => this.userService.getUsers()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res: User[]) => {
          this.users = res;
        },
        (error: HttpErrorResponse) => errorMsg(error)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleUserStatus(userId: number): void {
    this.userService.toggleUser(userId).subscribe(
      (res: UserBanned) => {
        console.info('change User status - success', res);
      },
      (error) => errorMsg(error)
    );
  }

  private isReturnUsers(permissions: string[] | null): boolean {
    return _some(permissions, (elem: string) => elem === 'ROLE_ADMIN');
  }
}
