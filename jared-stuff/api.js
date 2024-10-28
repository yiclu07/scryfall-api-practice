//Endpoint and Header for the search api
const url = 'https://api.scryfall.com/cards/search?q=name%3A';
const header = {"User-Agent": "*/*", Accept: "application/json"};
//variabels and handlers for the html page.
const searchVal = document.getElementById('searchVal');
const searchGo = document.getElementById('searchGo');
const resultPanel = document.getElementById('searchResults');


//function to handle the button click
const doSearch = async (e) => {
    //concat the url search   
    const endpoint = `${url}${searchVal.value}`;
    let returnVal;

    //Fetch the things
    const doFetch = await fetch(endpoint, header);
    if (doFetch.ok){
        returnVal = await doFetch.json();
    } else { throw new Error("Get shit on, Idiot!");}
    console.log(returnVal);
    doDom(returnVal);
    
}
searchGo.addEventListener('click',doSearch);



const doDom = async (list) => {

    resultPanel.replaceChildren();

    list["data"].forEach((element) => {
    let imgSrc;
    const newImg = document.createElement('img');
    if ( element["image_uris"]){
        imgSrc = element["image_uris"]["normal"];
    } else if (element["card_faces"]){
       imgSrc = element["card_faces"][0]["image_uris"]["normal"];
    } else {
        console.log("Idk what to tell ya man... shit's fucked");
        return;
    }

    newImg.setAttribute('src', imgSrc);
    newImg.setAttribute('class', 'resultImg');
    resultPanel.appendChild(newImg);   
});
}