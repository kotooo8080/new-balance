let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function resizeEventHandler(){
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if(w/canvas.width > h/canvas.height){
      canvas.style.width = "calc("+canvas.width+" / "+canvas.height+" * 115vh)";
      canvas.style.height = "calc(115vh)";
    } else {
      canvas.style.width = "calc(115vh)";
      canvas.style.height = "calc("+canvas.height+" / "+canvas.width+" * 115vh)";
    }
}
resizeEventHandler();
window.addEventListener("resize", resizeEventHandler);

let cnvsWidth = canvas.width, 
    cnvsHeight = canvas.width;

const colors = [
    "#B3D929",
    "#64bd5f",
    "#3dba9c",
    "#3d8fe3",
    "#6a69cf",
    "#9456b7",
    "#c55fb3",
    "#e3577e",
    "#ea5c38",
    "#f88e2a",
    "#fac72d",
    "#dad12a"
]

const sectors = [
    "Здоровье",
    "Отношения",
    "Окружение",
    "Работа",
    "Обеспеченность",
    "Яркость жизни",
    "Самосовершенствование",
    "Духовность"
]

const names = document.getElementsByClassName('names')[0].children;
const items = document.getElementsByClassName('select-wrapper vis');

function radians (deg) {
    return(deg * (Math.PI / 180));
}

function drawLine(x, y, angleDeg, length) {
    let angle = angleDeg * Math.PI/180;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + Math.cos(angle)*length,y + Math.sin(angle)*length);  
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}

document.getElementById('ring_name').onchange = function(e) {
    document.getElementById('your_text').innerHTML = e.target.value;
};

document.getElementById('choice').onchange = function(e) {
    let wrappers = document.getElementsByClassName('select-wrapper');
    for(i = 0; i < e.target.value; i++) {
       wrappers[i].classList.add('vis');
       wrappers[i].classList.remove('invis');

       document.getElementsByClassName('names')[0].children[i].classList.add('vis');
       document.getElementsByClassName('names')[0].children[i].classList.remove('invis');
    }
    for(i = 11; i >= e.target.value; i--) {
        wrappers[i].classList.add('invis');
        wrappers[i].classList.remove('vis');

        document.getElementsByClassName('names')[0].children[i].classList.add('invis');
        document.getElementsByClassName('names')[0].children[i].classList.remove('vis');
    }
    res(true);
};

function readyChoice() {
    let wrappers = document.getElementsByClassName('select-wrapper');
    for(i = 0; i < 8; i++) {
        wrappers[i].classList.add('vis');
        wrappers[i].classList.remove('invis');

        document.getElementsByClassName('names')[0].children[i].value = sectors[i];
        document.getElementsByClassName('names')[0].children[i].classList.add('vis');
        document.getElementsByClassName('names')[0].children[i].classList.remove('invis');
    }
    for(i = 11; i >= 8; i--) {
        wrappers[i].classList.add('invis');
        wrappers[i].classList.remove('vis');

        document.getElementsByClassName('names')[0].children[i].classList.add('invis');
        document.getElementsByClassName('names')[0].children[i].classList.remove('vis');
    }
    document.getElementById('choice').value = 'none';
}

function res(trueOrFalse) {
    let xPoint = cnvsWidth/2 + 10;
    let yPoint = cnvsWidth/2 + 5;
    let circleRad = cnvsWidth/2 - 40;

    // let names = document.getElementsByClassName('names')[0].children;
    // let items = document.getElementsByClassName('select-wrapper vis');

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cnvsWidth, cnvsHeight);

    if(!trueOrFalse) {
        readyChoice();
    }
    
    let x = cnvsWidth/4;
    let y = cnvsHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i = 0; i < items.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.font = "17px Verdana";
        let str = names[i].value;
        ctx.fillText(str, x, y);
        ctx.closePath();
        y += 18;
    }

    x = cnvsWidth/1.4;
    y = cnvsHeight;
    let j = 0;
    for(i = 0; i < items.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[j];
        ctx.font = "17px Verdana";
        let str = items[i].lastElementChild.value;
        ctx.fillText(str, x, y);
        ctx.closePath();
        y += 18;
        j++;
    }

    let angle_start = 0, angle_start_text = 0;
    let angle_end = 0;
    let step = 0;
    let len = document.getElementsByClassName('vis').length/2;
    if(len === 4) {
        angle_end = 90;
        //angle_start_text = 115;
    }
    else if(len === 6) {
        angle_end = 60;
        //angle_start_text = 105;
    }
    else if(len === 8) {
        angle_end = 45;
        //angle_start_text = 90;
    }
    else if(len === 10) {
        angle_end = 36;
        //angle_start_text = 90;
    }
    else if(len === 12) {
        angle_end = 30;
        //angle_start_text = 90;
    }
    step = angle_end;

    for(let i = 0; i < len; i++) {
        ctx.beginPath();
        ctx.moveTo(xPoint, yPoint);
        ctx.arc(xPoint, yPoint, ((items[i].lastElementChild.value/10) * (circleRad/10)), radians(angle_start), radians(angle_end));
        ctx.lineTo(xPoint, yPoint);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.closePath();
        angle_start += step;
        angle_end += step;
    }

    for(let i = 0; i <= circleRad; i += circleRad/10) {
        ctx.beginPath();
        ctx.arc(xPoint, yPoint, i, 0, 360);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    }

    // for(let i = 0; i < len; i++){
    //     ctx.font = "bold 20px Serif";
    //     ctx.fillStyle = colors[i];
    //     ctx.fillTextCircle(names[i].value, xPoint, yPoint, circleRad, radians(angle_start_text), len);
    //     angle_start_text += 360/len;
    // }
}

// CanvasRenderingContext2D.prototype.fillTextCircle = function(text, x, y, radius, startRotation, numOfSectors){
//     // let coef = 1;
//     // if(numOfSectors === 4)
//     //     coef = 0.7;
//     // // if(numOfSectors === 6)
//     // //     coef = 1;
//     // if(numOfSectors === 8)
//     //     coef = 2;
//     // if(numOfSectors === 10 || numOfSectors === 12)
//     //     coef = 2;
//     let numRadsPerLetter = Math.PI/text.length/numOfSectors;
//     this.save();
//     this.translate(x,y);
//     this.rotate(startRotation);

//     for(let i = 0; i < text.length; i++){
//        this.save();
//        this.rotate(i*numRadsPerLetter);
 
//        this.fillText(text[i], 0, -radius - 15);
//        this.restore();
//     }
//     this.restore();
// }

function downloadImage(el) {
  let image = canvas.toDataURL("image/jpg");
  el.href = image;
};

function printImage() {
    const dataUrl = document.getElementById('canvas').toDataURL(); 

    let windowContent = '<!DOCTYPE html>';
    windowContent += '<html>';
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>';
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';

    const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
    printWin.document.open();
    printWin.document.write(windowContent); 

    printWin.document.addEventListener('load', function() {
        printWin.focus();
        printWin.print();
        printWin.document.close();
        printWin.close();            
    }, true);
}

