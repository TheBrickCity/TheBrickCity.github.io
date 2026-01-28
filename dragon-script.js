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
    const responseA = await fetch('./attackData.json');
    const attackDataTemp = await responseA.json();
    const attackData = attackDataTemp.attacks;
    const skillData = attackDataTemp.skills;
    const responseL = await fetch("http://sp-translations.socialpointgames.com/deploy/dc/ios/prod/dc_ios_en_prod_wetd46pWuR8J5CmS.json");
    const local = await responseL.json();
    console.log(skillData);
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
        image.addEventListener("error", () => {
          image.remove();
        });
        mainImgHolder.append(image);
    }
    for(let i=1;i<5;i++){
        let image = document.createElement("img");
        image.src = `http://dci-static-s1.socialpointgames.com/static/dragoncity/mobile/ui/dragons/ui_${currDragon.img_name_android}_skin${i}_3@2x.png`;
        image.addEventListener("error", () => {
          image.remove();
        });
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
    //use dragon object attack id to identify attack objects
    const attackIds = currDragon.attacks;
    let attackObjects = [];
    for(let k=0;k<attackIds.length;k++){
        attackObjects.push(attackData.find(attack => attack.id === attackIds[k]));
    }
    console.log(attackObjects);
    //use dragon object trainable attack ids to identify attack objects
    const trainableAttackIds = currDragon.trainable_attacks;
    let trainableAttackObjects = [];
    for(let k = 0;k<trainableAttackIds.length;k++){
        trainableAttackObjects.push(attackData.find(attack => attack.id === trainableAttackIds[k]));
    }
    console.log(trainableAttackObjects);
    attackBlocks = document.getElementsByClassName("attack");
    attackBlocksT = document.getElementsByClassName("attackt");
    console.log(attackBlocks);
    for(let count = 0; count<attackObjects.length;count++){
        let attackName = document.createElement('div');
        attackName.classList.add("attackName");
        attackName.textContent = attackObjects[count].name;
        attackName.style.color = "white";
        if(attackObjects[count].skill_id !== undefined){
            let skill = skillData.find(skill => skill.id === attackObjects[count].skill_id);
            let skillName = local.find(object => object.hasOwnProperty(skill.tid_name));
            console.log(skill);
            attackName.textContent = skillName?.[skill.tid_name];
        }
        attackBlocks[count].append(attackName);
    }
    for(let count = 0; count<attackObjects.length;count++){
        let attackNameT = document.createElement('div');
        attackNameT.classList.add("attackName");
        attackNameT.textContent = trainableAttackObjects[count].name;
        attackNameT.style.color = "white";
        attackBlocksT[count].append(attackNameT);
    }
}