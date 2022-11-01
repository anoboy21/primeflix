import axios from 'axios';

//BASE URL = https://api.themoviedb.org/3/
//PATH_MOVIE = /movie/now_playing?api_key=fee237027cda2226413246654a5143ef&language=pt-BR

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})

export default api;