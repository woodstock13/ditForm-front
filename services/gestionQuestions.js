let tblRepQ = new Map()
const URL = 'http://localhost:8080/dma-service/rest/dma';
const mySubCatId = sessionStorage.getItem("repToPost")
const mySubCatName = sessionStorage.getItem("subCatName")
const myIdUser = sessionStorage.getItem("idUser")

$(document).ready(function() {
     $.get(URL+"/souscategories/"+mySubCatId, function(data, status){
         let questions = data
         console.log(questions)
         let nbQuestions = questions.length
         $('#instruction').text("Merci de répondre "+ nbQuestions +" aux questions de la catégorie - "+mySubCatName+" :")
         createCategories(questions)
         getValuesInputs()
         validateButton(nbQuestions)
         nextSubQuestions()
     });
})

function createCategories(questions) {
    var container = $('div.service_area');
    for(var i = 0; i < questions.length; i++) {
        var myQuestions = questions[i]
        console.log(myQuestions)
        container.append(
            '<div id="'+ myQuestions.reference +'">'
        )
        let divQuestion = $('div#'+ myQuestions.reference)
        divQuestion.append(
            '<br/><br/><div id="q_'+ myQuestions.reference +'" class="row">'+ myQuestions.reference +" - "+ myQuestions.description +'</div><br/>',
            '<form id="reponsesTo_'+ myQuestions.reference +'">'
        )
        let formRep = $('form#reponsesTo_'+ myQuestions.reference)
        formRep.append(
            '<label class="radio-inline"><input type="radio" name="optradio" value="0">&nbsp;Non exploré</label>',
            '<label class="radio-inline"><input type="radio" name="optradio" value="1">&nbsp;Envisagé</label>',
            '<label class="radio-inline"><input type="radio" name="optradio" value="2">&nbsp;Expérimenté</label>',
			'<label class="radio-inline"><input type="radio" name="optradio" value="3">&nbsp;Industrialisé</label><br/>'
        )
    }
    container.append(
        '<br/><button id="submit" class="btn btn-primary right">Valider</button>'
    )
}

function getValuesInputs() {
    $("[type='radio']").click(function(){
        let divQid = ($(this).parents('div:first').attr('id'))
        let valueQuestion = ($(this).val())
        //push tableau
        tblRepQ.set(divQid, valueQuestion)
        console.log(tblRepQ.size)
    })
}

function validateButton(nbQuestions) {
    $('button#submit').click(function(){
        if (tblRepQ.size >= nbQuestions) {
            postDataQuestions()
        } else {
            alert('Merci de répondre à toutes les questions de ce formulaire')
        }
    })
}

function postDataQuestions() {
    //mapToJsonObject
    let myIdUser = sessionStorage.getItem("idUser")
    let dataJSON = {};
    tblRepQ.forEach((value, key) => {
        var keys = key.split('.'),
            last = keys.pop();
        keys.reduce((r, a) => r[a] = r[a] || {}, dataJSON)[last] = value;
    });
    if(dataJSON != null) {
         $.ajax({
             type: "POST",
             url: URL+"/reponses/"+myIdUser,
             data: JSON.stringify(dataJSON),
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             success: function(data){
                 $("button#submit").attr("class","btn disabled")
                 $("button#submit").after("<p>&nbsp Ce questionnaire a été valider avec succès!<p/>")
             },
             failure: function(errMsg) {
                 alert(errMsg)
             }
         })
    }
}
function nextSubQuestions(nbQuestions) {
    $('button#goToNextQ').click(function(){
       let currentSubId = sessionStorage.getItem("repToPost")
       console.log(typeof(currentSubId))
        //passer un tableau, avec index num, pour se situer
       // document.location.reload(true);
    })
}