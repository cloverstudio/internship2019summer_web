module.exports = {
    responseErrorLoginWrongEmail: {
        error_code: '1000',
        error_description: 'Krivi email'
    },
    responseErrorLoginWrongPassword: {
        error_code: '1001',
        error_description: 'Kriva lozinka'
    },
    responseErrorRegisterOIBAlreadyExists: {
        error_code: '1002',
        error_description: 'OIB se već koristi!'
    },
    responseErrorRegisterEmailAlreadyExists: {
        error_code: '1003',
        error_description: 'Email se već koristi!'
    },
    responseErrorForbbidenAccess: {
        error_code: '1004',
        error_description: 'Neovlašten pristup'
    },
    responseErrorUserDetailUnknownId: {
        error_code: '1005',
        error_description: 'Ne postoji korisnik za traženi ID'
    },
    responseErrorExpiredToken: {
        error_code: '1006',
        error_description: 'Sesija je istekla, potrebno se je ponovno prijaviti.'
    }
    
}