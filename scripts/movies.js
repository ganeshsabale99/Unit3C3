// Implement debouncing for network request
// On clicking book now store the selected movie in localstorage as key "movie"
// so that you can retrive it on checkout.html page

let movies = document.getElementById("movies");

async function serach(){

    try{

        const search = document.getElementById("search_bar").value;
        let res=await
        fetch(`https://www.omdbapi.com/?s${serach}&apikey=bf10365b&t`)
        let data = await res.json();
        console.log("data:",data);
        const movies=data.search;
        return movies;
    }
    catch(err){
        console.log("err:",err)
    }
}

function appendmovies(data){
    
    data.forEach(function(el){

        let p =document.createElement("p")
        p.innerText=el.Title;

        p.addEventListener("click",(event) => {
            document.querySelector("#search_bar").value = p.innerText;

        const url = `https://www.omdbapi.com/&apikey=bf10365b&t=${p.innerText}`;
        
        fetch(url)
        .then(function(res){
            return res.json();
        })

        .then(function(res){
            append(res)
            console.log(res);
        })
        .catch(function(err){
            console.log("err:",err);
        })


        });
        movies.append(p);
    })
}

async function main(){
    let data = await movies();
    if(data ==undefined){
        return false;
    }
    appendmovies(data);
}

let id;
function debounce(func,delay)
{
    if(id)
    {
        clearTimeout(id);
    }
    id = setTimeout(function(){
        func();
    },delay);
}

function append(data){
    document.querySelector("#movies").innerHTML=null;
    console.log(data);

    let box = document.createElement("div");
    box.setAttribute("id","search")

    let image = document.createElement("img");
    image.src=data.Poster;

    let Title = document.createElement("p")
    Title.innerText=data.Title;

    let btn1=document.createElement("button");
    btn1.innerText="Book Now";
    btn1.setAttribute("id","book_movies");
    btn1.addEventListener("click",function(){
        
    }) ;

    box.append(image,Title,btn1);
    document.querySelector("#movies").append(box);
}