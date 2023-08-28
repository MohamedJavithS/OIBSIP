let calcResShow ='';
let calculate ='';

function update(value){
   calcResShow += value;
   show();
   if(value === ' ^ ') value = ' ** ';
   if(value === ' x ') value = ' * ';
   calculate += value;
}

document.querySelector('.btn-enter-js').addEventListener('click',()=>{
  if(document.querySelector('.result').innerHTML === ''){
    document.querySelector('.result').innerHTML = 'No value';
    return;
  } 
  calcResShow = Function("return " + calculate)(); 
  calculate =   Function("return " + calculate)();
  show();  
});

document.querySelector('.btn-clear-js').addEventListener('click',()=>{
  calcResShow = '';
  calculate = '';
  show();
});

document.querySelector('.btn-ans-js').addEventListener('click',()=>{
 
  if(document.querySelector('.result').innerHTML === ''){
    document.querySelector('.result').innerHTML = 'No value';
    return;
  } 
  calcResShow = Function("return " + calcResShow)(); 
  calculate =   Function("return " + calculate)();
  document.querySelector('.result').innerHTML = 'ans';
  show();
});


document.querySelector('.btn-del-js').addEventListener('click',()=>{
  if(calcResShow.charAt(calcResShow.length - 1) === ' '){
    calcResShow = calcResShow.slice(0,-2);
    calculate  = calculate.slice(0,-2);
  }
  else{
    calcResShow = calcResShow.slice(0,-1);
    calculate  = calculate.slice(0,-1);
  }
  show(); 
});


function show(){
  //console.log('calcResShow: '+calcResShow);
  //console.log('calculate: '+calculate);
  document.querySelector('.result').innerHTML = calcResShow;
}
