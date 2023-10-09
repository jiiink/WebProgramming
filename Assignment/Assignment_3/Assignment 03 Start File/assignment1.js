window.onload = function () {
    let images = document.querySelectorAll(".artThumb");

    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('mouseover', function () {
            createLargerImage(this);
        });
        images[i].addEventListener('mouseout', function () {
            hideLargerImage();
        });
    }
}

let largerImage = null; // To keep track of the larger image element

function createLargerImage(img) {
    if (!largerImage) {
        largerImage = document.createElement('span');
        largerImage.classList.add('larger-image-container'); // Optional: You can add a class for styling
        document.body.appendChild(largerImage);
    }

    const largerImg = document.createElement('img');
    largerImg.src = img.src.replace("thumbs/", "");
    largerImage.innerHTML = ''; // Clear any previous content
    largerImage.appendChild(largerImg);
    largerImage.style.display = 'block';
    // largerImage.style.padding = '25px';
    largerImage.style.position = 'absolute';
    img.addEventListener('mousemove', moveLargerImage);
}

function moveLargerImage(event) {
    if (largerImage) {
        largerImage.style.left = event.clientX + 'px';
        largerImage.style.top = event.clientY + 'px';
    }
}

function hideLargerImage() {
    if (largerImage) {
        largerImage.style.display = 'none';
        largerImage.innerHTML = ''; // Clear the content when hiding
        largerImage.removeEventListener('mousemove', moveLargerImage);
    }
}
