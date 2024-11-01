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

    //Fetch the things assign values to returnVal. 
    const doFetch = await fetch(endpoint, header);
    if (doFetch.ok){
        returnVal = await doFetch.json();
    } else { 
        const errMsg = document.createElement('h1');
        errMsg.innerHTML = "No cards were found";
        resultPanel.appendChild(errMsg);
        throw new Error("Get shit on, Idiot!");
    }

    console.log(returnVal);

    //calls the function for dom manipulation
    doDom(returnVal);
    
}
//Need to add event listener after the function because doSearch is declared there
searchGo.addEventListener('click',doSearch);

//Function to execute the dom manipulation
const doDom = async (list) => {

    //Clears the result panel every time to "refresh" the data
    resultPanel.replaceChildren();

    //forEach will loop through all elements of the list and execute the following code
    list["data"].forEach((element, i) => {

    let imgSrc;

    //creates the html img element 
    const newImg = document.createElement('img');

    if ( element["image_uris"]){
        imgSrc = element["image_uris"]["normal"];
    } else if (element["card_faces"]){
       imgSrc = element["card_faces"][0]["image_uris"]["normal"];
       newImg.addEventListener('click', () => {
            const newVar = newImg.src === element.card_faces[0]["image_uris"]["normal"] ? element.card_faces[1]["image_uris"]["normal"] : element.card_faces[0]["image_uris"]["normal"];
            newImg.setAttribute('src', newVar);
       });
       newImg.classList.add('double-sided');
    } else {
        console.log("Idk what to tell ya man... shit's fucked");
        return;
    }

    //assigns the proper img src to the previously created img element
    //then assigns the resultImg class and appends the img element to the result panel
    newImg.setAttribute('alt', element['name']);
    newImg.setAttribute('src', imgSrc);
    newImg.classList.add('resultImg');
    resultPanel.appendChild(newImg);   
});
}