$(document).ready(function() {
    $.get("mock/getQuestions.json", function(data, status){
        console.log(data)
      });
})

function createCategories(data) {
    var container = $('div.service_area');
    var subCat = data.subCat
    for(var i = 0; i < categories.length; i++) {
        var myQuestions = subCat.questions[i]
        container.append(
            '<div id="cat_'+ myCategory.id +'" class="panel panel-default">',
        )
        var myId = 'cat_' + myCategory.id
        var panel_default = $('div#'+myId)
        panel_default.append(
            '<a class="list-group-item" data-toggle="collapse" href="#collapse_'+ myCategory.name +'">'+ myCategory.name +'</a>',
            '<div class="panel-collapse collapse" id="collapse_'+ myCategory.name +'">',
        )
        var myName = 'collapse_' + myCategory.name
        var panel_collapse = $('div#'+myName)
        panel_collapse.append(
            '<div id="scat_'+ myCategory.id +'" class="panel-body">',
        )
        var myIds = 'scat_' + myCategory.id
        var subContainer = $('div#'+myIds)
        
        var subCategories = myCategory.sub_cat
        for (var j = 0; j < subCategories.length; j++) {
            var mySubCat = myCategory.sub_cat[j]
            subContainer.append('<a title="sub_cat" id="'+ mySubCat.id +'"class="list-group-item">'+ mySubCat.name +'</a>')
        }
    }
}