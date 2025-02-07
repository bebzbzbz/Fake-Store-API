import { ItemData } from "./renderItems";

// ==== ADD TO CART FUNCTION ====

let cartItems : ItemData[] = [];

const cartList = document.querySelector("#cart-list")
const cartIndexElem = document.querySelector("#cart-index");
const cartIndexWrapper = document.querySelector<HTMLDivElement>("#cart-index-wrapper");

let cartIdNum = 0;

function addToCart(data : ItemData) {
    if(totalElem) {
        const dataWithCartId = {...data,cartId:cartIdNum}
        cartIdNum++;

        cartItems.push(dataWithCartId);
        console.log(cartItems);

        renderCart(cartItems);
        calcTotalInCart(cartItems)
    }
}

function renderCart(dataArray : ItemData[]) {
    if(cartIndexElem && cartIndexWrapper && cartList) {
        cartIndexWrapper.style.display = "flex";
        cartIndexElem.textContent = dataArray.length.toString();
        
        cartList.innerHTML = "";

        dataArray.forEach((item) => {
            const newListItem = document.createElement("li");
            newListItem.innerHTML = `${item.title}<br> — <b>${item.price} €</b>`;
            cartList.appendChild(newListItem);
        
            const newRemoveBtn = document.createElement("button");
            newRemoveBtn.textContent = "×";
            newListItem.appendChild(newRemoveBtn);

            // = REMOVE ITEM FROM CART LISTENER
            newRemoveBtn.addEventListener("click", () => {
                removeItemFromCart(item);
            })
        })
        
    }
}

function removeItemFromCart(data : ItemData) {
    cartItems = cartItems.filter((elem) => elem.cartId !== data.cartId);

    renderCart(cartItems);
    calcTotalInCart(cartItems);
}

const totalElem = document.querySelector("#total");

function calcTotalInCart(dataArray : ItemData[]) {
    let totalSum = 0;

    if(totalElem) {
        if(dataArray.length > 0) {
            dataArray.forEach((item) => {
                totalSum += item.price;
            })
        } else {
            totalSum = 0;
        }

        totalElem.textContent = `Total: ${totalSum.toLocaleString()} €`
    }
}

export {addToCart}