import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { some as _some } from 'lodash';

@Directive({
  selector: '[appCheckPermissions]',
})
export class CheckPermissionsDirective implements OnInit, OnDestroy {
  @Input() appCheckPermissions!: string;
  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.roles$.pipe(takeUntil(this.destroy$)).subscribe((roles: string[]) => {
      if (roles?.length > 0 && this.checkPermission(roles, this.appCheckPermissions)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkPermission(roles: string[], role: string): boolean {
    return _some(roles, role);
  }
}
