const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const registerBtn = document.getElementById('register');
const Email_here = document.getElementById('Email-here');
const Email_There = document.getElementById('Email-There');
const loginBtn = document.getElementById('login');
const signin = document.getElementsByClassName("sign-in")
const signup_name = document.getElementById('signup-name')
const signup_email = document.getElementById('signup-email')
const signup_address = document.getElementById('signup-address')
const signup_password = document.getElementById('signup-password')
const signup_cpassword = document.getElementById('signup-cpassword')
const signin_email = document.getElementById('signin-email')
const signin_password = document.getElementById('signin-password')
const forget_email = document.getElementById('forget-email')
const new_password = document.getElementById('new-password')
const new_cpassword = document.getElementById('new-cpassword')

registerBtn.addEventListener('click', () => {
    container1.classList.add("active");
    for (var i = 0; i < signin.length; i++) {
        signin[i].style.display = 'none';
    }
    signin_email.value = ''
    signin_password.value = ''
});

loginBtn.addEventListener('click', () => {
    container1.classList.remove("active");
    for (var i = 0; i < signin.length; i++) {
        signin[i].style.display = 'block';
    }
    signup_email.value = ''
    signup_address.value = ''
    signup_name.value = ''
    signup_password.value = ''
    signup_cpassword.value = ''
});

function show(e) {
    e.getElementsByClassName('fa-solid')[0].style.display = "block"
    e.getElementsByClassName('btntxt')[0].style.display = "none"
    e.disabled = true
    e.style.cursor = 'not-allowed'
    e.style.opacity = '0.7'
}

function hide() {
    const form_btn = document.querySelectorAll('.form-btn')
    for (let i = 0; i < form_btn.length; i++) {

        form_btn[i].getElementsByClassName('fa-solid')[0].style.display = "none"
        form_btn[i].getElementsByClassName('btntxt')[0].style.display = "block"
        form_btn[i].disabled = false
        form_btn[i].style.cursor = 'pointer'
        form_btn[i].style.opacity = '1'
    }
}

function setError(id, error) {
    document.getElementById(id).value = ''
    element = document.getElementById(id).parentElement
    element.parentElement.getElementsByClassName('error')[0].innerHTML = error
    element.classList.add('incorrect')
        if (element.getElementsByClassName('eye')[0] !== undefined) {
        element.getElementsByClassName('eye')[0].classList.add('border')
    }
}
function checkPassword(str) {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}



const user_data = [signup_name, signup_email, signup_address, signup_password, signup_cpassword, signin_email, signin_password, forget_email, new_password, new_cpassword]

user_data.forEach(inputs => {
    inputs.addEventListener('input', () => {
        inputs.parentElement.classList.remove('incorrect')
        inputs.parentElement.parentElement.getElementsByClassName('error')[0].innerHTML = ""
        if (inputs.parentElement.getElementsByClassName('eye')[0] !== undefined) {
            inputs.parentElement.getElementsByClassName('eye')[0].classList.remove('border')
        }
    })
})

document.getElementById("sign-up").addEventListener('submit', async (e) => {
    e.preventDefault();

    let setusername = false
    let setemail = false
    let setaddress = false
    let setpassword = false
    const Username = signup_name.value.trim()
    const Useremail = signup_email.value.trim()
    const Useraddress = signup_address.value.trim()
    const Password = signup_password.value.trim()
    const cPassword = signup_cpassword.value.trim()

    let z = checkPassword(Password)

    if (Username == "" || Username == null || Username.length == 0) {
        setError("signup-name", "Username is required.")
    }
    else if (Username.length < 5) {
        setError("signup-name", "Username is too short.")
    }
    else {
        setusername = true
    }

    if (Useremail == "" || Useremail == null || Useremail.length == 0) {
        setError("signup-email", "Email is required.")
    }
    else {
        setemail = true
    }

    if (Useraddress == "" || Useraddress == null || Useraddress.length == 0) {
        setError("signup-address", "Address is required.")
    }
    else if (Useraddress.length < 10) {
        setError("signup-address", "Please give a detailed address.")
    }
    else {
        setaddress = true
    }

    if (Password == "" || Password == null || Password.length == 0) {
        setError("signup-password", "Password is required.")
        setError("signup-cpassword", "Password is required.")
    }
    else if (Password.length < 8) {
        setError("signup-password", "Password is too short.")
    }
    else if (z == false) {
        setError("signup-password", "Password should have a-z,0-9,!@#$%^&*")

    }
    else if(cPassword == "" || cPassword == null || cPassword.length == 0){
        setError("signup-cpassword", "Please re-enter password here.")
    }
    else if (Password != cPassword) {
        setError("signup-cpassword", "Password does not match.")
    }
    else {
        setpassword = true
    }
    if (setusername == true && setemail == true && setaddress == true && setpassword == true) {
        x = document.getElementById('sign-up').getElementsByClassName('form-btn')[0]
        show(x)
        try {
            const response = await fetch('/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: Username, address: Useraddress, email: Useremail, password: Password }),
            });

            const result = await response.json();
            if (response.ok) {
                setTimeout(() => {
                    hide()
                    document.getElementById('signup-condirm').style.display = "flex"
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }, 2000);
            }
            else if (result.error) {
                hide()
                document.getElementById('Error').style.right = '20px'
                document.getElementById('blank').style.display = 'block'
            }
            else {
                hide()
                setError("signup-email", "Email already exist.")

            }
        } catch (error) {
            hide()
            document.getElementById('Error').style.right = '20px'
            document.getElementById('blank').style.display = 'block'
        }
    }

})

