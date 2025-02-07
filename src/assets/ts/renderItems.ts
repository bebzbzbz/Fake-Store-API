import ky from "ky";
import { addToCart } from "./cart";
import { z } from "zod";

const itemArea = document.querySelector("#item-area");

// export type ItemData = {
//     cartId: number,
//     id: number,
//     title: string,
//     price: number,
//     description: string,
//     category: string,
//     image: string
// }

let allItems : ItemData[] = [];
let filteredItems = [];

const ItemDataSchema = z.object({
    cartId: z.number().optional(),
    id: z.number(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.string()
})

export type ItemData = z.infer<typeof ItemDataSchema>;

async function loadData() {
    if(itemArea) {
        try {
            const allItems = await ky.get("https://fakestoreapi.com/products").json();
            const parseItemData = ItemDataSchema.array().parse(allItems);

            renderItems(parseItemData);
            filteredItems = [...parseItemData];
        } catch (error) {
            itemArea.textContent = "Something went wrong. Errorcode: " + error;
        }
    } else {
        console.log("Element not found");
    }
}
loadData();

// ==== RENDER FUNCTION ====

function renderItems(dataArray : ItemData[]) {
    itemArea!.innerHTML = "";

    dataArray.forEach((item) => {
        const newItemWrapper = document.createElement("div");
        itemArea!.appendChild(newItemWrapper);
        newItemWrapper.classList.add("item");

        const newItemImg = document.createElement("img");
        newItemImg.setAttribute("src", item.image);
        newItemWrapper.appendChild(newItemImg);

        const newTitle = document.createElement("h3");
        newTitle.textContent = item.title;
        newItemWrapper.appendChild(newTitle)

        const newPrice = document.createElement("p")
        newPrice.textContent = `${item.price} €`
        newItemWrapper.appendChild(newPrice);
        newPrice.classList.add("price")

        // ==== ADD TO CART EVENTLISTENER ====

        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to cart";
        newItemWrapper.appendChild(addToCartBtn);
        addToCartBtn.classList.add("add-to-cart-btn")

        addToCartBtn.addEventListener("click", () => {
            addToCart(item);
        });
    });
}

export { allItems, filteredItems, renderItems }