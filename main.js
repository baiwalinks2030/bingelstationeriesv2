
let carts = document.querySelectorAll('.add-to-cart');
// console.log(firestore,'rrr')
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
    },
    {
        name: 'Activity  Book',
        tag: 'activitybook1',
        price: 749.99,
        inCart: 0
    },
    {
        name: 'Story Book',
        tag: 'storybook4',
        price: 599.99,
        inCart: 0
    },
    {
        name: 'Educational Book',
        tag: 'educationalbook1',
        price: 599.99,
        inCart: 0
    },
    {
        name: 'History  Book',
        tag: 'historybook2',
        price: 749.99,
        inCart: 0
    },
    {
        name: 'Game  Book',
        tag: 'gamebook1',
        price: 799.99,
        inCart: 0
    },
    {
        name: 'Marker  Pen',
        tag: 'markerpen1',
        price: 1999.99,
        inCart: 0
    },
    {
        name: 'Marker  Pen',
        tag: 'markerpen2',
        price: 1999.99,
        inCart: 0
    },
    {
        name: 'Pencil  Colors',
        tag: 'pencilcolor1',
        price: 999.99,
        inCart: 0
    },
    {
        name: 'Educational  Toys',
        tag: 'educationaltoy1',
        price: 8499.99,
        inCart: 0
    },
    {
        name: 'Educational  Toys',
        tag: 'educationaltoy2',
        price: 7499.99,
        inCart: 0
    },
    {
        name: 'Educational  Toys',
        tag: 'educationaltoy3',
        price: 7499.99,
        inCart: 0
    },
    {
        name: 'Educational  Toys',
        tag: 'educationaltoy4',
        price: 8499.99,
        inCart: 0
    },
    {
        name: 'Notepad',
        tag: 'notepad1',
        price: 349.99,
        inCart: 0
    },
    {
        name: 'Notepad',
        tag: 'notepad2',
        price: 349.99,
        inCart: 0
    },
    {
        name: 'Notepad',
        tag: 'notepad3',
        price: 499.99,
        inCart: 0
    },
    {
        name: 'Notepad',
        tag: 'notepad4',
        price: 499.99,
        inCart: 0
    },
    {
        name: 'Notepad',
        tag: 'notepad5',
        price: 349.99,
        inCart: 0
    },
    {
        name: 'Notepad',
        tag: 'notepad6',
        price: 499.99,
        inCart: 0
    }
];

// Adding Numbers of Carts 
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

//Add it to existing one on cart
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}

//The function of counting it and its DOM
function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers');
        
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;    
    } else {
        localStorage.setItem('cartNumbers', 1); 
        document.querySelector('.cart span').textContent = 1;   
    }

    setItems(product)
    
}

//Adding Total of Carts of all
function setItems(product){
     let cartItems = localStorage.getItem('productsInCart');
     cartItems = JSON.parse(cartItems);
    
     if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
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
    

    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
    }

    //Total Cost
