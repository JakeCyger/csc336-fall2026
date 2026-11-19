let formElement = document.querySelector("#formElement");

formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    // console.log("Form submitted!");

    // let response = await fetch("http://localhost:3000/food?food=burrito&user=Mike");
    // let jsonFromServer = await response.json();
    // console.log(jsonFromServer);

    let foodInput = document.querySelector("#foodInput");
    let userInput = document.querySelector("#userInput");

    let dataFromFrontEnd = {
        food: foodInput.value,
        user: userInput.value
    };

    let response = await fetch("/food", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dataFromFrontEnd)
    });
});