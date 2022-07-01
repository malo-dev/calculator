const memoireElt = document.querySelector("#memoire");
const ecranElt = document.querySelector("#ecran");
let precedent = 0;
let affichage = "";
let operation = null;
let memoire;

window.onload = () => {
    let touches = document.querySelectorAll("span");
    for(let touche of touches){
        touche.addEventListener("click", gererTouches);
    }
    document.addEventListener("keydown", gererTouches);
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if(memoire != 0) memoireElt.style.display = "initial";
}
function gererTouches(event){
    let touche;
    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"];
    if(event.type === "keydown"){
        if(listeTouches.includes(event.key)){
            event.preventDefault();
            touche = event.key;
        }
    }else{
        touche = this.innerText;
    }
    if(parseFloat(touche) >= 0 || touche === "."){
        affichage = (affichage === "") ? touche.toString() : affichage + touche.toString();
        ecranElt.innerText = affichage;
    }else{
        switch(touche){
            case "C":
            case "Escape":
                precedent = 0;
                affichage = "";
                operation = null
                ecranElt.innerText = 0;
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
                ecranElt.innerText = precedent;
                operation = touche;
                affichage = "";
                break;
            case "=":
            case "Enter":
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
                ecranElt.innerText = precedent;
                affichage = precedent;
                precedent = 0;
                break;
            case "M+":
                localStorage.memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) + parseFloat(affichage) : parseFloat(affichage);
                memoireElt.style.display = "initial";
                break;
            case "MC":
                localStorage.memoire = 0;
                memoireElt.style.display = "none";
                break;
            case "MR":
                memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
                affichage = memoire;
                ecranElt.innerText = memoire;
                break;
            default:
                break;
        }
    }
}
function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}