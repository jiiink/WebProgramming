function login() {
    const password = "Pass";
    let user_password = prompt("Input the password","");

    while (user_password != password) {
        alert("Wrong");
        user_password = prompt("Input the password", "");
    }
    alert("Pass");
}

function initial() {
    let user_input = prompt("Input from Mon to Sun");
    
    if (user_input == "Tue" || user_input == "Thu") {
        document.write(user_input + " Go work");
    } else {
        document.write("Holiday!");
    }
}


