const inputUser =document.getElementById('current-operation');
const inputResult =document.getElementById('current-result');

const numbers=document.querySelectorAll('.num');
const operators = document.querySelectorAll('.oper');
const equal=document.querySelector('#equal');
const clean=document.querySelector('#clean');
const del=document.querySelector('#del');
const percent=document.querySelector('#percent');

let operShow = "";
let selNum="";
let oper="";
let contOper=0;

let firstNum="";
let secondNum="";




//function to get the operation
function operate(operator, a, b){
	switch (operator){
		case "+":
			return a+b;
			break;
		case "-":
			return a-b;
			break;
		case "*":
			return a*b;
			break;
		case "/":
			return a/b;
			break;
	}
}




//Getting the numbers
numbers.forEach((number)=>{
	number.addEventListener('click', (e)=>{
		inputScreen(number.textContent);
	});
});

//Display function
function inputScreen(item){
	if (item=="."&&selNum.includes(".")) return;
	operShow=operShow+item;
	inputUser.innerHTML =operShow;

	//Storing the ‘display value’ in a variable
	if (Number(item)||item=="."||item=="0") {
	selNum=selNum+item;
	}
}




//Getting the operator
operators.forEach((operator)=>{
	operator.addEventListener('click', (e)=>{
		getOperator(operator.textContent);
	});
});

//function to get the operator
//and store the firstNumber
function getOperator(itemOperator){
	if (operShow==""&&itemOperator!="-") return;
	
	inputScreen(itemOperator);

	(contOper!=0)?showResult():getFirstNumber();

	//Save the operation that has been chosen
	oper=itemOperator;
}

//function to get the first numner
function getFirstNumber(){
	
	if (operShow=="-") {
	 	selNum="-";
	 	return;	
	}
 	
 	firstNum=Number(selNum);
 	selNum="";

 	contOper++;
}




//getting the equal operator
equal.addEventListener('click', (e)=>{
	if (oper==""||firstNum==""){
		return
	}else{
		showResult();
	}
});

//function to get the result
function showResult(){

	secondNum=Number(selNum);

	if (secondNum==0&&oper=="/") {
		cleanUp();
		inputResult.innerHTML="Error";
		return;
	}

	result=operate(oper,firstNum,secondNum);

	if (!Number.isInteger(result)) {
		if (result.toString().length>15) {
			result=Number.parseFloat(result.toFixed(8));
		}
	}

	firstNum=result;

	selNum="";

	if (contOper==0) {
		operShow=result.toString();
    }

    inputResult.innerHTML=result;
}



//getting the clean operator
clean.addEventListener('click', (e)=>{
	cleanUp();
});

//function to clean calculator
function cleanUp(){
	operShow = "";
	selNum="";
	oper="";
	contOper=0;
	firstNum="";
	secondNum="";
	inputScreen("");
	inputResult.innerHTML="";
}




//getting the del number operator
del.addEventListener('click', (e)=>{
	deleteNumber();
});

//function to remove last number
function deleteNumber(){
	operShow=operShow.slice(0,-1);
    inputUser.innerHTML=operShow;
    selNum=selNum.slice(0,-1);
}




//getting percent number
percent.addEventListener('click', (e)=>{
	selNum=selNum/100;
	inputScreen("%");
});

//removing focus from buttons
document.addEventListener('click', (e)=>{
	if(document.activeElement.toString() == '[object HTMLButtonElement]'){ 
		document.activeElement.blur();
	}
});




window.addEventListener('keydown', (key)=>{
	switch(key.key){
		case "0":
		case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
			inputScreen(key.key);
			
			break;
		case '*':
        case '/':
        case '-':
        case '+':
            getOperator(key.key);
        	break;
        case 'Enter':
        	if (oper==""||firstNum==""){
				return
			}else{
				contOper=0;
				showResult();
			}
			break;
		case 'Backspace':
			deleteNumber();
			break;	
		case '%':
			selNum=selNum/100;
			inputScreen("%");
			break;	
		default:
            break;
    }
});
