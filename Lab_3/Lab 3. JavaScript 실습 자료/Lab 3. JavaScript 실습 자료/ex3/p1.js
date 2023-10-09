function isBlank(inputField) {
    if (inputField.type == "checkbox") {
        //write your code
        return !inputField.checked;
    }

    if (inputField.type == "text") {
        //write your code
        if (inputField.value == "" ) {
            return true;
        } else {
            return false;
        }
    }
}

function makeRed(inputField) {
    //write your code
    inputField.style.backgroundColor = "red";
    inputField.parentNode.style.backgroundColor = "red";
    inputField.parentNode.style.color = "#FFFFFF";
}

function makeClean(inputField) {
    //write your code
    inputField.parentNode.style.backgroundColor = "white";
    inputField.parentNode.style.color = "black";
}

window.onload = function () {
    var mainForm = document.getElementById("mainForm");

    var requiredInputs = document.querySelectorAll(".required");

    for (var i = 0; i < requiredInputs.length; i++) {
        requiredInputs[i].onfocus = function () {
            this.style.backgroundColor = "#EEEE00";
            this.parentNode.style.color = "#000000";
            this.parentNode.style.backgroundColor = "#FAFCFF";
        }
    }

    for (var i = 0; i < requiredInputs.length; i++) {
        requiredInputs[i].onblur = function () {
            this.style.backgroundColor = "#FAFCFF";
        }
    }

    mainForm.onsubmit = function (e) {
        var requireInputs = document.querySelectorAll(".required");
        for (var i = 0; i < requireInputs.length; i++) {
            if (isBlank(requireInputs[i])) {
                e.preventDefault();
                makeRed(requireInputs[i]);
            }
            else {
                makeClean(requireInputs[i]);
            }
        }
    }
}