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
    console.log('D', this.currentUserRole)
    const roles = this.appHasRole.toLowerCase().split(',');
    this._restrictNavigation(roles);
  }

  private _restrictNavigation(roles: string[]) {
    console.log('R', roles)
    const isExist = roles.find(item=>{
      console.log('I',item)
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
