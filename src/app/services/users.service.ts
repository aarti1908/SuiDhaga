import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

interface Item {
  type: string,
  name: string,
};

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

  getAllProviders(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  addUser(data : any) : Promise<any>{
    const user = data;
    return this.firestore.collection('users').add(user);
  }
}
