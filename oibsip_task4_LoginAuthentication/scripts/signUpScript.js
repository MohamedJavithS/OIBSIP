function allowOnlyAlphabet(input){
  let regex = /[^a-zA-Z ]*/g;
  input.value = input.value.replace(regex, "");
}

function allowOnlyNumeric(input){
  let regex = /[^0-9]/gi;
  input.value = input.value.replace(regex,"");
}

function NoCutCopyPaste(){
  document.querySelector('.name-js').addEventListener('paste', e => e.preventDefault());
  document.querySelector('.name-js').addEventListener('drop', e => e.preventDefault());
  document.querySelector('.name-js').addEventListener('copy', e => e.preventDefault());
  document.querySelector('.name-js').addEventListener('cut', e => e.preventDefault());
   
  document.querySelector('.email-js').addEventListener('paste', e => e.preventDefault());
  document.querySelector('.email-js').addEventListener('drop', e => e.preventDefault());
  document.querySelector('.email-js').addEventListener('copy', e => e.preventDefault());
  document.querySelector('.email-js').addEventListener('cut', e => e.preventDefault());
  
  document.querySelector('.phone-js').addEventListener('paste', e => e.preventDefault());
  document.querySelector('.phone-js').addEventListener('drop', e => e.preventDefault());
  document.querySelector('.phone-js').addEventListener('copy', e => e.preventDefault());
  document.querySelector('.phone-js').addEventListener('cut', e => e.preventDefault());

  document.querySelector('.password-js').addEventListener('paste', e => e.preventDefault());
  document.querySelector('.password-js').addEventListener('drop', e => e.preventDefault());
  document.querySelector('.password-js').addEventListener('copy', e => e.preventDefault());
  document.querySelector('.password-js').addEventListener('cut', e => e.preventDefault());

  document.querySelector('.confirmPassword-js').addEventListener('paste', e => e.preventDefault());
  document.querySelector('.confirmPassword-js').addEventListener('drop', e => e.preventDefault());
  document.querySelector('.confirmPassword-js').addEventListener('copy', e => e.preventDefault());
  document.querySelector('.confirmPassword-js').addEventListener('cut', e => e.preventDefault());
}
NoCutCopyPaste();

const pwd = document.querySelector('.password-js');

const chk = document.querySelector('.showPassword');

chk.addEventListener('change',(event)=>{
 pwd.type = chk.checked ? "text" : "password";
});

const cpwd = document.querySelector('.confirmPassword-js');

const cchk = document.querySelector('.confirmShowPassword');

cchk.addEventListener('change',()=>{
 cpwd.type = cchk.checked ? "text" : "password";
});


let signupList = JSON.parse(localStorage.getItem('signupList'))||[];

