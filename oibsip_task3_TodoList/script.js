const todoList =JSON.parse(localStorage.getItem('todoList')) ||  [];
display();
let CompleteList =JSON.parse(localStorage.getItem('CompleteList')) || [];

document.querySelector('.save-js').addEventListener('click',()=>{updateTodo();});

function updateTodo(){
  const titleElem = document.querySelector('.title-js');
  let title = titleElem.value;

  const dateTimeElem = document.querySelector('.date-js');
  let dateTime = dateTimeElem.value;

  const descElem = document.querySelector('.desc-js');
  let desc = descElem.value;

  if(titleElem.value === '' || dateTimeElem.value === '' || descElem.value === ''){
    return;
  }

  todoList.push({title,dateTime,desc});
  titleElem.value = '';
  dateTimeElem.value = '';
  descElem.value = '';
  display();
  TodoSaveToLocalStorage();
}

function display(){
  let htmlPush = '';
  todoList.forEach((object, i) =>{
    const {title,dateTime,desc} = object;
    const html = `
    <div class = 'disp'>${title}</div>
    <div class= 'disp'>${dateTime}</div>
    <div class= 'disp'>${desc}</div>
    <div>
    <button class= 'del-btn disp'>Delete</button>
    <button class= 'compl-btn disp'>Complete</button>
    </div> 
    `; 
    htmlPush += html;
  });
  document.querySelector('.h1-js').innerHTML = 'Todo List';
  if(todoList.length === 0){
    document.querySelector('.op-body-js').innerHTML = 'No Records Found';
  }else{
    document.querySelector('.op-body-js').innerHTML = htmlPush;  
  }
  

  document.querySelectorAll('.del-btn').forEach((del,i)=>{
    del.addEventListener('click',()=>{
      todoList.splice(i,1);
      display();
      TodoSaveToLocalStorage();
    });
});

  /*****************************************/
  document.querySelectorAll('.compl-btn').forEach((compl,i)=>{
    compl.addEventListener('click',()=>{
      title = todoList[i].title;
      dateTime = todoList[i].dateTime;
      desc = todoList[i].desc;
      CompleteList.push({title,dateTime,desc});
      CompleteSaveToLocalStorage();
      completeDisplay();
      //console.log(CompleteList);
      todoList.splice(i,1);
      display();
      TodoSaveToLocalStorage();
    });
  }); 
}



function completeDisplay(){
  let ComplHtmlPush = '';
  CompleteList.forEach((object,i)=>{
    const {title,dateTime,desc} = object;
    ComplHtmlPush += `
    <div class = 'disp'>${title}</div>
    <div class= 'disp'>${dateTime}</div>
    <div class= 'disp'>${desc}</div>
    <div class='completed-js'>Completed</div> 
    `;
  });
  if(CompleteList.length === 0){
    document.querySelector('.op-body-js').innerHTML = 'No Records Found!';
  }else{
    document.querySelector('.op-body-js').innerHTML = ComplHtmlPush;
  }
}
const CompClearBtn = document.querySelector('.CompClear-btn');
CompClearBtn.classList.add('hideClearbtn');

document.querySelector('.complList-js').addEventListener('click',()=>{
 completeDisplay();
 if(CompClearBtn.classList.contains('hideClearbtn')){
  CompClearBtn.classList.remove('hideClearbtn');
  CompClearBtn.classList.add('dispCompClearBtn');
 }
 
 if(CompleteList.length === 0){
  CompClearBtn.classList.remove('dispCompClearBtn');
 }
 document.querySelector('.h1-js').innerHTML = 'Completed List';
});


document.querySelector('.TodoList-js').addEventListener('click',()=>{
  display();
  document.querySelector('.h1-js').innerHTML = 'Todo List';
  if(CompClearBtn.classList.contains('dispCompClearBtn') || CompClearBtn.classList.contains('CompClear-btn')){
    CompClearBtn.classList.add('hideClearbtn');
  }
  
});

document.querySelector('.CompClear-btn').addEventListener('click',()=>{
  CompleteList = [];
  CompleteSaveToLocalStorage();
  completeDisplay();
  
});


document.querySelector('.h1-js').innerHTML = 'Todo List';


function TodoSaveToLocalStorage(){
  localStorage.setItem('todoList',JSON.stringify(todoList));
}


function CompleteSaveToLocalStorage(){
  localStorage.setItem('CompleteList',JSON.stringify(CompleteList));
}