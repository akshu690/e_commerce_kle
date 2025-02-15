const products = [
    {id:1,name:"Laptop",Image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQH1rRFmRgiez73UJkMz0COaWnGDu2LDWRjngt0bqn0MgywI2JB2cdb30pBGMa_FJ8DIPk3a--e2cCU_gGpVlRVVPX6PFt9K3kH6UQ2raHpjVNDahQv4BLNXg&usqp=CAc",price:7500},
    {id:2,name:"Watch",Image:"https://m.media-amazon.com/images/I/61xvs-2sD0L._AC_SY200_.jpg",price:5000},
    {id:3,name:"Bike",Image:"https://m.media-amazon.com/images/I/71J1hkYYPQL._AC_SY200_.jpg",price:5000},
    {id:4,name:"Teddy",Image:"https://m.media-amazon.com/images/I/51nqXz7iWrL._AC_SY175_.jpg",price:5000},
    {id:5,name:"Mobile",Image:"https://m.media-amazon.com/images/I/414pLp0PVCL._SX300_SY300_QL70_FMwebp_.jpg",price:5000},
    {id:6,name:"Mouse",Image:"https://m.media-amazon.com/images/I/515HYKbqxML._AC_SY200_.jpg",price:5000},
    {id:7,name:"Electronics",Image:"https://m.media-amazon.com/images/G/31/2024/Auto/New_Page/Connecting-mobility._SS300_QL85_.jpg",price:5000},
    {id:8,name:"Bluetooth",Image:"https://m.media-amazon.com/images/I/41umTKqeziL.AC_SX250.jpg",price:5000},
    {id:9,name:"Bear",Image:"https://m.media-amazon.com/images/I/71cIAwHEqqL._AC_UL320_.jpg",price:500},
    {id:10,name:"Laptop",Image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQH1rRFmRgiez73UJkMz0COaWnGDu2LDWRjngt0bqn0MgywI2JB2cdb30pBGMa_FJ8DIPk3a--e2cCU_gGpVlRVVPX6PFt9K3kH6UQ2raHpjVNDahQv4BLNXg&usqp=CAc",price:7500},
    {id:11,name:"Watch",Image:"https://m.media-amazon.com/images/I/61xvs-2sD0L._AC_SY200_.jpg",price:5000},
    {id:12,name:"Bike",Image:"https://m.media-amazon.com/images/I/71J1hkYYPQL._AC_SY200_.jpg",price:5000},
    {id:13,name:"Teddy",Image:"https://m.media-amazon.com/images/I/51nqXz7iWrL._AC_SY175_.jpg",price:5000},
    {id:14,name:"Mobile",Image:"https://m.media-amazon.com/images/I/414pLp0PVCL._SX300_SY300_QL70_FMwebp_.jpg",price:5000},
    {id:15,name:"Mouse",Image:"https://m.media-amazon.com/images/I/515HYKbqxML._AC_SY200_.jpg",price:5000},
    {id:16,name:"Electronics",Image:"https://m.media-amazon.com/images/G/31/2024/Auto/New_Page/Connecting-mobility._SS300_QL85_.jpg",price:5000},
    {id:17,name:"Bluetooth",Image:"https://m.media-amazon.com/images/I/41umTKqeziL.AC_SX250.jpg",price:5000},
    {id:18,name:"Bear",Image:"https://m.media-amazon.com/images/I/71cIAwHEqqL._AC_UL320_.jpg",price:500},
]

//Render Products

function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products. forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML= `
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick= "addToCart(${product.id})">Add to Cart</button>
        `

        container.appendChild(productDiv);
    })   
}
//Search functionality
function searchProducts(query){
    const filterProducts = products.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
   renderProducts(filterProducts,"productList");
}

//Add EventListner to button
document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})
//Sorting
function sortProducts(criteria){
  if(criteria == "price"){
    return products.sort((a,b) => a.price-b.price);
}
return products;
}
//Adding Event listners
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList")
})

//Add  to cart
function addToCart(productId){
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${product.name} is added to cart`)
    renderCart();
}
//Render items in cart

function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML="";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <buttons onclick="removeFromCart(${item.id})">Remove</button>
        `
        container.appendChild(cartDiv);
    })
    renderSubtotal(cart);
}
//Remove From cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart();
}
//Calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
}

if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();