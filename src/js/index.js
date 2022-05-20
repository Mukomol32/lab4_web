const $area = document.querySelector('.area');
const $addBtn = document.querySelector('.btn');

let action=false;
let $selectedBox = null;
let selectedBoxIndex = null;
let boxes = [];

const areaWidth = $area.offsetWidth;
const areaHeight = $area.offsetHeight;
let boxWidth =0;
let boxHeight =0;


let startCoords = {
    x:0,
    y:0
}
let distance = {
    x:0,
    y:0
}

if(!!getLS('coords')) {
    boxes = getLS('coords')
    boxGenerator(boxes);
}


function setLS(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}
function getLS(key){
    return JSON.parse(localStorage.getItem(key));
}

function boxGenerator(list){
    let template = '';
    for (let i = 0; i < list.length; i++) {
        template += '<div class ="box" style="left: '+list[i].x + 'px; top: '+list[i].y + 'px;" data-index="' + i + '">'+ '<textarea class="text" data-index="' + i + ' placeholder="Write smth" >' + boxes[i].text + '</textarea></div>';
    } 
    $area.innerHTML = template; 
}
function boxController(x,y){
    $selectedBox.style.left = x + 'px';
    $selectedBox.style.top = y + 'px';
}

$area.addEventListener('mousedown', function(e){
    if(e.target.classList.contains('box')){
    action=true;
    $selectedBox = e.target;
    selectedBoxIndex = e.target.getAttribute('data-index'); 
    startCoords.x = e.pageX;
    startCoords.y = e.pageY;
    boxWidth = document.querySelector('.box').offsetWidth;
    boxHeight = document.querySelector('.box').offsetHeight;
    }
});
$area.addEventListener('mouseup', function(e){
    action=false;
    boxes[selectedBoxIndex].x = distance.x;
    boxes[selectedBoxIndex].y = distance.y;
    setLS('coords', boxes);
});
$area.addEventListener('keyup', function (e) {
    boxes[e.target.getAttribute('data-index')].text = document.querySelectorAll('textarea')[e.target.getAttribute('data-index')].value;
    localStorage.setItem('boxes', JSON.stringify(boxes));
});

$area.addEventListener('mousemove', function(e){
    if(action) {
        distance.x = boxes [selectedBoxIndex].x + (e.pageX - startCoords.x); 
        distance.y = boxes [selectedBoxIndex].y + (e.pageY - startCoords.y);
        if (distance.x <=0) distance.x=0;
        if(distance.x >=(areaWidth - boxWidth)) distance.x = areaWidth - boxWidth;
        if (distance.y <=0) distance.y=0;
        if(distance.y >=(areaHeight - boxHeight)) distance.y = areaHeight - boxHeight;
        boxController(distance.x, distance.y);
    }
});

$addBtn.addEventListener('click', function(){
    boxes.push({
        x:0,
        y:0
    });
    boxGenerator(boxes);
    localStorage.setItem('boxes', JSON.stringify(boxes));
});
localStorage.clear();