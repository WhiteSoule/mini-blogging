import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../interfaces/profile';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = 'https://api.realworld.io/api'
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toaster: ToastrService
  ) { }

  getProfile(username:string) :Observable<ProfileResponse>{
    return this.http.get<ProfileResponse>(this.apiUrl+'/profiles/'+username)
  }

  followUser(username:string): void{
    this.http.post(this.apiUrl+`/profiles/${username}/follow`,{})
    .subscribe({
      next: value => this.toaster.success('you are following '+username)
    })
  }

  unFollowUser(username:string): void{
    this.http.delete<ProfileResponse>(this.apiUrl+`/profiles/${username}/follow`)
    .subscribe({
      next: value => this.toaster.success('you are not following '+username+' anymore')
    })
  }

}
