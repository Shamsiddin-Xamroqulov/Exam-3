let elTemplate = document.querySelector(".js-template")?.content;
let elList = document.querySelector(".js-list");
let elDarkBtnOne = document.querySelector(".js-dark-btn");
let elSearchInput = document.querySelector(".js-input");
let elFilterSelect = document.querySelector(".js-filter-select");
let elRegionSelect = document.querySelector(".js-filter-select-two");
let elBtn = document.querySelector(".js-btn-container");

let counter = 1;
let countries = [];

(async function () {
    let req = await fetch("https://restcountries.com/v3.1/all");
    let res = await req.json();
    countries = res;
    handleRenderPage(counter);
})();

function handleRenderElement(arr) {
    if (!elList || !elTemplate) return;
    const docFrag = document.createDocumentFragment();
    elList.innerHTML = '';

    arr.forEach((country) => {
        let clone = elTemplate.cloneNode(true);
        clone.querySelector('.js-flag-img').src = country.flags.png;
        clone.querySelector(".js-title").textContent = country.name.common;
        clone.querySelector(".js-population").textContent = country.population;
        clone.querySelector(".js-region").textContent = country.region;
        clone.querySelector(".js-capital").textContent = country.capital;
        clone.querySelector('.countryContainer').setAttribute('data-country', JSON.stringify(country));

        clone.querySelector('.countryContainer').addEventListener('click', (evt) => {
            const countryData = JSON.parse(evt.currentTarget.getAttribute('data-country'));
            localStorage.setItem('selectedCountry', JSON.stringify(countryData));
            window.location.href = 'country-detail.html';
        });

        docFrag.append(clone);
    });
    elList.append(docFrag);
}

function handleRenderPage(counter) {
    const newData = countries.slice((counter * 20) - 20, counter * 20);
    handleSearchAndFilter(newData);
}

function handleSearchAndFilter(pageData) {
    const searchValue = elSearchInput?.value.toLowerCase() || "";
    const sortValue = elFilterSelect?.value || "";
    const regionValue = elRegionSelect?.value || "";
    let filteredCountries = [...pageData];

    if (sortValue === "A-z") {
        filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortValue === "Z-a") {
        filteredCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
    } else if (sortValue === "Max-Population") {
        filteredCountries.sort((a, b) => b.population - a.population);
    } else if (sortValue === "Min-Population") {
        filteredCountries.sort((a, b) => a.population - b.population);
    }
    if (regionValue) {
        filteredCountries = filteredCountries.filter(country => country.region === regionValue);
    }
    if (searchValue) {
        filteredCountries = filteredCountries.filter(country => country.name.common.toLowerCase().includes(searchValue));
    }
    handleRenderElement(filteredCountries);
}

elSearchInput?.addEventListener("input", () => handleRenderPage(counter));
elFilterSelect?.addEventListener("change", () => handleRenderPage(counter));
elRegionSelect?.addEventListener("change", () => handleRenderPage(counter));

elBtn?.addEventListener('click', (evt) => {
    if (evt.target.matches('.js-next-btn')) {
        const maxList = Math.ceil(countries.length / 20);
        counter = counter === maxList ? maxList : ++counter;
        handleRenderPage(counter);
    }
    if (evt.target.matches('.js-prev-btn')) {
        if (counter > 1) {
            counter--;
            handleRenderPage(counter);
        }
    }
});

window.addEventListener("DOMContentLoaded", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "Qora") {
        document.body.classList.add("js-body");
        elDarkBtnOne.innerHTML = "<i class='bx bx-sun'></i> Light Mode";
    } else {
        elDarkBtnOne.innerHTML = "<i class='bx bx-moon'></i> Dark Mode";
    }
});

elDarkBtnOne?.addEventListener("click", () => {
    document.body.classList.toggle("js-body");
    if (document.body.classList.contains("js-body")) {
        localStorage.setItem("theme", "Qora");
        elDarkBtnOne.innerHTML = "<i class='bx bx-sun'></i> Light Mode";
    } else {
        localStorage.setItem("theme", "Oq");
        elDarkBtnOne.innerHTML = "<i class='bx bx-moon'></i> Dark Mode";
    }
});
