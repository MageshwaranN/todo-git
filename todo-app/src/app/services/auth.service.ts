import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  registerUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post(environment.api + '/users/register', user, { headers: headers })
      .pipe(map(res => res));
  }

  authenticateUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post(environment.api + '/users/authenticate', user, {
        headers: headers
      })
      .pipe(map(res => res));
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');
    return this.http
      .get(environment.api + '/users/profile', { headers: headers })
      .pipe(map(res => res));
  }

  getToDos() {
    this.loadToken();
    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');
    const user = JSON.parse(localStorage.getItem('user'));
    return this.http
      .get(`${environment.api}/api/task?email=${user.email}`, {
        headers: headers
      })
      .pipe(map(res => res));
  }

  addTask(newTask) {
    this.loadToken();
    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');
    const user = JSON.parse(localStorage.getItem('user'));
    newTask.email = user.email;
    return this.http
      .post(environment.api + '/api/task', JSON.stringify(newTask), {
        headers: headers
      })
      .pipe(map(res => res));
  }

  deleteTask(id) {
    return this.http
      .delete(`${environment.api}/api/task?id=${id}`)
      .pipe(map(res => res));
  }

  updateStatus(task) {
    this.loadToken();
    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');
    return this.http
      .put(
        `${environment.api}/api/task?id=${task._id}`,
        JSON.stringify(task),
        { headers: headers }
      )
      .pipe(map(res => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
