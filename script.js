const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


document
.querySelector("#canvas-container")
.appendChild(renderer.domElement);



/* 3D Floating Object */

const geometry = new THREE.TorusKnotGeometry(
    1.8,
    .45,
    150,
    30
);


const material = new THREE.MeshPhysicalMaterial({

    color:0x8b5cff,
    metalness:1,
    roughness:.15,
    clearcoat:1

});


const object = new THREE.Mesh(
    geometry,
    material
);


scene.add(object);



/* Floating particles */

const particlesGeometry =
new THREE.BufferGeometry();


const particlesCount = 800;


const positions =
new Float32Array(
particlesCount * 3
);



for(
let i=0;i<particlesCount*3;i++
){

positions[i]=(Math.random()-0.5)*20;

}



particlesGeometry.setAttribute(
"position",
new THREE.BufferAttribute(
positions,
3
)
);



const particlesMaterial =
new THREE.PointsMaterial({

color:0xffffff,
size:.03

});


const particles =
new THREE.Points(
particlesGeometry,
particlesMaterial
);


scene.add(particles);



/* Lights */

const light1 =
new THREE.PointLight(
0xffffff,
4
);

light1.position.set(
5,
5,
5
);


scene.add(light1);



const light2 =
new THREE.PointLight(
0x8b5cff,
5
);


light2.position.set(
-5,
-3,
2
);


scene.add(light2);



camera.position.z=7;

/* Animation State */

let animationRunning = true;



/* Mouse movement */

let mouseX=0;
let mouseY=0;


window.addEventListener(
"mousemove",
(e)=>{

mouseX =
(e.clientX/window.innerWidth)-0.5;


mouseY =
(e.clientY/window.innerHeight)-0.5;


});



/* Animation */

const isMobileScreen = window.innerWidth <= 640;

const rotSpeedX = isMobileScreen ? 0.0015 : 0.001;
const rotSpeedY = isMobileScreen ? 0.003 : 0.002;
const particleSpeed = isMobileScreen ? 0.0006 : 0.0004;

function animate(){

if(!animationRunning) return;

requestAnimationFrame(animate);

object.rotation.x += rotSpeedX;
object.rotation.y += rotSpeedY;

object.position.x +=
(mouseX-object.position.x)*0.02;

object.position.y +=
(-mouseY-object.position.y)*0.02;

particles.rotation.y +=particleSpeed;

renderer.render(scene,camera);

}


animate();




/* Scroll Animation */

const cards =
document.querySelectorAll(".reel-card");


window.addEventListener(
"scroll",
()=>{

cards.forEach(card=>{


const position =
card.getBoundingClientRect().top;


if(
position <
window.innerHeight-100
){

card.style.transform=
"translateY(0px)";

card.style.opacity=1;


}


});


});



/* Resize */

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth/
window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});
document
.querySelectorAll("a[href^='#']")
.forEach(link=>{

link.addEventListener(
"click",
e=>{

e.preventDefault();


document
.querySelector(
link.getAttribute("href")
)
.scrollIntoView({

behavior:"smooth"

});


});

});



window.addEventListener("load",()=>{

const loader = document.getElementById("loader");

document.body.style.overflow = "auto";

document.body.style.opacity = "1";

loader.style.opacity = "0";

setTimeout(()=>{

loader.style.display = "none";

},600);

});

/* ================= CUSTOM CURSOR ================= */

const cursor =
document.querySelector(".cursor");

const blur =
document.querySelector(".cursor-blur");


window.addEventListener("mousemove",(e)=>{

cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";

blur.style.left=e.clientX+"px";
blur.style.top=e.clientY+"px";

});



/* ================= MAGNETIC BUTTON ================= */

const button = document.querySelector(".hero-btn");

if (button) {

button.addEventListener("mousemove",(e)=>{

const rect = button.getBoundingClientRect();

const x = e.clientX-rect.left;
const y = e.clientY-rect.top;

button.style.transform =
`translate(${(x-rect.width/2)/8}px,
${(y-rect.height/2)/8}px)`;

});

button.addEventListener("mouseleave",()=>{

button.style.transform="translate(0,0)";

});

}

/* ================= SCROLL REVEAL ================= */

const reveals =
document.querySelectorAll(".reveal");

function revealSections(){

reveals.forEach(section=>{

const top=
section.getBoundingClientRect().top;

if(top<window.innerHeight-120){

section.classList.add("active");

}

});

}

window.addEventListener("scroll",revealSections);

revealSections();



/* ================= NAVBAR ================= */

const nav=
document.querySelector("nav");

window.addEventListener("scroll",()=>{

if(window.scrollY>50){

nav.classList.add("scrolled");

}else{

nav.classList.remove("scrolled");

}

});
/* ================= BATCH 8 - PART 1 ================= */

const counters = document.querySelectorAll(".counter");

const speed = 60;

counters.forEach(counter=>{

const updateCounter=()=>{

const target=+counter.getAttribute("data-target");

const count=+counter.innerText;

const increment=Math.ceil(target/speed);

if(count<target){

counter.innerText=count+increment;

setTimeout(updateCounter,30);

}else{

counter.innerText=target;

}

};

updateCounter();

});
/* ================= BATCH 8 - PART 2 ================= */

const mouseGlow = document.querySelector(".mouse-glow");

window.addEventListener("mousemove",(e)=>{

mouseGlow.style.left = e.clientX + "px";
mouseGlow.style.top = e.clientY + "px";

});
/* ================= PHONE PARALLAX ================= */

