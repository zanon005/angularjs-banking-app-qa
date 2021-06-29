const locators = {
    CUSTOMER_LOGIN: {
        BTN_OPEN_LOGIN: '.borderM > :nth-child(1) > .btn', // Enter login page
        DROPDOWN_PICK_USER: '#userSelect',
        BTN_CONFIRM_LOGIN: 'form.ng-valid > .btn'
    },
    CUSTOMER_ACCOUNT: {
        WELCOME_MSG: '.borderM > :nth-child(1) > strong',
        BALLENCE : '.borderM > :nth-child(3) > :nth-child(2)',
        MENU: {
            DEPOSIT: {
                SCOPE: '.borderM > .container-fluid > .ng-scope',
                BTN: '[ng-class="btnClass2"]',
                VALUE_FORM: '.form-control',
                CONFIRM: 'form.ng-dirty > .btn'
            },
            TRANSACTION: {
                SCOPE: '.marTop',
                BTN: '[ng-class="btnClass1"]',
            },
            WITHDRAWL: {
                SCOPE: '.borderM > .container-fluid > .ng-scope',
                BTN: '[ng-class="btnClass3"]',
                VALUE_FORM: '.form-control',
                CONFIRM: 'form.ng-dirty > .btn'
            }
        }
    },
    MANAGER_LOGIN: {
        BTN_OPEN_LOGIN: ':nth-child(3) > .btn'
    }
}

export default locators