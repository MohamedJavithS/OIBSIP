let signupList = JSON.parse(localStorage.getItem('signupList')) || [];

const pwd = document.querySelector('.Password-js');
const chk = document.querySelector('.showPassword');

function NoCutCopyPaste(){
  document.querySelector('.Input-js').addEventListener('paste', e => e.preventDefault());
  document.querySelector('.Input-js').addEventListener('drop', e => e.preventDefault());
  document.querySelector('.Input-js').addEventListener('copy', e => e.preventDefault());
  document.querySelector('.Input-js').addEventListener('cut', e => e.preventDefault());

  document.querySelector('.Password-js').addEventListener('paste', e => e.preventDefault());
  document.querySelector('.Password-js').addEventListener('drop', e => e.preventDefault());
  document.querySelector('.Password-js').addEventListener('copy', e => e.preventDefault());
  document.querySelector('.Password-js').addEventListener('cut', e => e.preventDefault());
}
NoCutCopyPaste();

chk.addEventListener('change',(event)=>{
  pwd.type = chk.checked ? "text": "password";
});

const Error = document.querySelector('.msg-js');

let homeList = [];

function authenticateUser() {
  const emphElem = document.querySelector('.Input-js');
  let emPh = emphElem.value.trimStart().trimEnd().toLowerCase();
  const passwordElem = document.querySelector('.Password-js');
  let password = passwordElem.value;

  if(emphElem.value === '' || passwordElem.value === ''){
    Error.classList.add('EmptyErrorMsg-js');
    Error.innerHTML = 'Missing Values.';
    setTimeout(()=>{
    Error.classList.remove('EmptyErrorMsg-js');
    },1000);
    return;
  }

  const user = signupList.find(user=>(user.email === emPh ||user.phone === emPh) && user.password === password);

  if (user) {
    Error.classList.add('successMsg-js');
    Error.innerHTML = `Welcome Back!`;
    setTimeout(()=>{
      Error.classList.remove('successMsg-js');
      window.location.href = 'home.html';
    },800);  
    homeList.push(user);
    saveToLocalStorage();
  } else {
    Error.classList.add('errorMsg-js');
    Error.innerHTML = 'Invalid Email id or password';
    setTimeout(()=>{
    Error.classList.remove('errorMsg-js');
    },1020);
  }
  emphElem.value = '';
  passwordElem.value = '';
}

document.querySelector('.signIn-btn').addEventListener("click", authenticateUser);

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'Enter') authenticateUser();
}); 

function saveToLocalStorage(){
  localStorage.setItem('homeList',JSON.stringify(homeList));
}
