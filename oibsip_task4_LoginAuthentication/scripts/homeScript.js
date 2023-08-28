let homeList = JSON.parse(localStorage.getItem('homeList')) || [];

const Name = document.querySelector('.name-js');
const Email = document.querySelector('.email-js');
const Phone = document.querySelector('.phone-js');
const DOB = document.querySelector('.dob-js');

homeList.forEach(ele => {
  Name.innerHTML = ele.name;
  Email.innerHTML = ele.email;
  Phone.innerHTML = ele.phone;
  DOB.innerHTML = ele.dob;
});

document.querySelector('.c-btn').addEventListener('click',()=>{
  localStorage.removeItem('homeList');
  window.location.href = 'signIn.html';
});