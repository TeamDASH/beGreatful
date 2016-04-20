import { Component }       from 'angular2/core';
import { LoginComponent } from './login.component'
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
  selector: 'my-app',
  template: `
  <h1>Test app</h1>
  <div [routerLink]="['Login']"></div>
  <router-outlet></router-outlet>
    `,

  directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
    ]

})

@RouteConfig([
  {  
    path: '/login',
    name: 'Login',
    component: LoginComponent,
    useAsDefault: true
  }
])

export class AppComponent {
}
