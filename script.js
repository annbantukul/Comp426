$(function(){
$(document).on("click", "#vodkaButton", handleVodka)
$(document).on("click", "#ginButton", handleGin)
$(document).on("click", "#tequilaButton", handleTequila)
$(document).on("click", "#rumButton", handleRum)
$(document).on("click", "#brandyButton", handleBrandy)
$(document).on("click", "#whiskyButton", handleWhisky)
 postPopular()
 postVodka()
 postGin()
 postTequila()
 postRum()
 postBrandy()
 postWhisky()
})


export async function postPopular(){
    let res = await axios({
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic',
    })
    for(let i of res.data.drinks){
        $('#popular').append(`<p class ="popularDrinkNames">${i.strDrink}</p>`)

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
        console.log(key+ "," + val)
        if(val != null){
            if(val == drink){
                console.log(val)
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

        }
    }
    for(let i = 0; i < ing-vol; i++){
        ingredients.push("You choose the amount of")
    }
    let j = ingredients.length/2
    console.log(j)
    for(let i =0; i < ingredients.length/2; i++){
        $('#ingList').append(`<li>${ingredients[j+i]}  ${ingredients[i]}</li>`)
    }

}

//add search by ingredients