$(document).ready(function() { 
        if (typeof(Storage) !== "undefined") {
            console.log('sessionStorage est bien supporté par votre browser')
            $("button#submit_connexion").click(function() {
                var mailValue = $.trim($("#formUserMail").val())
                var form = $("#formUserMail")
                if(mailNotEmpty(mailValue) && mailValidation(mailValue)){
                    // postUserMail(mailValue)
                    sessionStorage.setItem("idUser", mailValue);
                    document.location.href="categories.html" // !!! à mettre dans le call back de postUserMail
                }
                else{
                    alert('Merci de saisir une adresse valide !')
                }
            })
          } else {
            // Sorry! No Web Storage support..
            alert("Merci d'utiliser un autre WebBrowser !")
          }
})

function mailNotEmpty(e) {
    if (e === "") {
        return false
    } else {
        return true
    }
}

function mailValidation(v) {
    if( (v.match('[@]') != null) && (v.length > 5) ){
        return true
    } else {
        console.error('no match!')
        return false
    }
}

// function postUserMail(mail) {
//     $.post("https://jsonplaceholder.typicode.com/todos/1", 
//     {
//         "mail" : mail
//     },
//     function(data, status){
//         //check status 
//         console.log(status)
//         //store
//         sessionStorage.setItem("idUser", data); //CHECK SI DATA.BIDULE !!!
//         document.location.href="test.html" //On prod, check 
//       });
// }