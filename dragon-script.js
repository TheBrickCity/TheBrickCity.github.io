function onPageLoaded() {
    console.log("page loaded");
    loadData();
}
const params = new URLSearchParams(window.location.search);
const mainImgHolder = document.getElementById("mainimages");

window.onload  = onPageLoaded;

async function loadData(){
    console.log(params.get('id'));
    let dragonsID = Number(params.get('id'));
    console.log(dragonsID);
    const response = await fetch('./dragonData.json');
    const dragonData = await response.json();
    const currDragon = dragonData.find(dragon => dragon.id === dragonsID);
    console.log(currDragon);
    for(let i=0;i<3;i++){
        let image = document.createElement("img");
        image.src = `http://dci-static-s1.socialpointgames.com/static/dragoncity/mobile/ui/dragons/ui_${currDragon.img_name_android}_${i}@2x.png`;
        mainImgHolder.append(image);
    }
}