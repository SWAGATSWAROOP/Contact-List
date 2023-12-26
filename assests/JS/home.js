let  formPhone = document.getElementById('form-phone');
let formName = document.getElementById('form-name');
let validPhone = document.getElementById('valid-phone');
let validName = document.getElementById('valid-name');
let regexName = /^[6-9]\d{9}$/;
let form = document.getElementById('form');
let boolvalid1 = false;
let boolvalid2 = false;

function hasNumbers(a){
    return /[^a-zA-Z\s]/g.test(a);
}

formName.addEventListener('input',()=>{
    if(hasNumbers(formName.value)){
        validName.style.visibility = "visible"; 
        boolvalid1 = false;
    }
    else{
        validName.style.visibility = "hidden";
        boolvalid1 = true;
    }
});

function isNumber(str){
    return /[^0-9]/g.test(str);
}

formPhone.addEventListener('input',()=>{
    if(formPhone.value.trim() !== "" && isNumber(formPhone.value))formPhone.value = "";
    else if(!regexName.test(formPhone.value) && formPhone.value.trim() !== ""){
        validPhone.style.visibility = "visible"; 
        boolvalid2 = false;
    }
    else{
        validPhone.style.visibility = "hidden";
        boolvalid2 = true;
    }
});

form.addEventListener('submit',(event)=>{
    if(!boolvalid1 || !boolvalid2)event.preventDefault();
});
