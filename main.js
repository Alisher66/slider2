const images = [
    { url: "./images/1.jpg", name: "Main title1", description: "Main text content1" },
    { url: "./images/2.jpg", name: "Main title2", description: "Main text content2" },
    { url: "./images/3.jpg", name: "Main title3", description: "Main text content3" },
    { url: "./images/4.jpg", name: "Main title4", description: "Main text content4" },
    { url: "./images/5.jpg", name: "Main title5", description: "Main text content5" },
    // { url: "./images/6.jpg", name: "Main title6", description: "Main text content6" },
    // { url: "./images/7.jpg", name: "Main title7", description: "Main text content7" },
    // { url: "./images/8.jpg", name: "Main title8", description: "Main text content8" },
    // { url: "./images/9.jpg", name: "Main title9", description: "Main text content9" },
    // { url: "./images/10.jpg", name: "Main title10", description: "Main text content10" },
    // { url: "./images/11.jpg", name: "Main title11", description: "Main text content11" },
    // { url: "./images/12.jpg", name: "Main title12", description: "Main text content12" },
];



class Slider {

    constructor(images, settings) {
        this.images = images;
        this.slidesToShow = settings.slidesToShow;
        this.slidesToScroll = settings.slidesToScroll;

        this.initElements();

        this.addDots();

        this.showSlider();
        this.addBtns();
    }

    initElements() {
        this.wrap = document.querySelector(".slider__wrap");
        this.sliderTrack = document.querySelector(".slider__track");

        this.position = 0;
        this.itemWidth = this.wrap.clientWidth / this.slidesToShow;
        this.movePosition = this.slidesToScroll * this.itemWidth;


    }

    addDots() {
        let dots = 0;
        if (this.images.length > this.slidesToShow) {
            dots = Math.ceil(this.images.length / this.slidesToScroll);
        }

        const dotsContainer = document.createElement("div");
        dotsContainer.classList.add("dots");
        this.wrap.after(dotsContainer);

        this.dotsList = document.createElement("div");
        this.dotsList.classList.add("dots__list");
        dotsContainer.prepend(this.dotsList);

        const dotsLiArr = [];
        for (let i = 0; i < dots; i++) {
            dotsLiArr.push(`<a class="dots__item" data-index ="${i}"></a>\n`);
        }
        this.dotsList.innerHTML = dotsLiArr.join("");

        this.dotsLi = document.querySelectorAll(".dots__item");

    }

    addBtns() {
        this.nextBtn = document.createElement("button")
        this.nextBtn.className = "btn btn-dark next";
        this.nextBtn.textContent = "next";
        this.wrap.after(this.nextBtn);

        this.prevBtn = document.createElement("button");
        this.prevBtn.className = "btn btn-dark prev";
        this.prevBtn.textContent = "prev";
        this.wrap.after(this.prevBtn);

        this.hideBtns();
        
        this.nextBtn.addEventListener("click", (e) => {
            this.position++;
            if (this.images.length-1 == this.position) {
                this.nextBtn.style.display = "none";
            }
            this.prevBtn.style.display = "block";
            this.sliderTrack.style.transform = `translateX(-${this.position * this.movePosition}px)`;
            this.getActive(this.position); 
        });

        this.prevBtn.addEventListener("click", (e) => {
            this.position--;
            if (this.position == 0) {
                this.prevBtn.style.display = "none"; 
            }
            this.nextBtn.style.display = "block";
            this.sliderTrack.style.transform = `translateX(-${this.position * this.movePosition}px)`;
            this.getActive(this.position); 
        });

    }
    
    hideBtns() {
        if(this.position == 0) {
            this.prevBtn.style.display = "none";
            this.nextBtn.style.display = "block";
        } else if(this.position == this.images.length-1) {
            this.prevBtn.style.display = "block";
            this.nextBtn.style.display = "none";
        } else {
            this.prevBtn.style.display = "block";
            this.nextBtn.style.display = "block";
        }
    }

    showSlider() {
        const sliderHtml = this.images.map(image => {
            return `
                <div class="card" style="width: 18rem;">
                    <img src="${image.url}" class="card-img-top" alt="${image.name}">
                    <div class="card-body">
                        <h5 class="card-title">${image.name}</h5>
                        <p class="card-text">
                            ${image.description}
                        </p>
                    </div>
                </div>
                `;
        });
        this.sliderTrack.innerHTML = sliderHtml.join("");

        this.sliderItems = this.sliderTrack.querySelectorAll('.card');
        this.sliderItems.forEach(item => item.style.minWidth = this.itemWidth + "px");
        this.moveSlider();
        this.getActive(0);
    }

    getActive(index) {
        this.dotsLi.forEach((li, i) => {
            if (index == i) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
        })
    }

    moveSlider() {
        this.dotsList.addEventListener("click", (e) => {
            if (!e.target.matches("a")) return;
            this.position = e.target.dataset.index;
            this.sliderTrack.style.transform = `translateX(-${this.position * this.movePosition}px)`;
            this.getActive(this.position);
            this.hideBtns();
        })
    }

}

const mainSlider = new Slider(images, { "slidesToShow": 1, "slidesToScroll": 1 });

