let elListCountry = document.querySelector('.botmTexOne');
let elBackBtn = document.querySelector('.backBtn');
let elDarkBtn = document.querySelector('.js-dark-btn');
let countryData = JSON.parse(localStorage.getItem('selectedCountry'));

if (countryData) {
    document.querySelector('.country-native-name').textContent = countryData.name.official;
    document.querySelector('.country-sub-region').textContent = countryData.continents;
    document.querySelector('.lvlDomain').textContent = countryData.tld;
    document.querySelector('.country-flag').src = countryData.flags.png;
    document.querySelector('.country-name').textContent = countryData.name.common;
    document.querySelector('.country-population').textContent = countryData.population;
    document.querySelector('.country-region').textContent = countryData.region;
    document.querySelector('.country-capital').textContent = countryData.capital;

    let currenciesArray = Object.values(countryData.currencies || {}).map(currency => currency.name);
    document.querySelector('.currencies').textContent = currenciesArray.join(', ');
    let languagesArray = Object.values(countryData.languages || {});
    document.querySelector('.languages').textContent = languagesArray.join(', ');
} else {
    document.body.innerHTML = '<h1>No country data found</h1>';
}

let handleRenderBorderCountrys = async (arr) => {
    if (!elListCountry) return;
    elListCountry.innerHTML = "";
    let docFragment = document.createDocumentFragment();
    if (arr?.length) {
        arr.forEach((countryCode) => {
            let newListItem = document.createElement("li");
            newListItem.classList.add("botmTexTwo");
            newListItem.textContent = countryCode;
            docFragment.append(newListItem);
        });
        elListCountry.append(docFragment);
    }
};
handleRenderBorderCountrys(countryData.borders || []);

elBackBtn?.addEventListener("click", () => {
    window.location.href = 'index.html';
});

window.addEventListener("DOMContentLoaded", () => {
    let theme = localStorage.getItem("theme") || "Oq";
    if (theme === "Qora") {
        document.body.classList.add("js-country-body");
        elDarkBtn.innerHTML = "<i class='bx bx-sun'></i> Light Mode";
    } else {
        elDarkBtn.innerHTML = "<i class='bx bx-moon'></i> Dark Mode";
    }
});

elDarkBtn?.addEventListener("click", () => {
    document.body.classList.toggle("js-country-body");
    if (document.body.classList.contains("js-country-body")) {
        localStorage.setItem("theme", "Qora");
        elDarkBtn.innerHTML = "<i class='bx bx-sun'></i> Light Mode";
    } else {
        localStorage.setItem("theme", "Oq");
        elDarkBtn.innerHTML = "<i class='bx bx-moon'></i> Dark Mode";
    }
});
