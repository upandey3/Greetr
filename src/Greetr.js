;(function (global, $) {
    
    "use strict";
    
    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };
    
    //The use of "new" is abstracted by the use of Greetr.init
    Greetr.init = function (firstName="", lastName="", language="en") {
        
        var self = this;
        self.firstName = firstName;
        self.lastName = lastName;
        self.language = language;
        
        self.validate();
    };
    
    // Any methods that should not be exposed to the client should be put here outside of Greetr
    // --- these objects will be found through scope chaining of the lexical environment --- // 
    var supportedLangs = ['en', 'es', 'fr'];
    
    var greetings = {
        en: 'Hello',
        es: 'Hola',
        fr: 'Bonjour'
    }
    
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos',
        fr: 'Comment ça va'

    }
    
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión',
        fr: 'Connecté'

    }
    // ------ //
    
    // Methods should go in the prototype to save memory
    Greetr.prototype = {
        
        // Returns the full name of person 
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        // Checks if the language is supported
        validate: function(){
            if (supportedLangs.indexOf(this.language) === -1){
                throw "Language not supported";   
            }
        },
        
        // Returns the informal greeting in the given language
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        // Returns the formal greeting in the given language 
        formalGreeting: function(){
            return formalGreetings[this.language] + ' ' + this.fullName() + '!';
        },
        
        // Calls the appropriate function depending on whether the greeting is formal or not
        greet: function(formal){
            var msg;
            
            // undefined or null formal value will be coerced to false
            if (formal){
                msg = this.formalGreeting()
            }
            else {
                msg = this.greeting();
            }
            
            if (console){
                console.log(msg);
            }
            
            return this; // making this function chainable
        },
        
        // Logs message onto the console when logged in
        log: function() {
            if (console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            return this; // making this function chainable
        },
        
        // Changes the language of the person
        setLang: function(language) {
            
            this.language = language;
            this.validate();
            return this; // making this function chainable
        },
        
        // Displays the greeting on the HTML
        HTMLGreeting: function(selector, formal){
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            
            var msg;
            // undefined or null formal value will be coerced to false
            if (formal){
                msg = this.formalGreeting()
            }
            else {
                msg = this.greeting();
            }
            
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            return this;
            
        }
    };
    
    //The newly created Greetr object should have the __proto__ pointing to Greetr.prototype
    Greetr.init.prototype = Greetr.prototype;
    global.G$ = global.Greetr = Greetr; //This will be saved in memory because of closure
    
    
}(window, jQuery));