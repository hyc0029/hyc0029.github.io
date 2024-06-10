//Blend Mode
const blendMode = document.getElementById(`blend-mode`);
//Position X
const positionX = document.getElementById(`position-x`);
//Position Y
const positionY = document.getElementById(`position-y`);
//Rotation
const rotation = document.getElementById(`rotate`);
//Scale
const scale = document.getElementById(`scale`);
//Transparency
const opacity = document.getElementById(`opacity`);
//Add Image to Art-Container
const artContainer = document.getElementById(`art-container`);
//Layer
const layer = document.getElementById('layer');
//Blur
const blurVal = document.getElementById('bluring');
//Saturation
const saturation = document.getElementById('saturation');
//Glow
const glow = document.getElementById('glow');
//Glow Color
const glowClr = document.getElementById('glow-color');
//BG Gradient Type
const gradientType = document.getElementById('bg-gradient-type');
//Linear Gradient Degree
const linearGradientDegree = document.getElementById('linear-gradient-degree');
//Selected Border
const selectedBorder = document.querySelector('.selected');


var currentImage;
var allGradientClr = new Array();
document.addEventListener('DOMContentLoaded', () => {

    //Blend Mode
    blendMode.addEventListener('change', (e) => {
        if(currentImage != null){
            currentImage.style.mixBlendMode = e.target.value;
        }
    });

    //Position X
    positionX.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.left = `${e.target.value}px`;
        }
    });

    //Position Y
    positionY.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.top = `${e.target.value}px`;
        }
    });

    //Rotation
    rotation.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.transform = `rotate(${e.target.value}deg) scale(${scale.value})`;
        }
    });

    //Scale
    scale.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.transform = `rotate(${rotation.value}deg) scale(${e.target.value})`;
        }
    });

    //Transparency
    opacity.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.opacity = e.target.value;
        }
    });

    //Z-index
    layer.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.zIndex = e.target.value;
        }
    });
    //blur
    blurVal.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.webkitFilter = `blur(${e.target.value}px) saturate(${saturation.value}%) drop-shadow(${glowClr.value} 0px 0px ${glow.value}px)`;
        }
    });
    //Saturation
    saturation.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.webkitFilter = `blur(${blurVal.value}px) saturate(${e.target.value}%) drop-shadow(${glowClr.value} 0px 0px ${glow.value}px)`;
        }
    });
    //glow
    glow.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.webkitFilter = `blur(${blurVal.value}px) saturate(${saturation.value}%) drop-shadow(${glowClr.value} 0px 0px ${e.target.value}px)`;
        }
    });
    //glow color
    glowClr.addEventListener('input', (e) => {
        if(currentImage != null){
            currentImage.style.webkitFilter = `blur(${blurVal.value}px) saturate(${saturation.value}%) drop-shadow(${e.target.value} 0px 0px ${glow.value}px)`;
        }
    });

    const editorTab = document.getElementById('editor');
    const editorPage = document.getElementsByClassName('control-group')[0];

    const libraryTab = document.getElementById('img-lib');
    const libraryPage = document.getElementById('image-adder');


    editorTab.addEventListener('click', () => {
        // console.log('editor tab selected');
        editorPage.style.display = 'flex';
        libraryPage.style.display = 'none';
    });

    libraryTab.addEventListener('click', () => {
        console.log('library tab selected');
        editorPage.style.display = 'none';
        libraryPage.style.display = 'flex';
    })

    //show current bg-mode options and hide non current bg-modes
    const bgMode = document.getElementById('bg-mode');
    const bgHiddenList = document.querySelectorAll('.bg-hidden');
    bgMode.addEventListener('change', (e) => {
        bgHiddenList.forEach(e => {e.style.display = 'none'});
        var toBeShown = document.getElementById(`bg-${e.target.value}-hidden`);
        toBeShown.style.display = 'flex';
    });

    //Background Color Only
    const bgClrPicker = document.getElementById('bg-color');
    bgClrPicker.addEventListener('input', (e) => {
        artContainer.style.backgroundColor = e.target.value;
    });

    //Background Gradient
    gradientType.addEventListener('change', (e) => {
        if (e.target.value == "linear") {
            linearGradientDegree.style.display = 'flex';
            linearGradient(allGradientClr);
        }
        else{
            linearGradientDegree.style.display = 'none';
            radialGradient(allGradientClr);
        }
    });


    function SelectedImageBorder() {
        if (currentImage != null) {
            selectedBorder.style.visibility = 'visible';
            selectedBorder.style.top = currentImage.style.top;
            selectedBorder.style.left = currentImage.style.left;
            selectedBorder.style.transform = `rotate(${rotation.value}deg) scale(${scale.value})`
        }else{
            // selectedBorder.style.width = `0px`;
            // selectedBorder.style.height = `0px`;
            selectedBorder.style.visibility = 'hidden';
            selectedBorder.style.top = '0px';
            selectedBorder.style.left = '0px';
        }
    }
    setInterval(SelectedImageBorder, 10);

});
//Outside of DOMContentLoaded
//Get Rotation of Element in Degree
function getCurrentRotation(element) {
    var st = window.getComputedStyle(element, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    if (tr !== "none") {
        // console.log('Matrix: ' + tr);

        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        // First option, don't check for negative result
        // Second, check for the negative result
        /**/
        var radians = Math.atan2(b, a);
        var angle = Math.round(radians * (180 / Math.PI));
        /*/
        var radians = Math.atan2(b, a);
        if ( radians < 0 ) {
          radians += (2 * Math.PI);
        }
        var angle = Math.round( radians * (180/Math.PI));
        /**/

    } else {
        var angle = 0;
    }

    // works!
    return angle;
}

//Add Images to Art Container
var images;
const artIsolate = document.querySelector('.ignore');
function addImage(current) {
    var newImg = document.createElement('img');
    var tempImg = current.querySelector('img');
    newImg.setAttribute("src", tempImg.getAttribute('src'));
    newImg.classList.add('art-image');
    artIsolate.appendChild(newImg);
    addImageEvents(newImg);
    images = artIsolate.querySelectorAll('img');
}

//Add Event Lisnters
function addImageEvents(image) {
    var startPosSaved = false;
    var startingMouseX = 0;
    var startingMouseY = 0;
    var imageStartX = 0;
    var imageStartY = 0;

    artContainer.addEventListener('mousemove', (e) => {
        if (e.buttons == 1 && currentImage != null) {
            if (!startPosSaved) {
                startingMouseX = e.clientX;
                startingMouseY = e.clientY;
                imageStartX = parseFloat(currentImage.style.left, 10) || 0;
                imageStartY = parseFloat(currentImage.style.top, 10) || 0;
                // console.log(`start x: ${imageStartX} | start y: ${imageStartY}`);    
                startPosSaved = true;
            }
            var newLeft = imageStartX - (startingMouseX - e.clientX);
            var newTop = imageStartY - (startingMouseY - e.clientY);
            positionX.value = parseFloat(currentImage.style.left, 10) || 0;
            positionY.value = parseFloat(currentImage.style.top, 10) || 0;
            currentImage.style.left = `${newLeft}px`;
            currentImage.style.top = `${newTop}px`;
            // console.log(newLeft, newTop);
        }
        else {
            startPosSaved = false;
        }
    });

    image.addEventListener('mousedown', (e) => {
        currentImage = image;
        positionX.value = parseFloat(currentImage.style.left, 10) || 0;
        positionY.value = parseFloat(currentImage.style.left, 10) || 0;
        scale.value = image.getBoundingClientRect().width / image.offsetWidth;
        rotation.value = getCurrentRotation(image);
        blendMode.value = image.style.mixBlendMode || 'normal';
        opacity.value = image.style.opacity || 1;
        layer.value = image.style.zIndex || 0;

        var filter = image.style.webkitFilter || "blur(0px) saturate(0%) drop-shadow(rgb(0,0,0) 0px 0px 0px)";
        filter = filter.split(/[)(]/);
        blurVal.value = parseInt(filter[1]) || 0;
        saturation.value = parseInt(filter[3]) || 100;
        var rgb = filter[6].split(/[ ,]/)
        var hex = rgbToHex(rgb[0], rgb[1], rgb[2])
        console.log(hex);
        glowClr.value = hex;
        var dropShadowVal = filter[7].split(" ");
        glow.value = parseInt(dropShadowVal[3]);

    });
}

//rbg to hex code
function rgbToHex(R,G,B) {return "#" + toHex(R)+toHex(G)+toHex(B)}

function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

//Image Upload
const imageAdderSection = document.getElementById('image-adder');
const imageUpload = document.getElementById('image-upload');
imageUpload.addEventListener('change', (e) => {
    if(e.target.files[0] == null)
        return;
    var newImage = e.target.files[0];
    console.log(newImage);
    var newImgUrl = URL.createObjectURL(newImage);
    var newButton = document.createElement('button');
    var newBtnImg = document.createElement('img');
    newBtnImg.src = newImgUrl;
    newBtnImg.title = newImage.name;
    newButton.appendChild(newBtnImg);
    imageAdderSection.appendChild(newButton);
    newButton.setAttribute('onclick', 'addImage(this)')
});

//Adding Gradient Color
const gradientSettings = document.getElementById('gradient-settings');
const gradientClrElement = document.getElementById('gradient-clr-setting-hidden');
function addGradientColor()
{
    var newColor = gradientClrElement.cloneNode(true);
    newColor.style.display = 'flex';
    gradientSettings.appendChild(newColor);
    var clrCount = gradientSettings.childElementCount-4;
    newColor.id = `gradient-clr-${clrCount}`;

    var clrLabel = newColor.querySelector('#gradient-clr-label');
    clrLabel.id = `gradient-clr-label-${clrCount}`;
    var clrInput = newColor.querySelector('#gradient-clr');
    clrInput.id = `gradient-clr-${clrCount}`;
    clrInput.setAttribute('name', `gradient-clr-${clrCount}`);

    var positionLabel = newColor.querySelector('#gradient-position-label');
    positionLabel.id = `gradient-position-label-${clrCount}`;
    var positionInput = newColor.querySelector('#gradient-position');
    positionInput.id = `gradient-position-${clrCount}`;
    positionInput.setAttribute('name', `gradient-position-${clrCount}`);

    allGradientClr[clrCount-1] = newColor;
    
    if(gradientType.value == 'linear'){
        linearGradient(allGradientClr);
    }else{
        radialGradient(allGradientClr);
    }

}

//Remove Gradient Color
function removeGradientColor()
{
    var removeClr = allGradientClr.pop();
    removeClr.remove();
    if(gradientType.value == 'linear'){
        linearGradient(allGradientClr);
    }else{
        radialGradient(allGradientClr);
    }

}

var newGradient = new Array();

//Create Linear Gradient
const gradientDegree = linearGradientDegree.querySelector('#gradient-clr-degree');
function linearGradient(clrArray){
    newGradient = new Array(clrArray.length+1);
    //Linear Gradient Angle
    newGradient[0] = `${gradientDegree.value}deg` || '0deg';
    gradientDegree.addEventListener('input', (e) => {
        newGradient[0] = `${e.target.value}deg`;
        artContainer.style.backgroundImage = `linear-gradient(${newGradient})`;
        console.log(`linear-gradient(${newGradient})`);
    })

    clrArray.forEach(clr => {
        const gradientClr = clr.querySelector('.gradient-clr');
        const gradientPos = clr.querySelector('.gradient-position');

        const gradientValues = `${gradientClr.value} ${gradientPos.value}%`;
        newGradient[clrArray.indexOf(clr)+1] = gradientValues;

        gradientClr.addEventListener('input', (e) => {
            newGradient[clrArray.indexOf(clr)+1] = `${e.target.value} ${gradientPos.value}%`
            artContainer.style.backgroundImage = `linear-gradient(${newGradient})`;
            console.log(`linear-gradient(${newGradient})`);
        });

        gradientPos.addEventListener('input', (e) => {
            newGradient[clrArray.indexOf(clr)+1] = `${gradientClr.value} ${e.target.value}%`
            artContainer.style.backgroundImage = `linear-gradient(${newGradient})`;
            console.log(`linear-gradient(${newGradient})`);
        });

    });
    artContainer.style.backgroundImage = `linear-gradient(${newGradient})`;
}

//Create Radial Gradient
function radialGradient(clrArray){
    newGradient = new Array(clrArray.length);
    clrArray.forEach(clr => {
        const gradientClr = clr.querySelector('.gradient-clr');
        const gradientPos = clr.querySelector('.gradient-position');

        const gradientValues = `${gradientClr.value} ${gradientPos.value}%`;
        newGradient[clrArray.indexOf(clr)] = gradientValues;
        gradientClr.addEventListener('input', (e) => {
            newGradient[clrArray.indexOf(clr)] = `${e.target.value} ${gradientPos.value}%`
            artContainer.style.backgroundImage = `radial-gradient(${newGradient})`;
            console.log(`radial-gradient(${newGradient})`);
        });

        gradientPos.addEventListener('input', (e) => {
            newGradient[clrArray.indexOf(clr)] = `${gradientClr.value} ${e.target.value}%`
            artContainer.style.backgroundImage = `radial-gradient(${newGradient})`;
            console.log(`radial-gradient(${newGradient})`);
        });
    });
    artContainer.style.backgroundImage = `radial-gradient(${newGradient})`;
}

//Deselect Current Image
function deselect(){
    if(currentImage != null){currentImage=null;}
}

//Convert Div Art to Canvas
