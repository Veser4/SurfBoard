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

let HIndex = 0;
let index = 0;
let current = 0;
let direction = -1;

let lastIndex = 0;
let lastReviewerIndex = 0;

let headerTimerId;
let shopTimerId;


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
});

[...document.querySelectorAll('.header-slider__point')].forEach((point, i)  => {
    point.addEventListener("click", () => {
        [...document.querySelectorAll('.header-slider__circle')].forEach(circle => {
            circle.classList.remove('active');
        });
        [...document.querySelectorAll('.header-slider__circle')][i].classList.add('active');
        [...document.querySelectorAll('.header-slider__background')].forEach(img => {
            img.classList.remove('active');
        });
        [...document.querySelectorAll('.header-slider__background')][i].classList.add('active');
        HIndex = i
        clearInterval(headerTimerId);
        headerTimerId = setInterval(() => headerSliderShow(), 6000);
    })
});

function headerSliderShow() {
    [...document.querySelectorAll('.header-slider__background')].forEach(img => {
        img.classList.remove('active');
    });
    [...document.querySelectorAll('.header-slider__circle')].forEach(circle => {
        circle.classList.remove('active');
    });
    HIndex += 1;
    if (HIndex == [...document.querySelectorAll('.header-slider__background')].length) {
        HIndex = 0;
    }
    [...document.querySelectorAll('.header-slider__background')][HIndex].classList.add('active');
    [...document.querySelectorAll('.header-slider__circle')][HIndex].classList.add('active')
}

headerTimerId = setInterval(() => headerSliderShow(), 6000);


shopTimerId = setInterval(() => shopSliderShow(), 10000);
