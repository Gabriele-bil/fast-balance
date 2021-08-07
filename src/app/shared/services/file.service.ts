import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { last, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private readonly afStorage: AngularFireStorage) { }

  public uploadImage(folder: string, file: File): Observable<string> {
    const fileName = `${folder}/${Date.now()}`;
    const fileRef = this.afStorage.ref(fileName);
    const task = this.afStorage.upload(fileName, file);

    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    );
  }
}