document.getElementById('sign-in').addEventListener('submit', async (e) => {
    e.preventDefault();

    Useremail = signin_email.value
    Userpassword = signin_password.value
    setemail = false
    setpassword = false

    if (Useremail == "" || Useremail == null || Useremail.length == 0) {
        setError('signin-email', "Email is required.")
    }
    else {
        setemail = true
    }
    if (Userpassword == "" || Userpassword == null || Userpassword.length == 0) {
        setError('signin-password', 'Password is required.')
    }
    else {
        setpassword = true
    }

    if (setemail == true && setpassword == true) {
        x = document.getElementById('sign-in').getElementsByClassName('form-btn')[0]
        show(x)
        try {
            const response = await fetch('/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: Useremail, password: Userpassword }),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('signin', result.signin)
                setTimeout(() => {
                    hide()
                    document.getElementById('signin-condirm').style.display = "flex"
                    setTimeout(() => {
                        location.replace('/')
                    }, 2000);
                }, 2000);
            }
            else if (result.email == false || result.email !== undefined) {
                hide()
                setError("signin-email", "Email may not exist.")
            }
            else if (result.password == false || result.password !== undefined) {
                hide()
                setError("signin-password", "Password is wrong.")

            }
            else if (result.error) {
                hide()
                document.getElementById('Error').style.right = '20px'
                document.getElementById('blank').style.display = 'block'
            }
        } catch (error) {
            hide()
            document.getElementById('Error').style.right = '20px'
            document.getElementById('blank').style.display = 'block'
        }
    }
})

document.getElementById('forgotten').addEventListener('submit', async (e) => {
    e.preventDefault();
    const Useremail = forget_email.value

    if (Useremail == "" || Useremail == null || Useremail.length == 0) {
        setError('forget-email', 'Email is required.')
    }
    else {
        x = document.getElementById('forgotten').getElementsByClassName('form-btn')[0]
        show(x)

        try {
            const response = await fetch('/forgotten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: Useremail }),
            });

            const result = await response.json();
            if (response.ok) {
                setTimeout(() => {

                    hide()
                    container2.classList.add("active");
                    for (var i = 0; i < signin.length; i++) {
                        signin[i].style.display = 'none';;
                    }
                }, 2000);
            }
            else if (result.error) {
                hide()
                document.getElementById('Error').style.right = '20px'
                document.getElementById('blank').style.display = 'block'
            }
            else {
                hide()
                setError("forget-email", "Email may not exist.")

            }
        } catch (error) {
            hide()
            document.getElementById('Error').style.right = '20px'
            document.getElementById('blank').style.display = 'block'
        }
    }
})


document.getElementById('setting-password').addEventListener('submit', async (e) => {
    e.preventDefault();
    Password = new_password.value
    cPassword = new_cpassword.value
    Useremail = forget_email.value


    let z = checkPassword(Password)
    if (Password == "" || Password == null || Password.length == 0) {
        setError('new-password', 'Please enter passowrd.')
    }
    else if (Password.length < 8) {
        setError('new-password', 'Password is too short.')
    }
    else if (z == false) {
        setError("new-password", "Password should have a-z,0-9,!@#$%^&*")

    }
    else if (cPassword == "" || cPassword == null || cPassword.length == 0) {
        setError('new-cpassword', 'Please enter passowrd.')
    }
    else if (Password == cPassword) {
        x = document.getElementById('setting-password').getElementsByClassName('form-btn')[0]
        show(x)
        try {
            const response = await fetch('/set-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: Useremail, password: Password }),
            });

            const result = await response.json();
            if (response.ok) {
                setTimeout(() => {

                    hide()
                    document.getElementById('password-changed').style.display = "flex"
                    setTimeout(() => {
                        hide()
                        window.location.reload()
                    }, 2000);
                }, 2000);
            }
            else if (result.error) {
                hide()
                document.getElementById('Error').style.right = '20px'
                document.getElementById('blank').style.display = 'block'
            }
        } catch (error) {
            hide()
            document.getElementById('Error').style.right = '20px'
            document.getElementById('blank').style.display = 'block'
        }
    }
    else {
        setError('new-cpassword', 'Password does not match.')
    }
})


const eye = document.getElementsByClassName('eye')
for (let i = 0; i < eye.length; i++) {
    eye[i].addEventListener('click', (e) => {
        open_eye = eye[i].getElementsByClassName('fa-eye')[0]
        close_eye = eye[i].getElementsByClassName('fa-eye-slash')[0]
        if (close_eye.style.display !== 'block') {
            close_eye.style.display = 'block'
            open_eye.style.display = 'none'
            eye[i].parentElement.getElementsByTagName('input')[0].type = 'text'
        }
        else {
            close_eye.style.display = 'none'
            open_eye.style.display = 'block'
            eye[i].parentElement.getElementsByTagName('input')[0].type = 'password'

        }
    })

}