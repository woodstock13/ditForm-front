const URL = 'http://localhost:8080/dma-service/rest/dma';
$(document).ready(function() { 
        if (typeof(Storage) !== "undefined") {
            console.log('sessionStorage est bien supporté par votre browser')
            $("button#submit_connexion").click(function() {
                var mailValue = $.trim($("#formUserMail").val())
                var form = $("#formUserMail")
                if(mailNotEmpty(mailValue) && mailValidation(mailValue)){
                    postUserMail(mailValue)
                    sessionStorage.setItem("idUser", mailValue);
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

 function postUserMail(mail) {
     console.log("post sending")
     let dataJSON = {"email" : mail } 
     console.log(dataJSON)
         $.ajax({
             type: "POST",
             url: URL+"/user",
             data: JSON.stringify(dataJSON),
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function(data){succesStoreIdUser(data)},
             failure: function(errMsg) {alert(errMsg);}
         })
 }

function succesStoreIdUser(repData){
         sessionStorage.setItem("idUser", repData.customerId)
         document.location.href="categories.html"
}