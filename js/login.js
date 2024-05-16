'use strict'

const message = require('../modulo/config.js')

const btnLogin = document.getElementById('login')

async function loginValidation() {

    const inputEmail = document.getElementById('email').value
    const inputPassword = document.getElementById('password').value

    let userStatus = false

    const getUsers = async () => {
        
        const url = 'http://localhost:5080/usuario:'

        try {

            const response = await fetch(url)
            const user = await response.json
            return user

            
        } catch (error) {

            alert(message.ERROR_INVALID_LOGIN)
            return null
        }

    }

    const usuarios  =  await getUsers()

    usuarios.forEach(function (usuario) {
        if(usuario.email === inputEmail && usuario.senha === inputPassword) {
            userStatus = true
            localStorage.setItem('userId', usuario.id)
            return

        }
    });


    if(!userStatus) {
        alert(message.ERROR_INVALID_CREDENTIALS)
    }
}

btnLogin.addEventListener('click', loginValidation)