// Hello! This module are made for performing payment via payment widget of payment system PayBox.
// ToDo list
// 1. add ofd data \\ done
// 2. att adjust settengs
// 3. Need to mage a checking data dor optional data filling!


(function (p, a, y, b, o, x) {
    o = p.createElement(a);
    x = p.getElementsByTagName(a)[0];
    o.async = 1;
    o.src = 'https://widget.paybox.money/v1/paybox/pbwidget.js?' + 1 * new Date();
    x.parentNode.insertBefore(o, x);
})(document, 'script'); //

export default class merchant  {

    #data = {
        token: 'GuyueDCjFrQnGmANMyIv6QV7U2G1s0gh',
        payment: {
            order: "999999",    // should be string, or widget croshed !important
            amount: "10",
            currency: "RUB",
            // language : 'ru',   // !important
            description: "Описание заказа",
            expires_at: "2020-12-12 00:00:00",
            param1: "string",
            param2: "string",
            param3: "string",
            test: 1,  
            options: {
                callbacks: {
                    result_url: '',  // !important if null - internal error of servise
                    check_url: null,
                },
                custom_params: {},
                user: {
                    email: "user@test.com",
                    phone: "77777777777",
                },
                receipt_positions: []
            }
            },
        successCallback: function (payment) {    //!important What thisfunction should to do
            //...
        },
        errorCallback: function (payment) {
            //...
        }

    }

   constructor(token = 'GuyueDCjFrQnGmANMyIv6QV7U2G1s0gh'){
      this.#data.token = token;
    //   console.log(this.token)
   }

   
   set language (lang) {
        switch(lang) {
            case 'ru': 
                this.#data.payment.language = 'ru';  
                break;
            case 'en': 
                this.#data.payment.language = 'en';  
                break;
            case 'kz': 
                this.#data.payment.language = 'kz';  
                break;
        
            default:
               console.log('Ошибка, такого языка нет')
        }
    }

initPayment(  amount=10,  options){
 
    try {

        this.#data.payment.amount = this.#amountValidate(amount);
        
        if ( options.hasOwnProperty("receipt_positions") ){
             if (this.#ofdValidate(options.receipt_positions)) {
                // console.log("Данные options.receipt_positions", options.receipt_positions );
                this.#ofdFill(options.receipt_positions); 
            }  
        }

        if (options.custom_params) this.#data.payment.options.custom_params={...options.custom_params}
        
        this.#optionalDataFilling(options)
        this.#pay()
            
    }catch(e){

        console.log(e)

    }finally{

    }
    }
    #pay=() =>{                                                                         // !!!!!!!!!!!!!!!!!!!!!
        // const data = {...this.#data}
        let paybox = new window.PayBox(this.#data);
        // let paybox = new window.PayBox(data);
        paybox.create();
        // console.log(this.#data)
    }
    tech_ShowMerch = () =>{
        console.log(this.#data) 
    }
    #amountValidate = (amount) => {

        // console.log(amount, typeof(amount))

        if (amount==0) throw('Щшибка! Платеж на сумму о')

        if (typeof(amount)==='number') {
            amount = parseFloat(amount).toFixed(2);
            return amount
        }

        if (typeof(amount)==='string') {
            amount = amount.replace(/\s+/g, '');

            if (!amount.match( /^\d+?\.?\,?\d{0,10}$/ ))  {
                throw('Ошибка! Некорректное значение, могут быть только цыфры, символы "," или "." '); 
            }    

            amount = parseFloat(amount.replace(/,/, '.')).toFixed(2);
            return amount
        }
        
        throw('Некорректны ввод суммы платежа')
        
    }    

    #ofdValidate=(data) => {

        if (!data instanceof Array){throw('Ошибка в формате ОФД данных')}     

        data.forEach((value) => {
            if (!value instanceof Object) throw('Каждый элемент массива ОФД должке быть обьектом, включающим 4 ключа')

            if (Object.keys(value).length!==4) throw ("У обьекта должно быть 4 ключа")

            if ('count' in value & 'name' in value & 'tax_type' in value & 'price' in value ) {  } else {throw('поля заданы некоректно')}

            
        })

        return true
        
    }  


    #ofdFill = (data) =>{
      this.#data.payment.options.receipt_positions = [ ...data ]
    } 

    #optionalDataFilling=(options)=>{

        if (options.hasOwnProperty("order")) {
            this.#data.payment.order = options.order.toString() || this.data.payment.order.toString();
        }


        if (options.hasOwnProperty("description")) {
            this.#data.payment.description = options.description.toString() || this.data.payment.description.toString();
        }

        if (options.hasOwnProperty("currency")) {
            this.#data.payment.currency = options.currency.toString() || this.data.payment.currency.toString();
        }

        if (options.hasOwnProperty("expires_at")) {
            this.#data.payment.expires_at = options.expires_at.toString() || this.data.payment.expires_at.toString();
        }
        if (options.hasOwnProperty("test")) {
            this.#data.payment.test = options.expires_at.toString() || this.data.payment.expires_at.toString();
        }

        if (options.hasOwnProperty('result_url')){
            this.#data.payment.options.callbacks.result_url = options.result_url || this.data.payment.options.callbacks.result_url;
        }

        if (options.hasOwnProperty('check_url')){
            this.#data.payment.options.callbacks.check_url = options.check_url || this.data.payment.options.callbacks.check_url;
        }

        if (options.hasOwnProperty('email')){
            this.#data.payment.options.user.email = options.email || this.#data.payment.options.user.email;
        }

        if (options.hasOwnProperty('phone')){
            this.#data.payment.options.user.phone = options.phone || this.data.payment.options.user.phone;
        }

    }

    #bindOptions(property,options){

        if (options.hasOwnProperty(property)){

            this.#data.payment[property] = options[property].toString() || this.data.payment[property].toString();

        }
        
    }

    #settingObjectPayValues = () => {

    }

};


