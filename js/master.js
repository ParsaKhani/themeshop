//slider
function StartSlider(sliderClassName) {
    this.slider = document.querySelector("." + sliderClassName);
    this.slideWidth = this.slider.children[0].offsetWidth;
    this.slider.style.position = "relative";
    this.sliderViewNumber = function() {
        for (var i in this.slider.children) {
            if (Math.abs(this.slider.children[i].offsetLeft - this.slider.offsetWidth) < 10) {
                return new Number(i);
            }
        }
    };
    this.sliderLength = this.slider.children.length;
    this.appendChild = function() {
        for (var i = 0; i < this.sliderViewNumber(); i++) {
            var firstCln = this.slider.children[i].cloneNode(true);
            this.slider.appendChild(firstCln);
            this.sliderLength++;
        }
    };
    this.insertBefore = function() {
        for (var i = 0; i < this.sliderViewNumber(); i++) {
            var lastCln = this.slider.children[this.slider.children.length - 1 - this.sliderViewNumber() - i].cloneNode(true);
            this.slider.insertBefore(lastCln, this.slider.children[0]);
            this.sliderLength++;
        }
    };
    this.moveX = -this.slideWidth * this.sliderViewNumber();
    this.slider.style.transform = "translateX(" + this.moveX + "px)";
    this.rightArrow = document.querySelector("." + sliderClassName + "-right-angle");
    this.leftArrow = document.querySelector("." + sliderClassName + "-left-angle");
    var self = this;
    this.moveToRight = function() {
        this.leftArrow.addEventListener("click", function() {
            if (self.moveX !== 0) {
                self.moveX += self.slideWidth;
                self.slider.style.transform = "translateX(" + self.moveX + "px)";
                self.slider.style.transition = "0.5s";
            }
        });
    };
    this.moveToLeft = function() {
        this.rightArrow.addEventListener("click", function() {
            if (Math.abs(self.moveX) < self.slideWidth * (self.sliderLength - self.sliderViewNumber())) {
                self.moveX -= self.slideWidth;
                self.slider.style.transform = "translateX(" + self.moveX + "px)";
                self.slider.style.transition = "transform 0.5s";
                console.log("moveX is : " + self.moveX);
                console.log(self.slideWidth * (self.sliderLength - self.sliderViewNumber()));
            }
        });
    };

    this.getBack = function() {
        this.slider.addEventListener("transitionend", function() {
            self.slider.style.transition = "transform " + 0 + "s";
            if (Math.abs(self.moveX) === self.slideWidth * (self.sliderLength - self.sliderViewNumber())) {
                self.moveX = -(self.slideWidth * self.sliderViewNumber());
                self.slider.style.transform = "translateX(" + self.moveX + "px)";
            } else if (self.moveX === 0) {
                self.moveX = -(self.sliderLength - 2 * self.sliderViewNumber()) * self.slideWidth;
                self.slider.style.transform = "translateX(" + self.moveX + "px)";
            }
        });
    };
}
var newItemsSlider = new StartSlider("slider");
newItemsSlider.appendChild();
newItemsSlider.insertBefore();
newItemsSlider.moveToRight();
newItemsSlider.moveToLeft();
newItemsSlider.getBack();
var recentlyViewedSlider = new StartSlider("recently-slider");
recentlyViewedSlider.appendChild();
recentlyViewedSlider.insertBefore();
recentlyViewedSlider.moveToRight();
recentlyViewedSlider.moveToLeft();
recentlyViewedSlider.getBack();
var logosSlider = new StartSlider("logos-slider");
logosSlider.appendChild();
logosSlider.insertBefore();
logosSlider.moveToRight();
logosSlider.moveToLeft();
logosSlider.getBack();
var newsSlider = new StartSlider("news-slider");
newsSlider.appendChild();
newsSlider.insertBefore();
newsSlider.moveToRight();
newsSlider.moveToLeft();
newsSlider.getBack();
// shopping basket
var productsData = [{
        id: 1,
        brand: "road",
        title: "Lorem ipsum dolor sit",
        price: "$700",
        img: "./images/ski-equipment.png"
    },
    {
        id: 2,
        brand: "adidas",
        title: "Lorem ipsum dolor sit",
        price: "$599",
        img: "./images/ski-equipment2.png"
    },
    {
        id: 3,
        brand: "track",
        title: "Lorem ipsum dolor sit",
        price: "$599",
        img: "./images/ski-equipment2.png"
    },
    {
        id: 4,
        brand: "nike",
        title: "Lorem ipsum dolor sit",
        price: "$999",
        img: "./images/ski-equipment2.png"
    },
    {
        id: 5,
        brand: "adidas",
        title: "Lorem ipsum dolor sit",
        price: "$699",
        img: "./images/ski-equipment2.png"
    }
];
function checkId(id) {
    for (var i in productsData) {
        if (productsData[i].id === id) {
            return i;
        }
    }
}
var TotalQuantity = 0;
function shoppingBasket(clickedElement , id) {
    TotalQuantity++;
    document.querySelector(".shopping-badge").innerHTML = TotalQuantity;
    var soldProducts = document.querySelector("ul.sold-products");
    if(soldProducts.querySelector(`li[data-id="${id}"`) == null) {
        var newElement = document.createElement("li");
        newElement.setAttribute("data-id", id);
        newElement.setAttribute("data-quantity", 1);
        var obj = productsData[checkId(id)];
        newElement.innerHTML = `
            <div class='product-pic'>
                <img src='${obj.img}' alt='product'>
            </div>
            <div class = 'product-details'>
                <span class='brand'>brand: ${obj.brand}</span>
                <span class='title'>${obj.title}</span>
                <span class='total-price'>total-price: ${obj.price}</span>
                <span class='quantity'>quantity: 1</span>
                <span class='remove' onclick='remove(${id})'>remove</span>
            </div>
        `;
        document.querySelector(".sold-products").appendChild(newElement);
    } else {
        let element = soldProducts.querySelector(`li[data-id="${id}"`);
        let quantity = Number(element.getAttribute("data-quantity"));
        quantity++;
        element.setAttribute("data-quantity", quantity);
        soldProducts.querySelector(`[data-id="${id}"]`).querySelector(".quantity").innerHTML = `quantity: ${quantity}`;
    } 
}
function remove(id) {
    var removeElement = document.querySelector(`li[data-id="${id}"]`);
    TotalQuantity -= removeElement.getAttribute("data-quantity");
    removeElement.parentElement.removeChild(removeElement);
    document.querySelector(".shopping-badge").innerHTML = TotalQuantity;
}
