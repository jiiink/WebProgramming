function login() {
    const password = "Pass";
    
    let input = prompt("Input the password", "");

    while (input != password) {
        alert("Wrong");

        input = prompt("Input the password", "");
    }

    alert("Pass");
}

function initial() {
    const holiday = ["Mon", "Wed", "Fri", "Sat", "Sun"];
    const work = ["Tue", "Thu"];
	let day = prompt("Input from Mon to Sun");
            if (day in holiday) {
                
            }
}


