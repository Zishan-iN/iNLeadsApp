import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/models/alert-type.enum';
import { Alert } from 'src/app/models/alert.model';
import { AlertMessageService } from 'src/app/services/alert-message.service';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;
  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  constructor(
    private alertService: AlertMessageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id).subscribe(alert => {
      if (!alert.message) {
        return;
      }
      this.alerts.push(alert);
      if (alert.autoClose && !alert.redirect) {
        setTimeout(() => {
          this.removeAlert(alert);
        }, 5000);
      }

      if (alert.redirect && alert.autoClose) {
        setTimeout(() => {
          this.removeAlert(alert);
        }, 5000);
      }
    })
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) {
      return;
    }

    if (this.fade) {
      this.alerts.find(x => x === alert)!.fade = true;
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      this.alerts = this.alerts.filter(x => x !== alert);
    }
    if (alert.redirect) {
      this.router.navigate([alert.redirectLink]);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

}
