export default {

    getSearchAPI(searchQuery, page) {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=7bb993dba752d97ff192b9161acb3381&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`)
            .then(response => response.json())
            .then(payload => payload);
    },
    getPopular(page) {
        return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=7bb993dba752d97ff192b9161acb3381&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
            .then(response => response.json())
            .then(payload => payload);
    }
};
