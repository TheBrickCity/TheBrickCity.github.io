function onPageLoaded() {
    console.log("page loaded");
    loadData();
}

window.onload  = onPageLoaded;

const parentThing = document.getElementById("container");
//prevents enter key newlines in the search bar
const div = document.querySelector('.searchbar');
div.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});
//prevents pasted newlines in the search bar
div.addEventListener('paste', (e) => {
  e.preventDefault();

  const text = (e.clipboardData || window.clipboardData)
    .getData('text')
    .replace(/\r?\n|\r/g, ' ');

  document.execCommand('insertText', false, text);
});

const rarityTypes = ['C','R','V','E','L','M','H'];

async function loadData() {
    const response = await fetch('./dragonData.json');
    const dragonData = await response.json();
    //adds rarity search filters
    const filtersBar = document.getElementById('searchFilter');
    rarityTypes.forEach((rarity,index)=>{
        let rarityFilter = document.createElement('div');
        rarityFilter.className = 'rarityImageFilter';
        rarityFilter.style.backgroundImage = `url(Static_Images/${rarity}.png)`;
        rarityFilter.addEventListener("click", function(){
           filterRarity(rarity);
        });
        filtersBar.append(rarityFilter); 
    });
    console.log(dragonData);
    //creates dragon boxes (elements, rarity, img, name)
    for (let i = dragonData.length-1; i > 0; i--) {
        let element = document.createElement('div');
        element.addEventListener("click",()=>{
            window.location.href = `dragon.html?id=${dragonData[i].id}`;
        });
        element.className = "element";
        let dragonImage = document.createElement('div');
        dragonImage.className = "dragonImage";
        for(let h = 0;h<4;h++){
            let elementImage = document.createElement('div');
            elementImage.className = "elementImage";
            if(dragonData[i].attributes[h] !== undefined){
                element.classList.add(`${dragonData[i].attributes[h]}`);
                elementImage.style.backgroundImage = `url(Static_Images/el-${dragonData[i].attributes[h]}.png)`;
            } else{
                elementImage.style.backgroundImage = `url(Static_Images/el-uk.png)`;
            }
            element.append(elementImage);
        }
        let rarityImage = document.createElement('div');
        rarityImage.className = "rarityImage";
        rarityImage.style.backgroundImage = `url(Static_Images/${dragonData[i].dragon_rarity}.png)`;
        element.append(rarityImage);
        dragonImage.style.backgroundImage = `url('http://dci-static-s1.socialpointgames.com/static/dragoncity/mobile/ui/dragons/ui_${dragonData[i].img_name_android}_3@2x.png')`;
        dragonImage.style.backgroundRepeat = "no-repeat";
        dragonImage.style.backgroundSize = "contain";
        element.append(dragonImage);
        let dragonName = document.createElement('div');
        dragonName.className = "dragonName";
        dragonName.textContent = `${dragonData[i].name}`;
        dragonName.style.textAlign = "center";
        element.classList.add(`${dragonData[i].dragon_rarity}`);
        element.append(dragonName);
        parentThing.append(element);  
    }
}
//filters dragon boxes such that only those with rarity == className are visible
let activeRarity = null;
function filterRarity(rarity) {
    let elements = Array.from(document.getElementsByClassName('element'));
    if (activeRarity === rarity) {
        elements.forEach(dragon => {
            dragon.style.display = "flex";
        });
        activeRarity = null;
        return;
    }
    activeRarity = rarity;
    elements.forEach(dragon => {
        dragon.style.display = "none";
        if (dragon.classList.contains(rarity)) {
            dragon.style.display = "flex";
        }
    });
}