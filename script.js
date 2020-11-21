$(function(){
    var APIKEY = "";
    trendingMovies(APIKEY);
});

/**
 * @param {*} APIKEY
 * Makes a call to https://api.trakt.tv/movies/trending to get
 * a JSON object of trending movies. Commented line can be used
 * when working on local host.
 *
 * @returns  {Object}  JSON Object of currently trending movies
 */
async function trendingMovies(APIKEY){
    const result = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
    });
    console.log(result);
    return result.data;
}

/**
 * 
 * @param {*} APIKEY 
 * Makes a call to https://api.trakt.tv/movies/popular to get
 * a JSON object of popular movies. May not work on local host
 * without changing url.
 * 
 * @return {Object} JSON Object of popular movies
 */
async function popularMovies(APIKEY){
    const result = await axios({
        method: "GET",
        url: "https://api.trakt.tv/movies/popular",
        headers: {
            "Content-type": "application/json",
            "trakt-api-version": "2",
            "trakt-api-key": APIKEY,
        }
    });
    return result.data;
}
