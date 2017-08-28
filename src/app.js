// This is demonstration of the Greetr mini-framework can be used

// Gets a new Greetr object using the G$ keyword
var g = G$("Utkarsh", "Pandey", "en");

// Uses chainable methods
g.greet().setLang('es').greet(true).log();


// Uses the Greetr object on the click of the login, by getting the selected language
$('#login').click(function() {
    
    var loginGrtr = G$('Utkarsh', 'Pandey');
    
    $('#loginDiv').hide();
    
    loginGrtr.setLang($('#language').val()).HTMLGreeting('#greeting', true).log();
})