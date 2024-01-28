const htmlFontSize = getComputedStyle(document.documentElement).fontSize;
const rem = parseFloat(htmlFontSize);
const video = document.querySelector("video");
video.volume = 0;

let playing = false;
const switchPlayer = ()=>{
    forReal();
    if(playing){
        pause();
    }else play();
}
document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the space bar
    if (event.key === ' ') {
        switchPlayer();
    }
});
const pause = ()=>{
    forReal();
    playing = false;
    video.pause();
    const i = document.createElement('i');
    const e = document.querySelector("#pause");
    e.children[0].classList.replace(e.children[0].classList[1], 'fa-play');
    e.onclick = ()=>{play()};
}

const play = () =>{
    forReal();
    playing = true;
    video.play();
    const i = document.createElement('i');
    const e = document.querySelector("#pause");
    e.children[0].classList.replace(e.children[0].classList[1], 'fa-pause');
    e.onclick = ()=>{pause()};
}

const stopPropagation = (e) =>{
    e.stopPropagation();
}
const forReal = () =>{
    const e = document.querySelector("#this-project-will-make-me-go-insane");
    e.style.transition = "none";
    e.style.transform = `translate(-50%, -50%) scale(1)`;
    e.style.opacity = 1;
    // Trigger a reflow to apply the initial state before enabling the transition
    e.offsetHeight;

    // Enable transition for subsequent changes
    e.style.transition = "all 0.5s"; 
    const i = document.createElement('i');
    if(playing){
        e.children[0].classList.replace(e.children[0].classList[1], 'fa-pause');
        
    }else{
        e.children[0].classList.replace(e.children[0].classList[1], 'fa-play');
    }
    
    e.style.transform = `translate(-50%, -50%) scale(1.3)`;
    e.style.opacity = 0;

}
let timeBarLength;
const changeTime = (event) =>{
    const rect = event.target.getBoundingClientRect();
    const startX = rect.left;
    const endX = rect.right;
    timeBarLength = endX-startX;
    const clicked = event.clientX-startX-8;
    const percentage = clicked*100/timeBarLength;
    const changedTime = percentage*video.duration/98;
    video.currentTime = changedTime;
    updateVideoTime();
    const dot = document.querySelector("#time-bar-dot");
    dot.style.left = `${clicked}px`;
}

const bar = document.querySelector("#bar-wrap-2");
const arrowLeft = ()=>{
    bar.scrollLeft-=160;
    checkArrows();
}
const arrowRight = ()=>{
    bar.scrollLeft+=160;
    checkArrows();
}


const barWrap = document.querySelector("#bar-wrap-1");
    barWrap.classList.toggle('left');  //turn off  left::after
    barWrap.classList.toggle('right'); //turn off right::after
    //only both::after is present now
const checkArrows = () =>{
    const leftArrow = document.querySelector("#arrow-left");
    const rightArrow = document.querySelector("#arrow-right");
    
    if(bar.scrollLeft==0){
        leftArrow.style.visibility = "hidden";
        barWrap.classList.add("right");
        barWrap.classList.remove("both");
    }else{
        leftArrow.style.visibility = "visible";
        barWrap.classList.remove("right");
    }
    if(bar.scrollLeft >= bar.scrollWidth - bar.offsetWidth -1){ 
        rightArrow.style.visibility = "hidden";
        barWrap.classList.add("left");
        barWrap.classList.remove("both");

    }else{
        rightArrow.style.visibility = "visible";
        barWrap.classList.remove("left");
    }
    if(bar.scrollLeft!=0 && bar.scrollLeft < bar.scrollWidth - bar.offsetWidth -1){
        barWrap.classList.add("both");
    }
}



const barActive = (button) =>{
    for(let i=0; i<bar.children.length; i++){
        bar.children[i].classList.remove("active");
    }
    button.classList.add("active");
}




checkArrows();


const updateVideoTime = () => {
    const videoTime = video.duration;
    const currentTime = video.currentTime;
    // get rid of *10, its just for visual purposes, since the video is 1h long
    const percentage = (currentTime * 100) / videoTime; 
    const timeBar = document.querySelector("#time-bar");
  
    timeBar.style.borderImageSource = `linear-gradient(90deg, rgb(255, 34, 0) ${percentage}%, grey ${percentage}%)`;
    const dot = document.querySelector("#time-bar-dot");
    dot.style.left = `${percentage*timeBarLength/100-8}px`;
    
    
  };
video.addEventListener('loadedmetadata', function() {
    setInterval(updateVideoTime, 1000);
  });

const showLeftMenu = () =>{
    const nav = document.querySelector("#left-menu");
    const topNav = document.querySelector("#menu-n-logo");
    nav.style.left = "0%";
    topNav.style.left="0%";

    
    const main = document.querySelector("#main");
    main.style.backgroundColor = "rgba(0,0,0,0.5)";
    main.style.filter = "brightness(0.5)";

    const mainNav = document.querySelector("#nav");
    mainNav.style.filter = "brightness(0.5)";
    
    
}
const hideLeftMenu = () =>{
    const nav = document.querySelector("#left-menu");
    const topNav = document.querySelector("#menu-n-logo");
    nav.style.left = "-20%";
    topNav.style.left="-20%";
    


    const main = document.querySelector("#main");
    main.style.filter = "brightness(1)";
    main.style.backgroundColor = "#fff";

    const mainNav = document.querySelector("#nav");
    mainNav.style.backgroundColor = "#fff";
    mainNav.style.filter = "brightness(1)";
}


const dragMouseDown = (e)=>{
    e.preventDefault();
    pos2 = e.clientY
    document.onmousemove = elementDrag;
}
const elementDrag = (e)=>{
    const leftMenuContent = document.querySelector("#left-menu-content")
    e.preventDefault();
    pos1 = pos2 - e.clientY;
    pos2 = e.clientY;
    console.log(leftMenuScroll.offsetTop - pos1);
    if(leftMenuScroll.offsetTop - pos1 <=4*rem){
        leftMenuScroll.style.top = "4rem";
        leftMenuContent.style.top = "-0rem";
    }else if(leftMenuScroll.offsetTop - pos1 >=655){
        leftMenuScroll.style.top = "655px";
        leftMenuContent.style.top = -655 + 4*rem + "px";
    }
    else{
        leftMenuScroll.style.top = (leftMenuScroll.offsetTop - pos1) + "px";
        leftMenuContent.style.top = (-leftMenuScroll.offsetTop + pos1 + 4*rem) + "px";
    }
}
const closeDragElement = () =>{
    document.onmousemove = null;
}
const leftMenuScroll = document.querySelector("#left-menu-scroll");
let pos1 = 0, pos2 = 0;
leftMenuScroll.onmousedown = dragMouseDown;
document.onmouseup = closeDragElement;



let showMoreFlag = false;
const showMore = (e)=>{
    const moreItems = document.querySelectorAll(".show-more");
    if(!showMoreFlag)
    {
        for(let i=0; i<moreItems.length; i++){
            moreItems[i].style.visibility = "visible";
            moreItems[i].style.position = "relative";
            e.children[1].innerText = "Pokaż mniej";
            e.children[0].style.transform = "rotate(180deg)";
            leftMenuScroll.style.height = "2.5rem";
        }
        showMoreFlag = true;
    }else{
        for(let i=0; i<moreItems.length; i++){
            moreItems[i].style.visibility = "hidden";
            moreItems[i].style.position = "absolute";
            e.children[1].innerText = "Pokaż więcej";
            e.children[0].style.transform = "rotate(0)";
            leftMenuScroll.style.height = "5rem";
        }
        showMoreFlag = false;
    }
}