$(function(){
$(document).on("click", "#vodkaButton", handleVodka)
$(document).on("click", "#ginButton", handleGin)
$(document).on("click", "#tequilaButton", handleTequila)
$(document).on("click", "#rumButton", handleRum)
$(document).on("click", "#brandyButton", handleBrandy)
$(document).on("click", "#whiskyButton", handleWhisky)
$(document).on("click", "#ingButton", handleIngredients)
$(document).on("click",".link", drinkClick)
$(document).on("click", ".pop", drinkClick)
$(document).on("click", "#searchButton", searchName)
$(document).on("click", "#vod", handleVod)
$(document).on("click", "#gin", handleGin2)
$(document).on("click", "#teq", handleTeq)
$(document).on("click", "#rum", handleRum1)
$(document).on("click", "#bran", handleBran)
$(document).on("click", "#whis", handleWhis)
$(document).on("click", "#favButton", handleFavorite);
$('#liquorButton').on("click", switchToLiquor)
$('#popularButton').on("click", switchToPopular)
$('#ingredientButton').on("click", switchToIngredient)
$('#nameButton').on("click", switchToName)
$('#favoriteButton').on("click", switchToFavorite)
//$('.unFavButton').on("click", unfavoriteDrink);
$(document).on("click", ".unFavButton", unfavoriteDrink);

 postPopular()
 postVodka()
 postGin()
 postTequila()
 postRum()
 postBrandy()
 postWhisky()
 postIngredients()
 postAll()
})

async function unfavoriteDrink(event){
    let drink = event.target.getAttribute("data-drinkID");

    const result = await axios({
        method: 'DELETE',
        url: `https://warm-oasis-53340.herokuapp.com/favorite/${drink}`,
        withCredentials: true
    });
    switchToFavorite();
}

async function handleFavorite(event){
    //data-drinkName
    let drinkName = event.target.getAttribute("data-drinkName");
    
    try{        
        const result = await axios({
            method: 'POST',
            url: 'https://warm-oasis-53340.herokuapp.com/favorite',
            withCredentials: true,
            data: {
                'drinkName': `${drinkName}`
            }
        });
    return;
    }
    catch(e){
        alert("Please Login to Favorite Drinks...");
        return;
    }
}

export function switchToName(){
    $('#ingredientTable').empty()
    $('#dependsOnSearch').empty()
    $('.content h1').html("Search for drink by name")
    $('#dependsOnSearch').append(`        <section class = "section has-background-dark">
    <div class = "container has-text-white">
        <h98 class = "content">What drink are you looking for?</h98>
        <input list = "drinkList" id = "drinkInput" class = "box" value = "">
        <datalist id = "drinkList">
        </datalist>
        <button type = "button" id = "searchButton" class = "button is-rounded is-small">Find my drink!</button>
    </div>
</section>`)
postAll()
}

export function switchToIngredient(){
    $('#ingredientTable').empty()
    $('#dependsOnSearch').empty()
    $('.content h1').html("Search for drink by ingredients")
    $('#dependsOnSearch').append(`<section class = "section has-background-dark">
    <div class = "has-text-white">
    <h98>What do you want to use?</h98>
    </div>
    <div class = "columns">
                         <div class = "column">
                            <input list = "ingredientList" id = "ingInput" class = "box"  value = "">
                            <input list = "ingredientList" id = "ingInput2" class = "box " value = "">
                        </div>
                        <div class = "column">
                            <input list = "ingredientList" id = "ingInput3" class = "box " value = "">
                            <input list = "ingredientList" id = "ingInput4" class = "box " value = "">
                        </div>
                            <datalist id = "ingredientList">                                                    
                            </datalist>
                </div>
                <div class = "column">
                <span><button type = "button" id = "ingButton" class = "button is-rounded is-small">Find me a drink!</button></span>
            </div>
            </section>`)
    postIngredients()
}

export function switchToPopular(){
    $('#ingredientTable').empty()
    $('#dependsOnSearch').empty()
    $('.content h1').html("Search for drink by popular drinks")
    $('#dependsOnSearch').append(`<section class="section has-background-dark">
    <h98 class="has-text-white">What popular drink do you like?</h98>
    <table class="box" id = "popular">
    </table>
</section>`)
    postPopular()
}

function switchToFavorite(){
    $('#dependsOnSearch').empty();
    $('.content h1').html("Favorites");
    getFavorites();
}

