function getHistory(){
	return document.getElementById("display-answer").innerText;
}
function printHistory(num){
	document.getElementById("display-answer").innerText=num;
}
function getOutput(){
	return document.getElementById("calculator-input").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("calculator-input").innerText=num;
	}
	else{
		document.getElementById("calculator-input").innerText=getFormattedNumber(num);
	}
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var action = document.getElementsByClassName("action");
for(var i =0;i<action.length;i++){
	action[i].addEventListener('click',function(){
		if(this.id=="delete"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}

	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}