export default {

    getSearchAPI(searchQuery) {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=7bb993dba752d97ff192b9161acb3381&language=en-US&query=${searchQuery}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(payload => payload);
    }
};
