function onPageLoaded() {
    console.log("page loaded");
    loadData();
}
const params = new URLSearchParams(window.location.search);
const mainImgHolder = document.getElementById("mainimages");
const namePlate = document.getElementById("nameplate");

window.onload  = onPageLoaded;

async function loadData(){
    console.log(params.get('id'));
    let dragonsID = Number(params.get('id'));
    console.log(dragonsID);
    const response = await fetch('./dragonData.json');
    const dragonData = await response.json();
    const currDragon = dragonData.find(dragon => dragon.id === dragonsID);
    console.log(currDragon);
    let rarityImage = document.createElement('div');
    rarityImage.className = "rarityImageFilter";
    rarityImage.style.backgroundImage = `url(Static_Images/${currDragon.dragon_rarity}.png)`;
    let name = document.createElement('div');
    name.textContent = `${currDragon.name}`;
    name.classList.add("nameitem");
    name.style.fontSize = "40px";
    name.style.fontFamily = 'DCFont';
    namePlate.append(name);
    namePlate.append(rarityImage);
    for(let i=0;i<4;i++){
        let image = document.createElement("img");
        image.src = `http://dci-static-s1.socialpointgames.com/static/dragoncity/mobile/ui/dragons/ui_${currDragon.img_name_android}_${i}@2x.png`;
        mainImgHolder.append(image);
    }
    for(let h = 0;h<4;h++){
        let elementImage = document.createElement('div');
        elementImage.className = "elementImageFilter";
        if(currDragon.attributes[h] !== undefined){
            elementImage.style.backgroundImage = `url(Static_Images/el-${currDragon.attributes[h]}.png)`;
        } else{
            elementImage.style.backgroundImage = `url(Static_Images/el-uk.png)`;
        }
        namePlate.append(elementImage);
    }
}