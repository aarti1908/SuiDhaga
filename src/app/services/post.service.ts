import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Item {
  type: string,
  name: string,
};

@Injectable({
  providedIn: 'root',
})

export class PostService {

  constructor(private firestore: AngularFirestore) {}

  getAllPosts(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
}
