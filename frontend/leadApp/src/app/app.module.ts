import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { tokenInterceptor } from './auth/tocken.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ThankyouComponent,
    LoginComponent,
    PagenotfoundComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [AuthGuard, tokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
