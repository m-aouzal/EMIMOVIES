import { Injectable } from '@angular/core';
import { Film } from '../Model/film';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private http: HttpClient) {}

  baseurl = 'https://api.themoviedb.org/3/movie/popular';
  apikey = '4722616a8836f0b929a9cb3a04f6a6a4';

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.baseurl}?api_key=${this.apikey}`);
  }

  getPopularMoviesById(id: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apikey}`;
    return this.http.get<any>(url);
    console.log(url);
  }
  getimagefromapi(poster_path: string) {
    return 'https://image.tmdb.org/t/p/w300' + poster_path;
  }
  getMovieByTitle(title: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=en-US&query=${title}&page=1&include_adult=true`;
    return this.http.get<any>(url).pipe(map((res: any) => res.results));
  }
  searchMovies(moviePrefix: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&language=en-US&query=${moviePrefix}%20&page=1&include_adult=true`;
    return this.http.get<any>(url).pipe(map((res: any) => res.results));
  }
}
