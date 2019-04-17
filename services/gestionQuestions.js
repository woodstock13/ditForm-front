$(document).ready(function() {
    // PROD remplacer par une requete post
    $.get("mock/getQuestions.json", function(data, status){
        let subCat = data.subCat
        $('#instruction').text("Merci de répondre aux questions - "+subCat.name+" :")
        createCategories(subCat)
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