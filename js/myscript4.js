
function readCart() {
    var data = localStorage.getItem("cart");

    if (data == null || data == "") {
        return [];
    }

    var cart = JSON.parse(data);

    if (Array.isArray(cart) == false) {
        return [];
    }

    return cart;
}

//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------
// SAVE CART
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------


function convertPrice(price) {
    if (price == null || price == undefined) {
        return 0;
    }

    price = price.toString();
    price = price.replace("تومان", "");
    price = price.split(",").join("");
    price = price.trim();

    return Number(price);
}


function showCartCount() {
    var cart = readCart();

    var count1 = document.getElementById("shopcart-count");

    if (count1 != null) {
        count1.innerHTML = "(" + cart.length + ")";
    }

    var count2 = document.getElementById("shopcart-count2");

    if (count2 != null) {
        count2.innerHTML = cart.length;
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

//  PRODUCT
var priceList = document.getElementById("price-list");

if (priceList != null) {
    priceList.onclick = function (event) {
        var element = event.target;

        if (element.className == "size") {
            var url = new URL(window.location.href);

            var groupId = url.searchParams.get("group");
            var productId = url.searchParams.get("product");

            var selectedSize = element.innerHTML.trim();

            var selectedPrice = 0;

            var li = element.parentElement;

            var priceBox =
                li.getElementsByClassName("price")[0];

            if (priceBox != undefined) {
                var prices =
                    priceBox.getElementsByTagName("span");

                if (prices.length > 0) {
                    var priceText =
                        prices[prices.length - 1].innerHTML;

                    selectedPrice =
                        convertPrice(priceText);
                }
            }

            var productName = "";

            var title =
                document.getElementById("food-title3");

            if (title != null) {
                productName =
                    title.innerHTML.trim();
            }

            var productImage = "";

            var largeImage =
                document.getElementById("large-image");

            if (largeImage != null) {
                var images =
                    largeImage.getElementsByTagName("img");

                if (images.length > 0) {
                    productImage =
                        images[0].getAttribute("src");
                }
            }

            var cart = readCart();

            var found = false;

            for (var i = 0; i < cart.length; i++) {
                if (
                    cart[i].group_id == groupId &&
                    cart[i].product_id == productId &&
                    cart[i].product_type == selectedSize
                ) {
                    cart[i].quantity =
                        Number(cart[i].quantity) + 1;

                    if (cart[i].quantity > 20) {
                        cart[i].quantity = 20;
                    }

                    found = true;

                    break;
                }
            }

            if (found == false) {
                var product = {
                    group_id: groupId,
                    product_id: productId,
                    product_name: productName,
                    product_type: selectedSize,
                    product_price: selectedPrice,
                    product_image: productImage,
                    quantity: 1
                };

                cart.push(product);
            }

            saveCart(cart);

            showCartCount();
        }
    };
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------


var plus = document.getElementById("plus");

if (plus != null) {
    plus.onclick = function () {
        var number =
            document.getElementById("number");

        if (number != null) {
            var value =
                Number(number.value);

            if (value < 20) {
                number.value = value + 1;
            }
        }
    };
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------


var minus = document.getElementById("minus");

if (minus != null) {
    minus.onclick = function () {
        var number =
            document.getElementById("number");

        if (number != null) {
            var value =
                Number(number.value);

            if (value > 1) {
                number.value = value - 1;
            }
        }
    };
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

// CART
function showCart() {
    var table =
        document.getElementById("shopcart-table");

    if (table == null) {
        return;
    }

    var cart = readCart();

    table.innerHTML = "";

    var totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {
        var price =
            Number(cart[i].product_price);

        if (isNaN(price)) {
            price = 0;
        }

        var quantity =
            Number(cart[i].quantity);

        if (isNaN(quantity)) {
            quantity = 1;
        }

        var itemTotal =
            price * quantity;

        totalPrice =
            totalPrice + itemTotal;

        var image = "";

        if (cart[i].product_image != undefined) {
            image = cart[i].product_image;
        }

        var name = "";

        if (cart[i].product_name != undefined) {
            name = cart[i].product_name;
        }

        var type = "";

        if (cart[i].product_type != undefined) {
            type = cart[i].product_type;
        }



        var tr = document.createElement("tr");



        var td1 = document.createElement("td");
        td1.classList.add("td-1");

        var div = document.createElement("div");
        div.classList.add("number");

        var spanPlus = document.createElement("span");

        spanPlus.setAttribute(
            "id",
            "plus_" + i
        );

        spanPlus.setAttribute(
            "onclick",
            "plusNumber(" + i + ")"
        );

        var input = document.createElement("input");

        input.setAttribute(
            "type",
            "number"
        );

        input.setAttribute(
            "id",
            "number_" + i
        );

        input.setAttribute(
            "data-zeros",
            "true"
        );

        input.setAttribute(
            "value",
            quantity
        );

        input.setAttribute(
            "min",
            "1"
        );

        input.setAttribute(
            "max",
            "20"
        );

        input.setAttribute(
            "readonly",
            ""
        );

        var spanMinus =
            document.createElement("span");

        spanMinus.setAttribute(
            "id",
            "minus_" + i
        );

        spanMinus.setAttribute(
            "onclick",
            "minusNumber(" + i + ")"
        );

        div.appendChild(spanPlus);
        div.appendChild(input);
        div.appendChild(spanMinus);

        td1.appendChild(div);


        // IMAGES
        var td2 = document.createElement("td");

        td2.classList.add("td-2");

        var img = document.createElement("img");

        img.setAttribute(
            "src",
            image
        );

        img.setAttribute(
            "alt",
            ""
        );

        img.setAttribute(
            "width",
            "130"
        );

        img.setAttribute(
            "height",
            "130"
        );

        td2.appendChild(img);



        var td3 = document.createElement("td");

        td3.classList.add("td-3");

        td3.appendChild(
            document.createTextNode(name)
        );
        var br =
            document.createElement("br");
        td3.appendChild(br);
        var spanType =
            document.createElement("span");

        spanType.appendChild(
            document.createTextNode(type)
        );

        td3.appendChild(spanType);
        var td4 = document.createElement("td");
        td4.classList.add("td-4");
        td4.appendChild(
            document.createTextNode(
                price.toLocaleString() +
                " تومان"
            )
        );

        var td5 = document.createElement("td");

        td5.classList.add("td-5");

        td5.appendChild(
            document.createTextNode(
                quantity +
                " عدد"
            )
        );

        var td6 = document.createElement("td");

        td6.classList.add("td-6");

        var a =
            document.createElement("a");

        a.setAttribute(
            "onclick",
            "removeFromMemory(" + i + ")"
        );

        a.setAttribute(
            "style",
            "cursor:pointer;"
        );

        var icon =
            document.createElement("i");

        icon.classList.add("fa");
        icon.classList.add("fa-times");

        a.appendChild(icon);
        td6.appendChild(a);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        table.appendChild(tr);
    }

    var total =
        document.getElementById("total-price");

    if (total != null) {
        total.innerHTML =
            totalPrice.toLocaleString();
    }

    showCartCount();
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------


function plusNumber(index) {
    var cart = readCart();

    if (cart[index] != undefined) {
        var quantity =
            Number(cart[index].quantity);

        if (quantity < 20) {
            cart[index].quantity =
                quantity + 1;
        }
    }

    saveCart(cart);

    showCart();
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------


function minusNumber(index) {
    var cart = readCart();

    if (cart[index] != undefined) {
        var quantity =
            Number(cart[index].quantity);

        if (quantity > 1) {
            cart[index].quantity =
                quantity - 1;
        }
    }

    saveCart(cart);

    showCart();
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------

// REMOVE ITEM
function removeFromMemory(index) {
    var cart = readCart();

    if (cart[index] != undefined) {
        cart.splice(index, 1);
    }

    saveCart(cart);

    showCartCount();

    showCart();
}


//-----------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------



showCartCount();

showCart();

window.onpageshow = function () {
    showCartCount();
    showCart();
};