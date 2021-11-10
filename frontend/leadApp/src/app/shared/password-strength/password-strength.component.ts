import { Component, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnInit {

  bar0: string='';
  bar1: string='';
  bar2: string='';
  bar3: string='';

  barColor:any
  @Input() public passwordToCheck!: string;
  colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }){
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.index, c.color);
    }
  }
  
  private getColor(s: any) {
    let index = 0;
    if (s === 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else if (s === 30) {
      index = 2;
    } else if (s === 40) {
      index = 3;
    } else {
      index = 4;
    }
    return {
      index: index + 1,
      color: this.colors[index]
    };
  }
  

  private checkStrength(pswd: string) {
    let force = 0;

    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(pswd);
    const upperLetters = /[A-Z]+/.test(pswd);
    const numbers = /[0-9]+/.test(pswd);
    const symbols = regex.test(pswd);
  
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }
  
    force += 2 * pswd.length + ((pswd.length >= 10) ? 1 : 0);
    force += passedMatches * 10;
  
    force = (pswd.length <= 7) ? Math.min(force, 10) : force;
  
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;
  
    return force;
  }

  private setBarColors(index: number, color: string) {
    for (let n = 0; n < index; n++) {
      switch ('bar' + n){
        case 'bar0':
        this.bar0 = color
        break  
        case 'bar1':
        this.bar1 = color
        break  
        case 'bar2':
        this.bar2 = color
        break  
        case 'bar3':
        this.bar3 = color
        break  
      }
      this.barColor = color
      console.log('BCAf', this.barColor)
    }
  }

}