async function getFavorites(){
    const result = await axios({
        method: 'GET',
        url: 'https://warm-oasis-53340.herokuapp.com/favorite',
        withCredentials: true,
    });
    let favoritesIndex = result.data;


    let drinkArray = [];
    let idArray = [];
    for(let index in favoritesIndex){
        let drink = await axios({
            method: 'GET',
            url: `https://warm-oasis-53340.herokuapp.com/favorite/${favoritesIndex[index]}`,
            withCredentials: true,
        });
        drinkArray.push(drink.data.favorites);
        idArray.push(drink.data.id);
    }

    for(let i in drinkArray){
        //We may want to actually pass the drink id because that might be easier to search for. Idk yet
        $('#dependsOnSearch').append(`
                                    <div class="box">
                                        <h2>${drinkArray[i]}</h2>
                                        <button type = "button" class = "unFavButton button is-rounded is-small" data-drinkID=${idArray[i]}>Unfavorite</button>
                                    </div>`);
    }
}

export function switchToLiquor(){
    $('#ingredientTable').empty()
    $('#dependsOnSearch').empty()
    $('.content h1').html("Search for drink by base liquor")
    $('#dependsOnSearch').append(`
    <section class="section has-background-dark">
    <h98 class="has-text-white">What liquor do you have?</h98>
    <div class = "container">
        <div class="columns">
            <div class="column">
                <button type = "button" class = "button is-success is-light is-fullwidth" id = "vod">Vodka</button>
            </div>
            <div class="column">
                <button type = "button" class = "button is-success is-light is-fullwidth" id = "gin">Gin</button>
            </div>
            <div class="column">
                <button type = "button" class = "button is-success is-light is-fullwidth" id = "teq">Tequila</button>
            </div>
        </div>
    </div>
    <div class = "container">
        <div class="columns">
            <div class="column">
                <button type = "button" class = "button is-success is-light is-fullwidth" id = "rum">Rum</button>
            </div>
            <div class="column">
                <button type = "button" class = "button is-success is-light is-fullwidth" id = "bran">Brandy</button>
            </div>
            <div class="column">
                <button type = "button" class = "button is-success is-light is-fullwidth" id = "whis">Whisky</button>
            </div>
        </div>
    </div>
</section>`)
}

export async function handleVod(){
    $('#ingredientTable').empty()
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Brandy',
    })

    for(let i =0; i < res.data.drinks.length; i++){
        let j = Math.floor(i/10)
        if( i % 10 == 0){
            $('#ingredientTable').append(`<tr id = ${"table"+j}></tr>`)
        }
         $('#table'+j).append(`<td id = "${res.data.drinks[i].strDrink}"><button class = "pop">${res.data.drinks[i].strDrink}</button></td>`)
    }
}

export async function handleGin2(){
    $('#ingredientTable').empty()
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin',
    })

    for(let i =0; i < res.data.drinks.length; i++){
        let j = Math.floor(i/10)
        if( i % 10 == 0){
            $('#ingredientTable').append(`<tr id = ${"table"+j}></tr>`)
        }
         $('#table'+j).append(`<td id = "${res.data.drinks[i].strDrink}"><button class = "pop">${res.data.drinks[i].strDrink}</button></td>`)
    }
}

export async function handleTeq(){
    $('#ingredientTable').empty()
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila',
    })

    for(let i =0; i < res.data.drinks.length; i++){
        let j = Math.floor(i/10)
        if( i % 10 == 0){
            $('#ingredientTable').append(`<tr id = ${"table"+j}></tr>`)
        }
         $('#table'+j).append(`<td id = "${res.data.drinks[i].strDrink}"><button class = "pop">${res.data.drinks[i].strDrink}</button></td>`)
    }
}

export async function handleRum1(){
    $('#ingredientTable').empty()
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum',
    })

    for(let i =0; i < res.data.drinks.length; i++){
        let j = Math.floor(i/10)
        if( i % 10 == 0){
            $('#ingredientTable').append(`<tr id = ${"table"+j}></tr>`)
        }
         $('#table'+j).append(`<td id = "${res.data.drinks[i].strDrink}"><button class = "pop">${res.data.drinks[i].strDrink}</button></td>`)
    }
}

