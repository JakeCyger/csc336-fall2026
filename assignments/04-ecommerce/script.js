let spaceCrawlers = [ // All my spacecrawler objects!

    {
        name: "Crawler 18E-47",
        title: "The Edison",
        description: "A small, fast crawler with a sleek and powerful design. Perfect for quick reconnaissance missions and light cargo transport.",
        price: 15000,
        category: "Cruiser",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 16N-43",
        title: "The Newton",
        description: "A versatile and durable crawler with a robust design. Ideal for heavy-duty operations and extended missions.",
        price: 25000,
        category: "Cruiser",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 2A-87",
        title: "The Archimedes",
        description: "A powerful and efficient crawler with a state-of-the-art control system. Perfect for complex missions and high-stakes operations.",
        price: 35000,
        category: "Cruiser",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 18B-47",
        title: "The Bell",
        description: "A large, heavy-duty crawler with a wide and rugged design. Built for extreme conditions and heavy cargo transport.",
        price: 50000,
        category: "Behemoth",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 18C-67",
        title: "The Curie",
        description: "A compact and agile crawler with a sleek and aerodynamic design. Perfect for high-speed missions and rapid response operations.",
        price: 40000,
        category: "Wasp",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 19T-12",
        title: "The Turing",
        description: "A large, highly advanced crawler with cutting-edge technology and a futuristic design. Ideal for research missions and exploration of uncharted territories as a mobile home base.",
        price: 100000,
        category: "Behemoth",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 18T-56",
        title: "The Tesla",
        description: "An experimental high-voltage crawler equipped with specialized energy shielding and precision telemetry systems.",
        price: 45000,
        category: "Wasp",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 15G-64",
        title: "The Galileo",
        description: "A deep-range surveillance crawler built for high-altitude surveying, orbital tracking, and long-range planetary scans.",
        price: 30000,
        category: "Cruiser",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 19F-88",
        title: "The Feynman",
        description: "A compact, highly adaptable utility crawler designed to operate reliably in erratic gravitational fields and extreme weather.",
        price: 28000,
        category: "Wasp",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    },

    {
        name: "Crawler 18M-79",
        title: "The Maxwell",
        description: "A heavily fortified transport unit engineered with electromagnetic reinforcement to endure dense asteroid belts and debris fields.",
        price: 75000,
        category: "Behemoth",
        image: "https://blocks.astratic.com/img/general-img-landscape.png"
    }

];

let categories = ["Cruiser", "Wasp", "Behemoth"];
let filterSelect = document.querySelector("#filterBy");
let option = document.createElement("option");
option.value = "All";
option.textContent = "All";
filterSelect.appendChild(option);

// populate the filter dropdown
categories.forEach(category => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterSelect.appendChild(option);
});

let sortBySelect = document.querySelector("#sortBy");
let root = document.querySelector("#root");
let addSelectedButton = document.querySelector("#addSelected");

// update the add selected button text and disabled status based on checked boxes
function updateAddSelectedButton() {
    let allCards = [...document.querySelectorAll(".crawlerCard")]; // spread node list into an array so we can use filter
    let selectedCards = allCards.filter(card => card.classList.contains("selected"));

    if (selectedCards.length === 0) {
        addSelectedButton.disabled = true;
        addSelectedButton.textContent = "Add Selected to Cart";
    } else {
        addSelectedButton.disabled = false;
        addSelectedButton.textContent = `Add ${selectedCards.length} Item${selectedCards.length > 1 ? "s" : ""} to Cart`; // use ticks to escape the $ sign and use logic to add 's'
    }
}

function applyFilterAndSort() {
    let selectedCategory = filterSelect.value;
    let selectedSort = sortBySelect.value;

    let filtered = spaceCrawlers.filter(crawler => {
        if (selectedCategory === "All") {
            return true;
        }
        return crawler.category === selectedCategory;
    });

    if (selectedSort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "name-asc") {
        filtered.sort(function (a, b) {
            if (a.title > b.title) {
                return 1;
            } else if (a.title < b.title) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    renderCards(filtered);
}

filterSelect.addEventListener("change", applyFilterAndSort);
sortBySelect.addEventListener("change", applyFilterAndSort);

// update cart total function, called everytime a new item is added
function updateCartTotal() {
    let cartEntries = document.querySelectorAll(".cart-entry");
    
    // need to spread node list into an array to use map, pulls price and quantity out of dataset
    // dataset is a way to store my attributes for later use
    let lineTotals = [...cartEntries].map(entry => Number(entry.dataset.lineTotal));
    let quantities = [...cartEntries].map(entry => Number(entry.dataset.quantity));
    
    let totalCost = 0;
    lineTotals.forEach(val => totalCost += val);

    let totalItems = 0;
    quantities.forEach(qty => totalItems += qty);

    document.querySelector("#cartTotal").textContent = `Total: $${totalCost} (${totalItems} item${totalItems !== 1 ? "s" : ""})`;
}

function addToCart(crawlerName, price, quantity) {
    let cart = document.querySelector("#cart");
    
    let cartEntry = document.createElement("div");
    cartEntry.classList.add("cart-entry");
    cartEntry.textContent = `${crawlerName} | $${price} x ${quantity}`;
    cartEntry.dataset.lineTotal = Number(price) * Number(quantity);
    cartEntry.dataset.quantity = Number(quantity);
    
    cart.appendChild(cartEntry);
    updateCartTotal();
}

addSelectedButton.addEventListener("click", () => {
    let allCards = [...document.querySelectorAll(".crawlerCard")]; // spread node list into an array so we can use filter
    let selectedCards = allCards.filter(card => card.classList.contains("selected"));

    selectedCards.forEach(crawlerDiv => {
        let name = crawlerDiv.querySelector(".name").textContent;
        let price = crawlerDiv.querySelector(".price").textContent.replace("$", "");
        let quantity = crawlerDiv.querySelector(".quantity").value;
        
        addToCart(name, price, quantity);

        crawlerDiv.classList.remove("selected");
        crawlerDiv.querySelector(".select").checked = false;
    });

    updateAddSelectedButton();
});

function renderCard(crawler) {
    let card = document.createElement("div");
    card.classList.add("crawlerCard");

    let img = document.createElement("img");
    img.src = crawler.image;
    img.alt = crawler.name;

    let h1 = document.createElement("h1");
    h1.classList.add("name");
    h1.textContent = crawler.name;

    let h2 = document.createElement("h2");
    h2.classList.add("title");
    h2.textContent = crawler.title;

    let desc = document.createElement("p");
    desc.classList.add("description");
    desc.textContent = crawler.description;

    let h3 = document.createElement("h3");
    h3.classList.add("price");
    h3.textContent = `$${crawler.price}`;

    let quantity = document.createElement("input");
    quantity.type = "number";
    quantity.classList.add("quantity");
    quantity.value = 1;
    quantity.min = 1;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("select");

    checkbox.addEventListener("change", (event) => {
        if (event.target.checked) {
            card.classList.add("selected");
        } else {
            card.classList.remove("selected");
        }
        updateAddSelectedButton();
    });

    let addBtn = document.createElement("button");
    addBtn.classList.add("addToCart");
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => {
        addToCart(crawler.name, crawler.price, quantity.value);
    });

    card.append(img, h1, h2, desc, h3, quantity, addBtn, checkbox);
    root.appendChild(card);
}

function renderCards(crawlersToDisplay = spaceCrawlers) {
    root.innerHTML = "";
    crawlersToDisplay.forEach(crawler => renderCard(crawler));
    updateAddSelectedButton();
}

renderCards();