window.onload = function () {
    let images = document.querySelectorAll(".artThumb");
    for (let i=0; i<images.length; i++) {
        images[i].addEventListener('mouseover', function () {
            createLargerImage(this);
        });
        images[i].addEventListener('mouseout', function () {
            hideLargerImage();
        });
    }
}

let largerImage;

function createLargerImage(img) {
    largerImage = document.createElement('span');
    document.body.appendChild(largerImage);
    let largerImg = document.createElement('img');
    largerImg.src = img.src.replace("thumbs/", "");
    largerImage.appendChild(largerImg);

    styleLargerImage(img);
}

function styleLargerImage(img) {
    largerImage.style.display = 'block';
    largerImage.style.backgroundColor = 'white';
    largerImage.style.position = 'absolute';
    largerImage.style.border = 'solid';
    largerImage.style.margin = '10px 10px 10px 10px';
    largerImage.style.padding = '10px 10px 10px 10px';
    let rect = img.getBoundingClientRect();
    largerImage.style.top = rect.top + 'px';
    largerImage.style.left = rect.right + 'px';
}

function hideLargerImage() {
    largerImage.innerHTML = '';
    largerImage.style.display = 'none';
}