export async function handleBran(){
    $('#ingredientTable').empty()
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Brandy',
    })

    for(let i =0; i < res.data.drinks.length; i++){
        let j = Math.floor(i/10)
        if( i % 10 == 0){
            $('#ingredientTable').append(`<tr id = ${"table"+j}></tr>`)
        }
         $('#table'+j).append(`<td id = "${res.data.drinks[i].strDrink}"><button class = "pop">${res.data.drinks[i].strDrink}</button></td>`)
    }
}

export async function handleWhis(){
    $('#ingredientTable').empty()
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey',
    })

    for(let i =0; i < res.data.drinks.length; i++){
        let j = Math.floor(i/10)
        if( i % 10 == 0){
            $('#ingredientTable').append(`<tr id = ${"table"+j}></tr>`)
        }
         $('#table'+j).append(`<td id = "${res.data.drinks[i].strDrink}"><button class = "pop">${res.data.drinks[i].strDrink}</button></td>`)
    }
}





export async function postPopular(){
    let pop =[]
    for(let i = 0; i < 15; i++){
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    })
    pop.push(res.data.drinks[0].strDrink)
    }
    for(let i =0; i < pop.length; i++){
        //$('#popular').append(`<p class ="popularDrinkNames">${i.strDrink}</p>`)
        let j = Math.floor(i/5)
        if(i % 5 == 0){
            $('#popular').append(`<tr id = ${"tbl"+j}></tr>`)        
        }
        $('#tbl'+j).append(`<td id = "${pop[i]}"><button class = "pop">${pop[i]}</button></td>`)
    }

}


export async function postVodka(){
    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka',
    })
    for(let i of res.data.drinks){
    $('#vodkaList').append(`<option value = "${i.strDrink}"`)
    }
}


export async function postGin(){
    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin',
    })
    for(let i of res.data.drinks){
    $('#ginList').append(`<option value = "${i.strDrink}"`)
    }
}

export async function postTequila(){
    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Tequila',
    })
    for(let i of res.data.drinks){
    $('#tequilaList').append(`<option value = "${i.strDrink}"`)
    }
}

export async function postRum(){
    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum',
    })
    for(let i of res.data.drinks){
    $('#rumList').append(`<option value = "${i.strDrink}"`)
    }
}

export async function postBrandy(){
    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Brandy',
    })
    for(let i of res.data.drinks){
    $('#brandyList').append(`<option value = "${i.strDrink}"`)
    }
}

export async function postWhisky(){
    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey',
    })
    for(let i of res.data.drinks){
    $('#whiskyList').append(`<option value = "${i.strDrink}"`)
    }
}

export function handleVodka(){
    let value = document.querySelector('#vodkaInput').value
    addDrinkCard(value)
    document.querySelector('#vodkaInput').value = ""
}

export function handleGin(){
    let value = document.querySelector('#ginInput').value
    addDrinkCard(value)
    document.querySelector('#ginInput').value = ""
}

export function handleTequila(){
    let value = document.querySelector('#tequilaInput').value
    addDrinkCard(value)
    document.querySelector('#tequilaInput').value = ""
}

export function handleRum(){
    let value = document.querySelector('#rumInput').value
    addDrinkCard(value)
    document.querySelector('#rumInput').value = ""
}

export function handleBrandy(){
    let value = document.querySelector('#brandyInput').value
    addDrinkCard(value)
    document.querySelector('#brandyInput').value = ""
}

export function handleWhisky(){
    let value = document.querySelector('#whiskyInput').value
    addDrinkCard(value)
    document.querySelector('#whiskyInput').value = ""
}

export async function addDrinkCard(drink){
    $('#drinkCardName').empty()
    $('#ingList').empty()
    $('#drinkDirections').empty()
    $('#ingList').append(`<h99>Ingredients</h99>`)
    $("#drinkDirections").append('<h99>Directions</h99>')


    let ingredients = []
    let ing = 0;
    let vol = 0;


    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drink,
    })
    let dInfo = res.data.drinks[0]
    for(let [key,val] of Object.entries(dInfo)){
        if(val != null){
            if(val == drink){
                $('#drinkCardName').append(`<h100>${val}</h100>`)
            }
            if(key.includes("Ingredient") & val != ""){
                ingredients.push(val)
                ing++
            }
            if(key.includes("Measure") & val != ""){
                ingredients.push(val)
                vol++
            }
            if(String(key) == "strInstructions"){
                $('#drinkDirections').append(`<p>${val}</p>`)
            }

            if(key.includes("Thumb")){
                $('#drinkCardName').append(`<img src = ${val} alt = "picture of drnk">`)
            }

        }
    }
    for(let i = 0; i < ing-vol; i++){
        ingredients.push("You choose the amount of")
    }
    let j = ingredients.length/2
    for(let i =0; i < ingredients.length/2; i++){
        $('#ingList').append(`<li>${ingredients[j+i]}  ${ingredients[i]}</li>`)
    }

    $('#ingList').append(`<br><button type = "button" id = "favButton" class = "button is-rounded is-small" data-drinkName="${drink}">Add to Favorites</button>`)

}

