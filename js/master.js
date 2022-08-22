// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color-option");

if(mainColors !== null){
    // Set Color From Local Storage
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));

    // Remove Class Active
    document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
    })

    // Add Class Active
    document.querySelector(`[data-color='${localStorage.getItem("color-option")}']`).classList.add("active");
}

// Background Option
let backgroundOption = true;

// Varible For Control The Background Interval
let backgroundInterval;

// Check If there's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

if(backgroundLocalItem !== null){
    
    // Remove Active Class From All Span

    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");
    })


    if(backgroundLocalItem === "true"){
        backgroundOption = true;
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        backgroundOption = false;
        document.querySelector(".random-background .no").classList.add("active");
    }

}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-cog").onclick = function() {

    // Toggle Class fa-spin Fro Rotation On Slef
    this.classList.toggle("fa-spin");

    // Toggle Class open To Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

// Loop On List Items
colorLi.forEach(li => {

    // Click On All List Items
    li.addEventListener("click", (e) => {
        
    // Set Color In Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

    // Set Color In Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);

    // Remove Active Class From All Children
    handleActive(e)
});
});




// Switch Background Image
const randBackEl = document.querySelectorAll(".random-background span");

// Loop On All Span
randBackEl.forEach(span => {

    // Click On Every Span
    span.addEventListener("click", (e) => {

    // Remove Active Class From All Span
    handleActive(e)
    
    if(e.target.dataset.background === "yes"){
        backgroundOption = true

        randoizeImage();
        
        localStorage.setItem("background_option", true);


    } else {
        backgroundOption = false

        clearInterval(backgroundInterval)
        localStorage.setItem("background_option", false);

    }
});
    
});


// Select Landing Page Element

let landingPage = document.querySelector(".landing-page");

// Get Array Of Images

let imgArray = ["01.JPG", "02.JPG", "03.JPG", "04.JPG", "05.JPG"];


// Function To Randomize Option

function randoizeImage(){
    if(backgroundOption === true){
        
        backgroundInterval =setInterval(()=>{

            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            
            // Change Background Image URL
            landingPage.style.backgroundImage = `url(imgs/${imgArray[randomNumber]})`;

        }, 5000);
            }
}

randoizeImage();


// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function (){
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight =  ourSkills.offsetHeight;

    // Window Height
    let skillsWindowHeight = this.innerHeight;

    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - skillsWindowHeight )){
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach((skills)=> {
            skills.style.width = skills.dataset.progress;
        });

    };
    

};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img=>{
    img.addEventListener('click', (e)=>{
        // Create Overlay Element

        let overlay = document.createElement("div");

        // Add Class To Overlay
        overlay.className = "popup-overlay";

        // Append Overlay To Body
        document.body.appendChild(overlay)

        // Create The Popup
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = "popup-box";

        // Create The Image
        let popupImage = document.createElement("img");
        
        // Set Image Source
        popupImage.src = img.src;

        // Add Image To Popup Box
        overlay.appendChild(popupImage);

        // Append The Popup Box To Body
        overlay.appendChild(popupBox)

        if(img.alt !== null){
            // Create Heading
            let imgHeading = document.createElement("h3");

            // Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            // Append The Text To Heading
            imgHeading.appendChild(imgText);

            // Append The Heading To The Popup Box
            overlay.appendChild(imgHeading);

        }

        // Create The Close Span
        let closeBtn = document.createElement("span");

        // Create The Close Button Text
        let closeText = document.createTextNode("X");

        // Append Text To Close Button
        closeBtn.appendChild(closeText);

        // Add Class To Close Button
        closeBtn.className= "close-button";

        // Add Close Button To Popup Box;
        popupBox.appendChild(closeBtn);
    });
});

// Close Popup
document.addEventListener("click", (e)=>{
    if(e.target.className === "close-button" || e.target.className === "popup-overlay" ){

        // Remove The Current Popup
        document.querySelector(".popup-box").remove()

        // Remove Overlay
        document.querySelector(".popup-overlay").remove()
    }
})

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSection(element){
    element.forEach(ele =>{
        ele.addEventListener("click", (e)=>{
            e.preventDefault()
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

scrollToSection(allBullets);
scrollToSection(allLinks);

// Handle Active State
function handleActive(e){
    
     // Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });

    // Add Class Active
    e.target.classList.add("active")
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem('bullets_option');

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span=>{
        span.classList.remove("active");
    })

    if(bulletLocalItem === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active")

    }else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active")


    }
}

bulletsSpan.forEach(span=>{
    span.addEventListener("click", e=>{
        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block";
            localStorage.setItem('bullets_option', "block")
        }else{
            bulletsContainer.style.display = "none";
            localStorage.setItem('bullets_option', "none")

        }
        handleActive(e)
    })
})


// Reset Button

document.querySelector(".reset-options").onclick = function (){
    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    
    // Reload indow
    window.location.reload();
};

// Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let toggleMenuSpan = document.querySelector(".toggle-menu span");
let tLinks = document.querySelector(".links");

toggleMenu.onclick= function(e){

    // Stop Propagation
    e.stopPropagation();
    // Toggle Class "active" On Button
    this.classList.toggle("active");

    // Toggle Class "open" On Link
    tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", e=>{
    if(e.target !== tLinks && e.target !== toggleMenu){

        if(tLinks.classList.contains("open")){
            tLinks.classList.remove("open");
            toggleMenu.classList.remove("active");
        }

    }
});
