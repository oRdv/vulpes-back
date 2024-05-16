const ERROR_INVALID_LOGIN= {status: false, status_code: 400, message: "O LOGIN ENCAMINHADO NA REQUISIÇÃO NÃO É VALIDO."}
const ERROR_INVALID_CREDENTIALS= {status: false, status_code: 400, message: "Credenciais inválidas. Tente novamente."}


module.exports = {
    ERROR_INVALID_LOGIN,
    ERROR_INVALID_CREDENTIALS
}