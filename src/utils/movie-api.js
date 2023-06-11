import axios from 'axios';

export async function fetchMovies(){
    return axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=28f882571b90834cf3bf26f959b6b90f')
}

export async function fetchNewMovies(){
    return axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=28f882571b90834cf3bf26f959b6b90f')
}

export async function fetchGenres(){
    return axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=28f882571b90834cf3bf26f959b6b90f')
}

export async function fetchInfo(id){
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=28f882571b90834cf3bf26f959b6b90f`)
}

export async function fetchCredits(id){
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=28f882571b90834cf3bf26f959b6b90f`)
}