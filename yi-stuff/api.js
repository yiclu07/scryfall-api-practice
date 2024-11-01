const url = "https://api.scryfall.com/cards/search?q=name%3A";
const header = { "User-Agent": "*/*", Accept: "application/json" };

const cardSearchField = document.getElementById("card-search-text");
const cardSearchFieldBtn = document.getElementById("card-search-text-btn");
const cardContainer = document.getElementById("card-container");

const fetchCards = async (e) => {
  if (cardSearchField.value == "") {
    alert("Please enter a search term!");
    return;
  }

  try {
    const response = await fetch(`${url}${cardSearchField.value}`, header);

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {
    console.log(error);
  }
};

const handleCardSearch = async (e) => {
  const cardsData = await fetchCards();
  console.log(cardsData);

  if (cardsData) {
    cardContainer.replaceChildren();

    cardsData.data.forEach((element) => {
      const newImg = document.createElement("img");

      if (element["image_uris"]) {
        newImg.setAttribute("src", element["image_uris"]["normal"]);
      } else if (element["card_faces"]) {
        const frontFaceImgSrc =
          element["card_faces"][0]["image_uris"]["normal"];
        const backFaceImgSrc = element["card_faces"][1]["image_uris"]["normal"];

        // Add class to indicate the card is double-faced
        newImg.classList.add("double-faced");

        newImg.setAttribute("src", frontFaceImgSrc);

        newImg.addEventListener("click", (e) => {
          const newSrc =
            newImg.src === frontFaceImgSrc ? backFaceImgSrc : frontFaceImgSrc;
          newImg.setAttribute("src", newSrc);
        });
      }
      newImg.classList.add("result-image");
      cardContainer.appendChild(newImg);
    });
  }
};

cardSearchFieldBtn.addEventListener("click", handleCardSearch);