function updateDetails(){
  const nameELem = document.querySelector('.name-js');
  let name = nameELem.value.trimStart().trimEnd();
  
  const emailElem = document.querySelector('.email-js');
  let email = emailElem.value.trimStart().trimEnd().toLowerCase();

  const phoneElem = document.querySelector('.phone-js');
  let phone = phoneElem.value;

  const dobElem = document.querySelector('.dob-js');
  let dob = dobElem.value;

  const passwordElem = document.querySelector('.password-js');
  let password = passwordElem.value;

  const confirmPasswordElem = document.querySelector('.confirmPassword-js');
  let confirmPassword = confirmPasswordElem.value;
   
  const Error = document.querySelector('.msg-js');

  if( nameELem.value === ''     && 
      emailElem.value === ''    &&
      phoneElem.value === ''    &&
      dobElem.value === ''      &&
      passwordElem.value === '' &&
      passwordElem.value === '' &&
      confirmPasswordElem.value === ''){
        Error.classList.add('errorMsg-js');
        Error.innerHTML = "Fill all the details";
        setTimeout(()=>{
          Error.classList.remove('errorMsg-js');
        },1500);
        return;
      }
      
      if(name.length === 0){
        nameELem.classList.add('FieldErrorMsg-js');
        nameELem.value = "Fill name field";
        setTimeout(()=>{
          nameELem.classList.remove('FieldErrorMsg-js');
          nameELem.value = '';
        },900);
        return;
      }

      const mailFormat =  /\S+@\S+\.\S+/;
      if(email.length === 0){
        emailElem.classList.add('FieldErrorMsg-js');
        emailElem.value = "Fill E-mail field";
        setTimeout(()=>{
          emailElem.classList.remove('FieldErrorMsg-js');
          emailElem.value = '';
        },900);
        return;
      }else if (!(emailElem.value.match(mailFormat))) {
        emailElem.classList.add('FieldErrorMsg-js');
        emailElem.value = "Incorrect E-mail";
        setTimeout(()=>{
          emailElem.classList.remove('FieldErrorMsg-js');
          emailElem.value = '';
        },900);
        return;
      }

      if(phone.length === 0){
        phoneElem.classList.add('FieldErrorMsg-js');
        phoneElem.value = "Fill phone number field";
        setTimeout(()=>{
          phoneElem.classList.remove('FieldErrorMsg-js');
          phoneElem.value = '';
        },900);
        return;
      }
      else if(phone.length !== 10){
        phoneElem.classList.add('FieldErrorMsg-js');
        phoneElem.value = "Phone number must contain 10 numbers";
        setTimeout(()=>{
          phoneElem.classList.remove('FieldErrorMsg-js');
          phoneElem.value = '';
        },900);
        return;
      }

      if(dob.length === 0){
        dobElem.classList.add('FieldErrorMsg-js');
        setTimeout(()=>{
          dobElem.classList.remove('FieldErrorMsg-js');
        },900);
        return;
      }
      

      if(password.length === 0){
        passwordElem.classList.add('FieldErrorMsg-js');
        passwordElem.value = "Fill password field";
        setTimeout(()=>{
          passwordElem.classList.remove('FieldErrorMsg-js');
          passwordElem.value = '';
        },900);
        return;
      }
      
      if(confirmPassword.length === 0){
        confirmPasswordElem.classList.add('FieldErrorMsg-js');
        confirmPasswordElem.value = "Fill password field";
        setTimeout(()=>{
          confirmPasswordElem.classList.remove('FieldErrorMsg-js');
          confirmPasswordElem.value = '';
        },900);
        return;
      }
    
    if(passwordElem.value !== confirmPasswordElem.value){
      Error.classList.add('errorMsg-js');
      Error.innerHTML = "Incorrect Confirm Password";
      confirmPasswordElem.value = '';
      setTimeout(()=>{
        Error.classList.remove('errorMsg-js');
      },1500);
      return;
    }


    
  
  const user = signupList.find(user => user.email === email || user.phone === phone);
  
  if (user) {
    Error.classList.add('errorMsg-js');
    Error.innerHTML = 'Already exists!';
    setTimeout(()=>{
    Error.classList.remove('errorMsg-js');
    },1000);
    emailElem.value = '';
    phoneElem.value = '';
    return;
  } else {
    signupList.push({name,email,phone,dob,password,confirmPassword});
    saveToLocalStorage();
    Error.classList.add('successMsg-js');
    Error.innerHTML = 'Registered Sucessfully!';
    setTimeout(()=>{
    Error.classList.remove('successMsg-js');
    window.location.href = 'signIn.html';
  },1000);
  }

  nameELem.value = '';
  emailElem.value = '';
  phoneElem.value = '';
  dobElem.value = '';
  passwordElem.value = '';
  passwordElem.value = '';
  confirmPasswordElem.value = '';
}

document.querySelector('.s-btn').addEventListener(('click'),()=>{
  updateDetails();
});


document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'Enter') updateDetails();
}); 

function saveToLocalStorage(){
  localStorage.setItem('signupList',JSON.stringify(signupList));
}

/*
const phoneError = document.querySelector('.phone-js');
phoneError.classList.add('PhoneErrorMsg-js');
phoneError.value = "Phone number must contain 10 numbers";
//phoneElem.value = 
setTimeout(()=>{
  phoneError.classList.remove('PhoneErrorMsg-js');
  phoneError.value = '';
  //phoneError.classList.add('phone-js');
},1500);
*/