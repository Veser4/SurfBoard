let slider_items = [...document.querySelectorAll('.header-slider__item')];
let slider_circles = [...document.querySelectorAll('.slider-points__circle')];
let slider_points = [...document.querySelectorAll('.slider-points__point')];
let slider_shop = document.querySelector('.shop-slider-content');
let slider_button_next = document.querySelector('.slider-buttons-container__button-next');
let slider_button_back = document.querySelector('.slider-buttons-container__button-back');
let shop_product_count = [...document.querySelectorAll('.product')].length;
let product_features_button = [...document.querySelectorAll('.product-features-button')];
let product_features = [...document.querySelectorAll('.product-features')];
let member_button = [...document.querySelectorAll('.member-button-container')];
let member_info = [...document.querySelectorAll('.member-tracker')];
let member_button_marker = [...document.querySelectorAll('.member-button')]
let menu_blocks = [document.querySelector('.longboard'), document.querySelector('.shortboard'), document.querySelector('.softboard')];
let menu_blocks_button = [...document.querySelectorAll('.image-container')];
let menu_blocks_text = [...document.querySelectorAll('.menu-block__text')];
let burger_button = document.querySelector('.burger__image')
let burger_content = document.querySelector('.burger-content')

let review_buttons = [...document.querySelectorAll('.review-buttons__button')];
let review_track = document.querySelector('.reviews-slider-track');
let review_posts = [...document.querySelectorAll('.review-track-item')];

let Hindex = 0;
let Hcurrent = 0;
let index = 0;
let current = 0;
let direction = -1;

let lastIndex = 0;
let lastReviewerIndex = 0;

let headerTimerId;
let shopTimerId;


console.log(menu_blocks)

var headerSliderNav = function(manual) {
    slider_circles.forEach((btn) => {
        btn.classList.remove('active');
    });
    slider_items.forEach((slide => {
        slide.classList.remove('active');
    }));
    slider_circles[manual].classList.add("active");
    slider_items[manual].classList.add("active");
    Hcurrent = manual;
    Hindex = manual;
}
slider_points.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        headerSliderNav(i);
        clearInterval(headerTimerId);
        headerTimerId = setInterval(() => headerSliderShow(), 5000);
    })
})

slider_button_back.addEventListener("click", () => {
    if (index != 0) {
        clearInterval(shopTimerId);
        shopTimerId = setInterval(() => shopSliderShow(), 10000);
        shopSliderShow();
    }
})

slider_button_next.addEventListener("click", () => {
    if (index != shop_product_count - 1) {
        clearInterval(shopTimerId);
        shopTimerId = setInterval(() => shopSliderShow(), 10000);
        shopSliderShow();
    }
})

function headerSliderShow() {
    slider_items[Hcurrent].classList.remove('active')
    slider_circles[Hcurrent].classList.remove('active')
    Hindex += 1
    if (Hindex == slider_items.length) {
        Hindex = 0
    }
    Hcurrent = Hindex
    slider_items[Hindex].classList.add('active')
    slider_circles[Hindex].classList.add('active')
}

function shopSliderShow() {
    hideFeatures();
    if ((index == shop_product_count - 1) || (index == 0)){
        direction *= -1;
    }
    index += direction
    slider_shop.style.cssText = `right: ${100*index}%`
}

function showFeatures() {
    product_features[index].classList.add('active')
}

function hideFeatures() {
    product_features[index].classList.remove('active')
}

product_features_button.forEach((features) => {
    features.addEventListener("mouseover", () => showFeatures())
    features.addEventListener("mouseout", () => hideFeatures())
})

function showHideMemberInfo(i) {
    if (member_info[i].offsetHeight == 8) {
        member_info[i].classList.add('activeInfo');
        member_button_marker[i].classList.add('activeRotate')
    } else {
        member_info[i].classList.remove('activeInfo');
        member_button_marker[i].classList.remove('activeRotate')
    }
}

member_button.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        showHideMemberInfo(i)
    })
})

function showMenuBlock(i) {
    menu_blocks[lastIndex].classList.remove('activeMenuBlock');
    menu_blocks_text[lastIndex].classList.remove('active')
    if (menu_blocks[i].offsetWidth == 102) {
        menu_blocks[i].classList.add('activeMenuBlock');
        menu_blocks_text[i].classList.add('active')
    } else {
        menu_blocks[i].classList.remove('activeMenuBlock');
        menu_blocks_text[lastIndex].classList.remove('active')
    }
    lastIndex = i;
}

console.log(review_track)

function showReview(i) {
    review_buttons[i].classList.add('reviewer_active')
    review_buttons[lastReviewerIndex].classList.remove('reviewer_active');
    review_track.style.cssText = `right: ${100*i}%`
    lastReviewerIndex = i;

}

review_buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        showReview(i)
    })
})

console.log(menu_blocks_button)

menu_blocks_button.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        showMenuBlock(i)
    })
})



burger_button.addEventListener("click", () => {
    if ((!(burger_button.classList.contains('activeButtonBurger')))) {
        burger_content.classList.add('activeBurger')
        burger_button.classList.add('activeButtonBurger')
    } else {
        burger_content.classList.remove('activeBurger')
        burger_button.classList.remove('activeButtonBurger')
    }
})




shopTimerId = setInterval(() => shopSliderShow(), 10000);
headerTimerId = setInterval(() => headerSliderShow(), 5000);