document.querySelectorAll(".reel-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = (e.clientX-rect.left)/rect.width-0.5;
const y = (e.clientY-rect.top)/rect.height-0.5;

card.style.transform =
`perspective(1200px)
rotateY(${x*10}deg)
rotateX(${-y*10}deg)
translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform =
"perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)";

});

});
/* ================= PHONE GLOW FOLLOW ================= */

document.querySelectorAll(".phone").forEach(phone=>{

const glow = phone.querySelector(".glow");

if(glow){

phone.addEventListener("mousemove",(e)=>{

const rect = phone.getBoundingClientRect();

glow.style.left = (e.clientX-rect.left)+"px";
glow.style.top = (e.clientY-rect.top)+"px";

});

}

});

/* ================= VIDEO LOADING ================= */

document.querySelectorAll(".phone video").forEach(video=>{

video.addEventListener("loadeddata",()=>{

video.style.opacity="1";

});

});
/* ================= VIDEO MODAL ================= */

const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".phone video").forEach(video=>{

video.addEventListener("click",(e)=>{

e.stopPropagation();

modal.classList.add("active");

document.body.style.overflow = "hidden";

modalVideo.src = video.getAttribute("src");

modalVideo.play();

});

});

closeModal.addEventListener("click",()=>{

modal.classList.remove("active");

modalVideo.pause();

modalVideo.currentTime = 0;

modalVideo.src = "";

document.body.style.overflow = "auto";

});

modal.addEventListener("click",(e)=>{


if(e.target===modal){

modal.classList.remove("active");

modalVideo.pause();

modalVideo.currentTime = 0;

modalVideo.src = "";

document.body.style.overflow = "auto";

}

});

/* ================= ESC KEY CLOSE ================= */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape" && modal.classList.contains("active")){

modal.classList.remove("active");

modalVideo.pause();

modalVideo.currentTime = 0;

modalVideo.src = "";

document.body.style.overflow = "auto";

}

});

/* ================= VIDEO LOADER ================= */

const loader = document.querySelector(".video-loader");

modalVideo.addEventListener("loadstart",()=>{

loader.style.display="block";

});

modalVideo.addEventListener("canplay",()=>{

loader.style.display="none";

});
/* ================= VIDEO PROGRESS ================= */

const progressFill =
document.querySelector(".progress-fill");

if(progressFill){

modalVideo.addEventListener("timeupdate",()=>{

const progress =
(modalVideo.currentTime /
modalVideo.duration) * 100;

progressFill.style.width =
progress + "%";

});

}
/* ================= BATCH 10 - INTERACTIVE GLOW ================= */

document.querySelectorAll(
".reel-card, .skill, .contact-card, .hero-btn"
).forEach(item=>{

item.addEventListener("mousemove",(e)=>{

const rect=item.getBoundingClientRect();

item.style.setProperty(
"--x",
`${e.clientX-rect.left}px`
);

item.style.setProperty(
"--y",
`${e.clientY-rect.top}px`
);

});

});
/* ================= BATCH 10 - MAGNETIC REEL CARDS ================= */

document.querySelectorAll(".reel-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;

card.style.transform = `
translate(${x*0.04}px, ${y*0.04}px)
scale(1.03)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform = `
translate(0px,0px)
scale(1)
`;

});

});
/* ================= BATCH 10 - PHONE 3D TILT ================= */

document.querySelectorAll(".phone").forEach(phone=>{

phone.addEventListener("mousemove",(e)=>{

const rect = phone.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const rotateY = ((x / rect.width) - 0.5) * 14;
const rotateX = ((y / rect.height) - 0.5) * -14;

phone.style.transform = `
perspective(1200px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)
`;

});

phone.addEventListener("mouseleave",()=>{

phone.style.transform = `
perspective(1200px)
rotateX(0deg)
rotateY(0deg)
translateY(0px)
`;

});

});
/* ================= BATCH 10 - HERO PARALLAX ================= */

const heroGlass = document.querySelector(".glass");

window.addEventListener("mousemove",(e)=>{

const x = (e.clientX/window.innerWidth - 0.5) * 20;
const y = (e.clientY/window.innerHeight - 0.5) * 20;

heroGlass.style.transform =
`translate(${x}px,${y}px)`;

});
/* ================= BATCH 11 - ACTIVE NAV ================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current = "";

sections.forEach(section=>{

const sectionTop = section.offsetTop - 150;

if(window.scrollY >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){

link.classList.add("active");

}

});

});
/* ================= BATCH 11 - LOGO CLICK ================= */

const logo = document.querySelector(".logo");

if (logo) {
  logo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
/* ================= BATCH 11 - SCROLL PROGRESS ================= */

const progressBar = document.querySelector("#progress-bar");

window.addEventListener("scroll",()=>{

const scrollTop = window.scrollY;

const height =
document.documentElement.scrollHeight - window.innerHeight;

const progress = (scrollTop / height) * 100;

progressBar.style.width = progress + "%";

});

/* ================= PAGE VISIBILITY ================= */

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

animationRunning = false;

}else{

animationRunning = true;

animate();

}

});

/* ================= HOVER-TO-PLAY VIDEO ================= */

document.querySelectorAll(".phone").forEach(phone=>{

const video = phone.querySelector("video");

if(!video) return;

phone.addEventListener("mouseenter",()=>{

video.currentTime = 0;

video.play();

});

phone.addEventListener("mouseleave",()=>{

video.pause();

});

});

/* Pause off-screen videos so they don't keep running in the background */

const portfolioVideos = document.querySelectorAll(".phone video");

const videoObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting){

entry.target.pause();

}

});

},{
    threshold:0.5
});

portfolioVideos.forEach(video=>{

videoObserver.observe(video);

});
/* ================= BACK TO TOP ================= */

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backToTop.classList.add("show");

}else{

backToTop.classList.remove("show");

}

});

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}); 