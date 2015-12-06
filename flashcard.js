/*
 * Simple flash card application
 */

// onLoad() to initialize values
function cardInit()
{
  //document.getElementById("Answer").setAttribute("value", "");
  document.getElementById("Answer").innerHTML = "&nbsp;";
  document.getElementById("TimerVal").innerHTML = document.getElementById("Timer").getAttribute("value");
  updateTimer();
  var precision = parseInt(document.getElementById("Precision").getAttribute("value"));
  var number1 = Math.random() * 10;
  var number2 = Math.random() * 10;
  if ( precision == 0 ) {
    number1 = parseInt(number1);
    number2 = parseInt(number2);
  }
  document.getElementById("TopNumber").innerHTML = number1.toFixed(precision);
  document.getElementById("BottomNumber").innerHTML = number2.toFixed(precision);
  var answer = 0;
  var opHtml = "";
  var operation = document.getElementById("Operation").getAttribute("value");
  switch(operation) {
    case "addition":
      opHtml = "&#43;";
      answer = number1 + number2;
      break;
    case "subtraction":
      opHtml = "&#150;";
      answer = number1 - number2;
      if( number1 < number2 ) {
        answer = number2 - number1;
        document.getElementById("TopNumber").innerHTML = number2.toFixed(precision);
        document.getElementById("BottomNumber").innerHTML = number1.toFixed(precision);
      }
      break;
    case "multiplication":
      opHtml = "&#215;";
      answer = number1 * number2;
      break;
    case "division":
      opHtml = "&#247;";
      answer = number2;
      number2 = number1;
      number1 = answer * number2;
      document.getElementById("TopNumber").innerHTML = number1.toFixed(precision);
      document.getElementById("BottomNumber").innerHTML = number2.toFixed(precision);
      break;
    default:
      // default to addition...
      document.getElementById("Operation").setAttribute("value","addition");
      opHtml = "&43;";
      answer = number1 + number2
  }
  document.getElementById("Operator").innerHTML = opHtml;
  //document.getElementById("Answer").setAttribute("value", answer.toFixed(precision));
  document.getElementById("Answer").innerHTML = answer.toFixed(precision);
  return true;
}

// change the mathematical operation in use
function newCard(newop)
{
  document.getElementById("TimerVal").innerHTML = document.getElementById("Timer").getAttribute("value");
  var allowedOperations = ["addition","subtraction","multiplication","division"];
  if (allowedOperations.indexOf(newop) == -1) {
    return false;
  }
  document.getElementById("Operation").setAttribute("value",newop);
  cardInit();
}

function updateTimer()
{
  var currentTimer = parseInt(document.getElementById("TimerVal").innerHTML)
  var elementsArray = document.getElementsByClassName("newproblem");
  if (currentTimer > 0) {
    document.getElementById("Answer").style.visibility = "collapse";
    for ( i=0; i < elementsArray.length; i++ ) {
        if ( elementsArray[i].tagName == "DIV" ) {
            elementsArray[i].style.visibility = "hidden";
        }
    }
    var t = setTimeout(updateTimer,1000);
    currentTimer = currentTimer - 1;
    document.getElementById("TimerVal").innerHTML = currentTimer.toString();
  } else {
    document.getElementById("Answer").style.visibility = "visible";
    for ( i=0; i < elementsArray.length; i++ ) {
        //alert(elementsArray[i].tagName);
        if ( elementsArray[i].tagName == "DIV" ) {
            elementsArray[i].style.visibility = "visible";
        }
    }
  }
}
