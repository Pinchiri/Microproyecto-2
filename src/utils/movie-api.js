import axios from 'axios';

export async function fetchNewMovies(){
    return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=28f882571b90834cf3bf26f959b6b90f')
}