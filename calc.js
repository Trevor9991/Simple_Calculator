// Vars
let screen = document.getElementById('screenText');
let ancor = document.getElementById('ancor');
let digits = document.querySelectorAll('.digit');
let wholeScreen = document.getElementById('screen');


// Functions
function Calculator(){
    if(screen.innerHTML === ""){
        return;
    }
    try{
      let result = eval(screen.innerHTML);
      screen.innerHTML = "=" + result;
    }catch(e){
         screen.innerHTML = e.message;
    }
}

function IsOperator(str){
    if(str === "" || str == undefined || str == null) return false;
    switch(str.charAt(0)){
        case "+":
        case "-":
        case "*":
        case "/":
            return true;
        default:
            return false;
    }
}

function LastNumber(){
    let lastNumber = screen.innerHTML.split(/[\+\-\*\/]/);
    return lastNumber[lastNumber.length - 1];
}

// Ancor
setInterval(function() {
    if(ancor.innerHTML === "_"){
        ancor.innerHTML = " ";
    }else{
        ancor.innerHTML = "_";
    }
},500);

// for(let i in digits){
//     console.log(digits[i]);
// }

// Math
digits.forEach(function(digit){
        digit.addEventListener('click', function(e){
            // screen = document.getElementById('screenText');
            let lastChar = screen.innerHTML[screen.innerHTML.length - 1];

            //remove the "=" from the result on the screen
            if(screen.innerHTML[0] === "="){
                screen.innerHTML = screen.innerHTML.slice(1); 
            }
            switch(digit.innerHTML){
                case "C":
                    screen.innerHTML = "";
                    break;
                case "D":
                    if(screen.innerHTML !== ""){
                        screen.innerHTML = screen.innerHTML.slice(0, -1);
                    }
                    break;
                case "=":
                    if(IsOperator(lastChar)){
                        break;
                    }
                    Calculator();
                    wholeScreen.scrollLeft = 0;
                    return;
                default:
                    // check if the last character is a dot and the new digit is a dot
                    if( digit.innerHTML == "." && LastNumber().includes(".") ){
                        break;
                    }
                    // check if the last character is an operator and the new digit is an operator
                    if( IsOperator(digit.innerHTML) && IsOperator(lastChar) ){
                        screen.innerHTML = screen.innerHTML.slice(0, -1);
                    }

                    if((lastChar == undefined || lastChar == null) && (digit.innerHTML == "*" || digit.innerHTML == "/")){
                        break;
                    }
                    screen.innerHTML += digit.innerHTML;
                    break;
            }
            wholeScreen.scrollLeft += 1000;
        });
});
