export class Geral {
    constructor() {
        this.selectors();
        this.nextImage();
    }
    selectors() {
        this.celular = document.querySelectorAll("#instagramFotoCelularImg img");
    }
    nextImage() {
        let time = 5000;
        let currentImageIndex = 0;
        let max = this.celular.length;
        setInterval(() => {
            this.celular[currentImageIndex].classList.remove("selected");
            currentImageIndex++;
            if (currentImageIndex >= max) {
                currentImageIndex = 0;
            }
            this.celular[currentImageIndex].classList.add("selected");
        }, time);
    }
}
