const reviews = [
    {      
        id: 1,   
        name: "susan smith",
        job: "web developer",
        img: "https://avatars1.githubusercontent.com/u/8008560?s=460&u=7818d357689ec2495cb05331687d65aa9eb5fe2c&v=4",
        text: "Blessing Easterlings cater shh serious sacrifice veil. Bunch required brightest Thengel ending about he's. Elderly chap. Big grey beard, pointy hat. Rack meets grandfather relatives caves mind Rhudaur. Care Dori eye. Stout struggle Hornblowers rotten walking. Appointed Gorgoroth loud crevice beast. Past meal whatever itself refuge talked Hardly thrown things."
    },
    {      
        id: 2,   
        name: "anna johnson",
        job: "web designer",
        img: "https://avatars3.githubusercontent.com/u/77527?s=460&v=4",
        text: "Taking sad outrunning balls remarked meeting cheer Morgoth! Curse you and all the halflings! Gratitude spear merrier enemy pan scales handsome Westfold domains. Agreeable bonds told either stove plan we've secretive Homely. Always Ecthelion forgot stairs bows. Pirate mat embellishment jewel Lórien. Talked souls Lake-men 60 wee half-wits pillow sitting flower princess. Either defied 500 Farthing. Rests bit Bilbo jewel!"
    },
    {
        id: 3,
        name: "peter jones",
        job: "intern",
        img: "https://avatars0.githubusercontent.com/u/2008?s=460&v=4",
        text: "Devilry shakes airmuch fortune Kingsfoil she's. Dirty marches impassable Were-worms serpent jelly bound mutton guard freed easily cares. Curse you and all the halflings! Picked twice cave-troll descent here seduced 60 Bruinen supplant fire vanishing. Never binding fishermen cesspits age Dunharrow defenses blue sing kindly? Box omen Dory. Evening fly ting corset spare Athelas risen ambushed lordship control. Seemed drain Boromir morninged south proof!"

    },
    {
        id: 4,
        name: "bill anderson",
        job: "the boss",
        img: "https://avatars3.githubusercontent.com/u/4002?s=460&u=5b73abe1bb2684a87f8dd88f8835ff53ce4ad495&v=4",
        text: "Save chiefest trusted potatoes Oakenshield's profit trousers. Moria l remember stint parapet faces. Adamant rank ashamed promised borne burst. Muil lasted horn overthrown. Spends struck cheat idiot Farthing. One Ring to rule them all. Brown Gimli victory threats. Chief trail at reclaim rippling who Took's. Bucklebury offense spills."
    }    
];

const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

let currentItem = 0;

window.addEventListener('DOMContentLoaded', function(){
    showPerson();
});

nextBtn.addEventListener('click', function(){
    currentItem++;

    if(currentItem > reviews.length - 1){
        currentItem = 0;
    }  
    
    showPerson();
});

prevBtn.addEventListener('click', function(){
    currentItem--;

    if(currentItem < 0){
        currentItem = reviews.length - 1;
    }

    showPerson();
});

function showPerson(){
    const item = reviews[currentItem];

    img.src = item.img;
    author.textContent = item.name;
    job.textContent = item.job;
    info.textContent = item.text;
}

randomBtn.addEventListener('click', function(){
    currentItem = Math.floor(Math.random() * reviews.length);
    showPerson();
});