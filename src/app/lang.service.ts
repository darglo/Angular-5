import { Injectable } from '@angular/core';
import { Language } from './language';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  apiUrl: string;

  languageUserMap: Map<number, number[]> = new Map();

  constructor(private http: HttpClient) { 
    this.apiUrl = 'http://localhost:4567';
  }
  
  getLangs(): Observable<Language[]> {
    return this.http.get<Language[]>(this.apiUrl + '/langs');
  }

  getLang(id: number): Observable<Language> {
    return this.http.get<Language>(this.apiUrl + `/langs/${id}`);
  }

  updateLang(lang: Language): Observable<Language> {
    return this.http.put<Language>(this.apiUrl + `/langs/${lang.id}`, lang, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  createLang(lang: Language): Observable<Language> {
    return this.http.post<Language>(this.apiUrl + '/langs', lang, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  updateLanguageMap(languageId: number, users: number[]) {
    this.languageUserMap.set(languageId, users);
  }

  getUsersForLang(languageId: number): number[] {
    return this.languageUserMap.get(languageId) || [];
  }
}
