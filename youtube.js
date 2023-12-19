const rem = parseInt(window.getComputedStyle(document.documentElement).fontSize, 10);


const video = document.querySelector("#video");
video.currentTime = 10;
video.play();
video.volume = 0;


// some-bar
const bar = document.querySelector("#bar-wrap");
const leftArrow = document.querySelector("#arrow-left");
const rightArrow = document.querySelector("#arrow-right");

leftArrow.style.visibility = "hidden";
rightArrow.style.visibility = "visible";


let scrolled = 0;

const dissapear = () =>{
    if(scrolled == 0){
        leftArrow.style.visibility = "hidden";
    }else leftArrow.style.visibility = "visible";
    if(scrolled == bar.offsetWidth){
        rightArrow.style.visibility = "hidden";
    }else rightArrow.style.visibility = "visible";
    for(let i=0; i<bar.children.length; i++){
        const child = bar.children[i];
        if(child.offsetLeft + child.offsetWidth > bar.offsetWidth - 2*rem + scrolled && rightArrow.style.visibility == "visible"){
            const difference = child.offsetLeft + child.offsetWidth - scrolled - bar.offsetWidth + 2*rem; //tells us how many pixels stick out
            const percentage = difference*100 / (child.offsetWidth);
            child.style.background = `linear-gradient(to right, rgba(211, 211, 211, 1), rgba(211, 211, 211, 0) ${100-percentage}%)`;
        }
        else if(child.offsetLeft < scrolled + leftArrow.offsetWidth && leftArrow.style.visibility == "visible"){
            const difference = scrolled + leftArrow.offsetWidth - child.offsetLeft;
            const percentage = difference*100 / child.offsetWidth;
            child.style.background = `linear-gradient(to right, rgba(211, 211, 211, 0)${percentage}%, rgba(211, 211, 211, 1) 100%)`;
        }else child.style.background = '';
        
    }
}
const barActive = (button) =>{
    this.style.background = "black";
    this.style.color = "white";
    for(let i=0; i<bar.children.length; i++){
        const child = bar.children[i];
        
    }
}
const arrowRight = () =>{ 
    if(scrolled + bar.offsetWidth<=bar.scrollWidth-80){
        bar.scrollLeft+=80;
        scrolled+=80;
    }else{
        bar.scrollLeft = bar.scrollWidth - bar.offsetWidth;
        scrolled = bar.scrollWidth - bar.offsetWidth;
    }
    dissapear();
}
const arrowLeft = () =>{
    if(scrolled>=80){
        bar.scrollLeft-=80;
        scrolled-=80;
    }else{
        bar.scrollLeft = 0;
        scrolled = 0;
    }
    dissapear();
}
dissapear();
