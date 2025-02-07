import { ItemData } from "./renderItems";
import { allItems, renderItems } from "./renderItems";

// ==== FILTERS ====

let filteredItems : ItemData[] = [];

const filterElectro = document.querySelector("#filter-electro");
const filterJewelery = document.querySelector("#filter-jewelery");
const filterWomen = document.querySelector("#filter-women");
const filterMen = document.querySelector("#filter-men");
const filterAll = document.querySelector("#filter-all");

function filterItems(category: string) {
    filteredItems = allItems.filter((item) => {
        return item.category === category;
    })
    renderItems(filteredItems);
};

filterElectro?.addEventListener("click", () => {
    filterItems("electronics")
});
filterJewelery?.addEventListener("click", () => {
    filterItems("jewelery")
});
filterWomen?.addEventListener("click", () => {
    filterItems("women's clothing")
});
filterMen?.addEventListener("click", () => {
    filterItems("men's clothing")
});
filterAll?.addEventListener("click", () => {
    renderItems(allItems);
    filteredItems = [...allItems];
})

// ==== SEARCH BY INPUT ====

const searchInput = document.querySelector<HTMLInputElement>("#search-input");

if(searchInput) {
    searchInput.addEventListener("input", () => {
        const inputValue = searchInput.value;

        filteredItems = allItems.filter((item) => {
            return item.title.toLowerCase().includes(inputValue.toLowerCase());
        });
        renderItems(filteredItems)
    });
}

// ==== SORT BY ====

const sortBySelect = document.querySelector<HTMLSelectElement>("#sort-by");

if(sortBySelect) {
    sortBySelect.addEventListener("change", () => {
        const sortValue = sortBySelect.value;
        let sortedItems : ItemData[] = [];

        if(sortValue === "highest-price") {
            sortedItems = filteredItems.sort((a,b) => b.price - a.price);
        }
        if(sortValue === "lowest-price") {
            sortedItems = filteredItems.sort((a,b) => a.price - b.price);
        }
        if(sortValue === "title-up") {
            sortedItems = filteredItems.sort((a,b) => a.title.localeCompare(b.title));
        }
        if(sortValue === "title-down") {
            sortedItems = filteredItems.sort((a,b) => b.title.localeCompare(a.title));
        }
        renderItems(sortedItems);
    })
}

export { }