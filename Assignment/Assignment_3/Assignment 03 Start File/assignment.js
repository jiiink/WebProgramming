window.onload = function(){
    //Edit here
    let images = document.querySelectorAll(".artThumb");

    // for (img of images) {
    //     img.addEventListener("mouseover", largeImg());
    //     img.addEventListener("mouseout", hideImg());
    // }
    // alert(images.length);
    for (let i=0; i<images.length; i++) {
        // images[i].addEventListener('mouseover', largeImg(this));
        // images[i].addEventListener('mouseout', hideImg(this));
        images[i].addEventListener('mouseover', function () {
            largeImg(this); // Pass the current image element to largeImg function
        });
        images[i].addEventListener('mouseout', function () {
            hideImg(this); // Pass the current image element to hideImg function
        });
    }
}

function largeImg(img) {
    // alert(img.src);
    img.src = img.src.replace("thumbs/", "");
}

function hideImg(img) {
    img.src = img.src.replace("art/", "art/thumbs/");
}

