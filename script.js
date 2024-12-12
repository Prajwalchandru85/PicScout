const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = "🌞"; // Switch to light mode
    } else {
        darkModeToggle.textContent = "🌙"; // Switch to dark mode
    }
});
const key = "_pOHsMnioxqOXYabFBuglQZ6IHhz2djtJ-Yov93U7WQ";
const formel = document.querySelector("form");
const input = document.getElementById("search");
const searchres = document.querySelector(".search-results");
const loadmore = document.getElementById("load-more");

let inputdata = "";
let page = 1;

async function searchimgs() {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${key}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchres.innerHTML = "";
        }

        results.map((result) => {
            const searchResult = document.createElement("div");
            searchResult.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "No description";

            const imglink = document.createElement("a");
            imglink.href = result.links.html;
            imglink.target = "_blank";
            imglink.textContent = result.alt_description || "No description available";

            searchResult.appendChild(image);
            searchResult.appendChild(imglink);
            searchres.appendChild(searchResult);
        });

        if (results.length > 0) {
            loadmore.style.display = "block";
            page++;
        } else {
            loadmore.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

formel.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    inputdata = input.value;
    searchimgs();
});

loadmore.addEventListener("click", () => {
    searchimgs();
});