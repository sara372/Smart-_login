

var nameSignin=document.getElementById("name")
var passwordSignin=document.getElementById("password");
var signupName=document.getElementById("namesignup");
var signupEmail=document.getElementById("emailsignup");
var signupPass=document.getElementById("passsignup");

var signUpArray = [];

var path = location.pathname.split('/');
var URL = ''
for (var i = 0; i < path.length-1 ; i++) {
    URL += '/' + path[i]
}
console.log(URL);

var username = localStorage.getItem('users')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}



//to get array from local storage when start
if (localStorage.getItem('data') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('data'))
}

//check inpugt of signup
function check() {

    if (signupName.value == "" || signupEmail.value == "" || signupPass.value == "") {
        return false
    } else {
        return true
    }
}


function emailexistance() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}

function signUp(){
    console.log("saraaa")  
    if(check()==false){
        document.getElementById("textp").innerHTML='<span class="text-danger m-3">All inputs is required</span>';
        return false;
    }
    signupData=
        {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPass.value,
        }
    if (signUpArray.length == 0) {
            signUpArray.push(signupData)
            localStorage.setItem('data', JSON.stringify(signUpArray))
            document.getElementById('textp').innerHTML = '<span class="text-success m-3">Success</span>'
            return true
        }  
      
     if (emailexistance() == false) {
            document.getElementById('textp').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    
     }
     else {
        signUpArray.push(signupData)
        localStorage.setItem('data', JSON.stringify(signUpArray))
        document.getElementById('textp').innerHTML = '<span class="text-success m-3">Success</span>'

    }

}
//------------------------login--------------------------
//check inputs of login
function checkin() {

    if (nameSignin.value == "" || passwordSignin.value == "") {
        return false
    } else {
        return true
    }
}
function login() {
    if ( checkin() == false) {
        document.getElementById('error').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        
        return false
    }
    //console.log(nameSignin);


    for (var i = 0; i <  signUpArray.length; i++) {
        console.log(signUpArray);
        if (signUpArray[i].email.toLowerCase() == nameSignin.value.toLowerCase() && signUpArray[i].password.toLowerCase() == passwordSignin.value.toLowerCase()) {
            console.log("sarwa");
            localStorage.setItem('users', signUpArray[i].name);
            if (URL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

            } else {
                location.replace(URL + '/home.html')

            }
        }
         else {
            document.getElementById('error').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}
function logout() {
    localStorage.removeItem('users')
}