function totalCost(product) {
    console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
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

    console.log(cartItems);
    if (!cartItems || Object.keys(cartItems).length === 0) {
        productContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else if (cartItems && productContainer) {
        productContainer.innerHTML = ''; }
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map((item,idx) => {
            console.log(item)
            productContainer.innerHTML += `
            <div class="item">
            <div class="product">
                <ion-icon name="close-circle" onclick = "remove(${idx})"></ion-icon>
                <img src="./img/${item.tag}.jpg" width="10%">
                
                <span>${item.name}</span>
            </div> 
            <div class="price">${item.price}</div> 
            <div class="quantity">
            <ion-icon name="chevron-back-circle" onclick = "reduce(${idx})"></ion-icon>
                <span>${item.inCart}</span>
            
                <ion-icon name="chevron-forward-circle" onclick="add(${idx})"></ion-icon>
            </div>
            <div class="total">
                ₦${item.inCart * item.price}
            </div>
            </div>
            `
        });
        
        productContainer.innerHTML += `
            <div class ="basketTotalContainer">
                <h4 class = "basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class = "basketTotal">
                    ₦${cartCost}
                </h4>
            </div>
            <div class="ctnn">
            <a  onclick="payWithPaystack()" ">Pay Now</a>
            </div>
        `;
    }
    
}
// to add quantiy
let add = (index)=>{
    // Getting value from an local storage
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
// u used nested object to store data so i break it into single object by TRANSFORMING THE OBJECT INTO AN ARRAY AN
// ARRAY OF OBJECT AND GETTING EACH ARRAY USING  their index 
    if (cartItems && Object.values(cartItems)[index]) {
 // i have access to each object I.E each Cart Item;
      const item = Object.values(cartItems)[index];
      item.inCart += 1;
      totalCost(products[index]);
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      productNumbers = parseInt(productNumbers, 10) + 1;
      localStorage.setItem('cartNumbers', productNumbers);
      document.querySelector('.cart span').textContent = productNumbers;
     
    //   TO RENDER THE CART
      displayCart();
    }  
 
     
}
// TO REDUCE QUANTITY
let reduce = (index)=>{
    // GETTING VALUE FROM LS
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    let productNumbers = localStorage.getItem('cartNumbers');
    if (cartItems && Object.values(cartItems)[index]) {
    
      const item = Object.values(cartItems)[index];
    //   CHECKING IF QUANTITY IS ZERO TO DELETE AN ITEM
      if(item.inCart <= 1){
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        delete cartItems[item.tag]
      }else{
        item.inCart -= 1;
        console.log("mmmmm")
        document.querySelector('.cart span').textContent = productNumbers - 1;   
        localStorage.setItem('cartNumbers', productNumbers - 1);
         }
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      localStorage.setItem("totalCost", cartCost - item.price);
      displayCart();
    }  
 
     
}
// TO REMOVE ITEM

let remove = (index) => {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartItems && Object.values(cartItems)[index]) {
        const item = Object.values(cartItems)[index];
        const itemQuantity = item.inCart;
        localStorage.setItem("totalCost", cartCost - item.price * itemQuantity);
        delete cartItems[item.tag];
        productNumbers -= itemQuantity;

        if (productNumbers <= 0) {
            localStorage.removeItem('cartNumbers');
            localStorage.removeItem('totalCost');
            localStorage.removeItem('productsInCart');
        } else {
            localStorage.setItem('cartNumbers', productNumbers);
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        }

        document.querySelector('.cart span').textContent = productNumbers || '0';
        displayCart();
    }
}

const clearItem=()=>{
    localStorage.clear()
}


function payWithPaystack() {
    var cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost); // Convert to an integer
    var handler = PaystackPop.setup({ 
        key: 'pk_test_9b8ca4e047b4249848c7641e50054355f2c2fe1a', //put your public key here
        email: 'customer@email.com', //put your customer's email here
        amount: cartCost * 100, //amount the customer is supposed to pay
        metadata: {
            custom_fields: [
                {
                    display_name: "Mobile Number",
                    variable_name: "mobile_number",
                    value: "+2348012345678" //customer's mobile number
                }
            ]
        },
        callback: function (response) {
            clearItem()
            window.location.reload()
            //after the transaction have been completed
            //make post call  to the server with to verify payment 
            //using transaction reference as post data
            $.post("verify.php", {reference:response.reference}, function(status){
                if(status == "success")
                    //successful transaction
                    alert('Transaction was successful');
                    
                else
                    //transaction failed
                    alert(response);
            });
        },
        onClose: function () {
            //when the user close the payment modal
            alert('Transaction cancelled');
        }
    });
    handler.openIframe(); //open the paystack's payment modal
}


// I CALLED THE FUNTIONS USING ONCLICK EVENT LISTENER IN UR STRING LITERAL ON THE BUTTONS
onLoadCartNumbers();
displayCart();

