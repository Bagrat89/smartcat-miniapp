const tg = Telegram.WebApp;

tg.ready();
tg.expand();
tg.MainButton.hide();

let historyStack=['main'];

function showPage(id){
document.querySelectorAll('.page')
.forEach(p=>p.classList.remove('active'));

document.getElementById(id).classList.add('active');
historyStack.push(id);
}

function goBack(){
if(historyStack.length>1){
historyStack.pop();
const prev=historyStack.at(-1);

document.querySelectorAll('.page')
.forEach(p=>p.classList.remove('active'));

document.getElementById(prev).classList.add('active');
}else{
tg.close();
}
}

document.querySelectorAll('[data-action]').forEach(btn=>{

btn.addEventListener('click',()=>{

const action=btn.dataset.action;

if(action==='back') goBack();

else if(action==='go-to-features') showPage('features');
else if(action==='go-to-market') showPage('market');
else if(action==='go-to-services') showPage('services');
else if(action==='go-to-socials') showPage('socials');
else if(action==='go-to-donate') showPage('donate');

else if(action==='go-to-bot'){
tg.close();
setTimeout(()=>window.open('https://t.me/Alicesmartcat_bot','_blank'),200);
}

else if(action==='special-function'){

const fn=btn.dataset.function;

tg.sendData(JSON.stringify({
action:"special_function",
function:fn
}));

tg.showAlert("Запускаем функцию в боте...");
setTimeout(()=>tg.close(),500);
}

else if(action==='pay-crypto')
tg.showAlert('Crypto soon');

else if(action==='pay-card')
tg.showAlert('Card soon');

else if(action==='pay-stars')
tg.showAlert('Telegram Stars soon');

});

});