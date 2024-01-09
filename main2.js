let carts = document.querySelectorAll('.add-to-cart');

let products = [
    {
        name: 'Story Book',
        tag: 'storybook1',
        price: 599.99,
        inCart: 0
    },
    {
        name: 'Story Book',
        tag: 'storybook2',
        price: 599.99,
        inCart: 0
    },
    {
        name: 'Story Book',
        tag: 'storybook3',
        price: 599.99,
        inCart: 0
    },
    {
        name: 'History  Book',
        tag: 'historybook1',
        price: 749.99,
        inCart: 0
    }
];

// Add click listeners to the carts
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
        
    productNumbers = parseFloat(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;    
    } else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1;   
    }

    setItems(product);    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).forEach((item, index) => {
            productContainer.innerHTML += `
                <div class="product">
                    <button onclick="removeItem(${index})" style="border: none; background: none;">
                        <ion-icon name="close-circle"></ion-icon>
                    </button>
                    <img src="./img/${item.tag}.jpeg" width="10%"> ||
                    <span>${item.name}</span>
                </div> 
                <div class="price">${item.price}</div> 
                <div class="quantity">
                    <ion-icon name="chevron-back-circle"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="chevron-forward-circle"></ion-icon>
                </div>
                <div class="total">
                    ₦${item.inCart * item.price}
                </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    ₦${cartCost}
                </h4>
            </div>
        `;
    }
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let cartCost = localStorage.getItem('totalCost');

    let productToRemove = Object.values(cartItems)[index];

    cartCost -= productToRemove.inCart - productToRemove.price;
    localStorage.setItem('totalCost', cartCost);

    delete cartItems[productToRemove.tag];
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));

    displayCart();
}

onLoadCartNumbers();
displayCart();
