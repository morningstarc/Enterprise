import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DataTablesModule } from 'angular-datatables';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CreatetodoComponent } from './createtodo/createtodo.component';
import { TodolistComponent } from './todolist/todolist.component';
import { SettingsComponent } from './settings/settings.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EdittodoComponent } from './edittodo/edittodo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CreatetodoComponent,
    TodolistComponent,
    SettingsComponent,
    UserCreateComponent,
    UserLoginComponent,
    NotFoundComponent,
    EdittodoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'settings', component: SettingsComponent, pathMatch: 'full' },
      { path: 'create', component: CreatetodoComponent, pathMatch: 'full' },
      { path: 'todos', component: TodolistComponent, pathMatch: 'full' },
      { path: 'edit/:itemId', component: EdittodoComponent, pathMatch: 'full' },
      { path: 'usr/login', component: UserLoginComponent, pathMatch: 'full' },
      { path: 'usr/create', component: UserCreateComponent, pathMatch: 'full' },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' },

    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
    useFactory: function (router: Router) {
      return new AuthInterceptor(router);
    },
    multi: true,
      deps: [Router],
      
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