export async function postIngredients(){
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
    })
    for(let i = 0; i < res.data.drinks.length; i++){
    for(let [k,v] of Object.entries(res.data.drinks[i])){
        $('#ingredientList').append(`<option value = "${v}"`)
        }
    }
}

export function handleIngredients(){
    $('#drinkTable').empty()
    let value = document.querySelector('#ingInput').value
    let value2 = document.querySelector('#ingInput2').value
    let value3 = document.querySelector('#ingInput3').value
    let value4 = document.querySelector('#ingInput4').value
    addIngCard(value, value2, value3, value4)
    document.querySelector('#ingInput').value = ""
    document.querySelector('#ingInput2').value = ""
    document.querySelector('#ingInput3').value = ""
    document.querySelector('#ingInput4').value = ""
}


export async function addIngCard(value, value2, value3, value4){
$('#ingredientTable').empty()

    let lis = []
    if(value != ""){
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+value,
    })

    for(let i = 0; i < res.data.drinks.length; i++){
        for(let [k,v]  of Object.entries(res.data.drinks[i])){
            if(v != null & v != "" & k == "strDrink"){
                lis.push(v)
            }
        }
    }
}

    let lis2 = []
    if(value2 != ""){
    let res2 = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+value2,
    })

    for(let i = 0; i < res2.data.drinks.length; i++){
        for(let [k,v]  of Object.entries(res2.data.drinks[i])){
            if(v != null & v != "" & k == "strDrink"){
                lis2.push(v)
            }
        }
    }
}
    let lis3 = []
    if(value3 != ""){
    let res3 = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+value3,
    })

    for(let i = 0; i < res3.data.drinks.length; i++){
        for(let [k,v]  of Object.entries(res3.data.drinks[i])){
            if(v != null & v != "" & k == "strDrink"){
                lis3.push(v)
            }
        }
    }
}
    let lis4 = []
    if(value4 != ""){
    let res4 = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i='+value4,
    })

    for(let i = 0; i < res4.data.drinks.length; i++){
        for(let [k,v]  of Object.entries(res4.data.drinks[i])){
            if(v != null & v != "" & k == "strDrink"){
                lis4.push(v)
            }
        }
    }
}

let count = 0
let finList = []
if(lis.length != 0 ){
    count ++
    finList = finList.concat(lis)
}

if(lis2.length != 0){
    count ++
    finList = finList.concat(lis2)
}

if(lis3.length != 0){
    count++
    finList = finList.concat(lis3)
}

if(lis4.length != 0){
    count++
    finList = finList.concat(lis4)
}

let uniq = [...new Set(finList)]
let finfinList = []

    for(let  i=0; i < uniq.length; i++){
        if((numTimes(finList, uniq[i]) / count) == 1){
            finfinList.push(uniq[i])
        }
    }

    for(let i =0; i < finfinList.length; i++){
    let j = Math.floor(i/10)
    if(i % 10 == 0){
        $('#ingredientTable').append(`<tr id = ${"tb"+j}></tr>`)
    }
    $('#tb'+j).append(`<td id = "${finfinList[i]}"><button class = "link">${finfinList[i]}</button></td>`)
}
}


export function numTimes(array, value){
    return array.filter((v) => (v == value)).length
}

export function drinkClick(e){
    let id = e.target.closest("td").getAttribute('id')
    addDrinkCard(id)
}


export async function randDrink(){
    let pop =[]
    for(let i = 0; i < 25; i++){
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    })
    pop.push(res.data.drinks[0].strDrink)
    }

}

export async function postAll(){
    let res = await axios({
        method: 'Get',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
    })

    for(let i of res.data.drinks){
        $('#drinkList').append(`<option value = "${i.strDrink}">`)
    }

}


export async function searchName(){
    $('#ingredientTable').empty()
    let value = document.querySelector('#drinkInput').value
    addDrinkCard(value)
    document.querySelector('#drinkInput').value = ""
}




