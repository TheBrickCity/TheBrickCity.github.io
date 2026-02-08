function onPageLoaded() {
    console.log("page loaded");
    loadData();
}
const params = new URLSearchParams(window.location.search);
const mainImgHolder = document.getElementById("mainimages");
const namePlate = document.getElementById("nameplate");

window.onload  = onPageLoaded;

function shrinkSkill(){
    console.log();
}

function expandSkill(skill, effectData, attackBlock, local){
    let effectIds = skill.effects;
    let effectObjects = [];
    let skillDescription = local.find(object => object.hasOwnProperty(skill.tid_description));
    //let skillName = local.find(object => object.hasOwnProperty(skill.tid_name));
    //console.log(skill);
    //attackName.textContent = skillName?.[skill.tid_name];
    effectIds.forEach((effectId)=>{
        effectObjects.push(effectData.find(effect => effect.id === effectId));
        console.log(effectData.find(effect => effect.id === effectId));
    });
    let generalSkillInfo = document.createElement('div');
    generalSkillInfo.classList.add('generalSkillInfo');
    generalSkillInfo.textContent = `Cooldown: ${skill.cooldown} turns\nDescription: ${skillDescription?.[skill.tid_description]}`;
    attackBlock.append(generalSkillInfo);
    //attackBlock.style.height = "300px";
}

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
    const effectData = attackDataTemp.effects;
    const responseL = await fetch('./local.json');
    const local = await responseL.json();
    console.log(effectData);
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
    name.style.color = "#D3D3D3";
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
    let elementImageContainer = document.createElement('div');
    elementImageContainer.style.display = "flex";
    for(let h = 0;h<4;h++){
        let elementImage = document.createElement('div');
        elementImage.className = "elementImageFilter";
        if(currDragon.attributes[h] !== undefined){
            elementImage.style.backgroundImage = `url(Static_Images/el-${currDragon.attributes[h]}.png)`;
        } else{
            elementImage.style.backgroundImage = `url(Static_Images/el-uk.png)`;
        }
        elementImageContainer.append(elementImage);
    }
    namePlate.append(elementImageContainer);
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
        attackName.style.color = "#D3D3D3";
        let attackElement = document.createElement('div');
        attackElement.classList.add("attackElement");
        attackElement.style.backgroundImage = `url(Static_Images/attack-elements/${attackObjects[count].element}.png)`;
        let attackPower = document.createElement('div');
        attackPower.classList.add("attackPower");
        attackPower.textContent = `Attack Power: ${attackObjects[count].damage}`;
        attackPower.style.color = "#D3D3D3";
        let expandButtonOutside = undefined;
        if(attackObjects[count].skill_id !== undefined){
            let skill = skillData.find(skill => skill.id === attackObjects[count].skill_id);
            let skillName = local.find(object => object.hasOwnProperty(skill.tid_name));
            console.log(skill);
            attackName.textContent = skillName?.[skill.tid_name];
            attackBlocks[count].style.border = "2px solid #fff3a0";
            attackBlocks[count].style.textShadow = "0 1px 2px rgba(0,0,0,0.6)";
            attackElement.style.position = "relative";
            let skillBorder = document.createElement('div');
            skillBorder.className = "skillBorder";
            attackElement.append(skillBorder);
            let expandButton = document.createElement('div');
            expandButton.classList.add('expandButton');
            expandButton.addEventListener("click",()=>{
                //replace with skill info additions here
                expandSkill(skill, effectData, attackBlocks[count], local);
            });
            expandButtonOutside = expandButton;
        }
        attackBlocks[count].append(attackElement);
        attackBlocks[count].append(attackName);
        attackBlocks[count].append(attackPower);
        if(expandButtonOutside !== undefined){
            let lineBreak = document.createElement('div');
            lineBreak.classList.add('flexBreak');
            attackBlocks[count].append(lineBreak);
            attackBlocks[count].append(expandButtonOutside);
        }
    }
    for(let count = 0; count<attackObjects.length;count++){
        let attackName = document.createElement('div');
        attackName.classList.add("attackName");
        attackName.textContent = trainableAttackObjects[count].name;
        attackName.style.color = "#D3D3D3";
        let attackElement = document.createElement('div');
        attackElement.classList.add("attackElement");
        attackElement.style.backgroundImage = `url(Static_Images/attack-elements/${trainableAttackObjects[count].element}.png)`;
        let attackPower = document.createElement('div');
        attackPower.classList.add("attackPower");
        attackPower.textContent = `Attack Power: ${trainableAttackObjects[count].damage}`;
        attackPower.style.color = "#D3D3D3";
        if(trainableAttackObjects[count].skill_id !== undefined){
            let skill = skillData.find(skill => skill.id === trainableAttackObjects[count].skill_id);
            let skillName = local.find(object => object.hasOwnProperty(skill.tid_name));
            attackName.textContent = skillName?.[skill.tid_name];
            attackBlocksT[count].style.border = "2px solid #fff3a0";
            attackBlocksT[count].style.textShadow = "0 1px 2px rgba(0,0,0,0.6)";
            attackElement.style.position = "relative";
            let skillBorder = document.createElement('div');
            skillBorder.className = "skillBorder";
            attackElement.append(skillBorder);
        }
        attackBlocksT[count].append(attackElement);
        attackBlocksT[count].append(attackName);
        attackBlocksT[count].append(attackPower);
    }
}