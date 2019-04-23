let tblRepQ = new Map()
$(document).ready(function() {
    let mySubCatId = sessionStorage.getItem("repToPost")
    let myIdUser = sessionStorage.getItem("idUser")
// PROD remplacer par une requete post
    //     $.post("URL/services"+myIdUser, 
//     {
//         "idSubCat" : mySubCatId
//     },
//     function(data, status){
            // let subCat = data.subCat
            // let nbQuestions = subCat.questions.length
            // $('#instruction').text("Merci de répondre aux questions - "+subCat.name+" :")
            // createCategories(subCat)
            // getValuesInputs()
            // validateButton(nbQuestions)
//       });
    $.get("mock/getQuestions.json", function(data, status){
        let subCat = data.subCat
        let nbQuestions = subCat.questions.length
        $('#instruction').text("Merci de répondre aux questions - "+subCat.name+" :")
        createCategories(subCat)
        getValuesInputs()
        validateButton(nbQuestions)
      });
})

function createCategories(subCat) {
    var container = $('div.service_area');
    for(var i = 0; i < subCat.questions.length; i++) {
        var myQuestions = subCat.questions[i]
        container.append(
            '<div id="'+ myQuestions.id +'">'
        )
        let divQuestion = $('div#'+ myQuestions.id)
        divQuestion.append(
            '<br/><br/><div id="q_'+ myQuestions.id +'" class="row">'+ myQuestions.name +'</div><br/>',
            '<form id="reponsesTo_'+ myQuestions.id +'">'
        )
        let formRep = $('form#reponsesTo_'+ myQuestions.id)
        formRep.append(
            '<label class="checkbox-inline"><input type="radio" value="0">&nbsp;Non exploré</label>',
            '<label class="checkbox-inline"><input type="radio" value="1">&nbsp;Envisagé</label>',
            '<label class="checkbox-inline"><input type="radio" value="2">&nbsp;Expérimenté</label>',
			'<label class="checkbox-inline"><input type="radio" value="3">&nbsp;Industrialisé</label><br/>'
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
        // genertate json for post after click validate
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
    console.log(dataJSON);
    if(dataJSON != null) {
    // add
        //$.post(url,data,callback);
        // $.ajax({
        //     type: "POST",
        //     url: "URL/Services+myIdUser",
        //     // The key needs to match your method's input parameter (case-sensitive).
        //     data: JSON.stringify({ data: dataJSON }), //not sure about data & dataJSON
        //     contentType: "application/json; charset=utf-8",
        //     dataType: "json",
        //     success: function(data){alert(data);},
        //     failure: function(errMsg) {
        //         alert(errMsg);
        //     }
        // })
    }
    // and send in ajax
}