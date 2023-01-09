export class Geral {
    constructor() {
        this.selectors();
        this.events();
    }
    selectors() {
        this.celular = document.querySelector(".iphone");
    }
    events() {
        console.log(this.celular.src);
        let arraySrc = [
            "/imgs/capainsta.png",
            "/imgs/capainsta1.png",
            "/imgs/capainsta2.png",
            "/imgs/capainsta3.png",
        ];
        let indice = 1;
        setInterval(() => {
            if (indice > 3) indice = 0;
            this.celular.src = arraySrc[indice];
            indice++;
        }, 4000);
    }
}
