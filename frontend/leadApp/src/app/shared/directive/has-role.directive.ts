import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole:any;
  private currentUserRole!: any;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }

  ngOnInit():void{
    this.currentUserRole = this.authService.currentUserValue.role
    const roles = this.appHasRole.toLowerCase().split(',');
    this._restrictNavigation(roles);
  }

  private _restrictNavigation(roles: string[]) {
    const isExist = roles.find(item=>{
      return item.trim() === this.currentUserRole.trim().toLowerCase()
    })
    if (isExist) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainer.clear();
    }
  }

}
