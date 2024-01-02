import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../Model/film';
import { FilmService } from '../Services/film.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorited',
  standalone: true,
  templateUrl: './favorited.component.html',
  styleUrls: ['./favorited.component.css'],
  providers: [FilmService],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
})
export class FavoritedComponent implements OnInit {
  favoriteFilms: Film[] = [];

  constructor(private filmService: FilmService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getFavoriteFilms();
  }
  getUrl(name: any) {
    return this.filmService.getimagefromapi(name);
  }

  getFavoriteFilms() {
    this.http.get<any[]>('http://localhost:8081/favoris').subscribe(
      (response: any[]) => {
        if (response && response.length > 0) {
          response.forEach((favorite: any) => {
            const title: string = favorite.title; // Supposons que le titre est dans la propriété "title" de l'objet

            // Vérifie si le film existe déjà dans la liste favoriteFilms
            const exists = this.favoriteFilms.some(
              (film) => film.title === title
            );

            if (!exists) {
              this.filmService.getMovieByTitle(title).subscribe(
                (movieDetails: any[]) => {
                  if (movieDetails && movieDetails.length > 0) {
                    // Ajoute les détails du premier film trouvé avec ce titre
                    const movieDetail = movieDetails[0];
                    const film: Film = {
                      id: movieDetail.id,
                      title: movieDetail.title,
                      adult: movieDetail.adult,
                      backdrop_path: movieDetail.backdrop_path,
                      genre_ids: movieDetail.genre_ids,
                      original_language: movieDetail.original_language,
                      original_title: movieDetail.original_title,
                      overview: movieDetail.overview,
                      popularity: movieDetail.popularity,
                      poster_path: movieDetail.poster_path,
                      release_date: movieDetail.release_date,
                      video: movieDetail.video,
                      vote_average: movieDetail.vote_average,
                      vote_count: movieDetail.vote_count,
                    };
                    this.favoriteFilms.push(film);
                    console.log(this.favoriteFilms);
                  }
                },
                (error) => {
                  console.error('Error fetching movie details:', error);
                }
              );
            }
          });
        } else {
          console.log('Aucun film favori trouvé.');
        }
      },
      (error) => {
        console.error('Error fetching favorite films:', error);
      }
    );
  }
}
