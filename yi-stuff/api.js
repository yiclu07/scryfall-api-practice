const url = "https://api.scryfall.com/cards/search?q=name%3A";
const header = { "User-Agent": "*/*", Accept: "application/json" };

const cardSearchField = document.getElementById("card-search-text");
const cardSearchFieldBtn = document.getElementById("card-search-text-btn");

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
};

cardSearchFieldBtn.addEventListener("click", handleCardSearch);
