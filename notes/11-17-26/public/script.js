let formElement = document.querySelector("#formElement");

formElement.addEventListener("submit", async (e) => {
    
    e.preventDefault();

    let response = await fetch("/gemini");
    let data = await response.json();

    console.log(data.geminiText);

    document.querySelector("body").innerHTML = data.geminiText

});