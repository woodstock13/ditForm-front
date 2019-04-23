const URL = 'http://localhost:8080/dma-service/rest/dma';
let nextPage = false
$(document).ready(function() {
    $.get(URL+"/categories", function(data, status){
        console.log(data)
        createCategories(data)
        postSubCategories()
      })
})

// permet de générer des balises de type pannel/collapse pour chaque data
function createCategories(data) {
    var container = $('div.panel-group');
    var categories = data
    for(var i = 0; i < categories.length; i++) {
        var myCategory = categories[i]
        container.append(
            '<div id="cat_'+ myCategory.id +'" class="panel panel-default">',
        )
        var myId = 'cat_' + myCategory.id
        var panel_default = $('div#'+myId)
        var categoryName = (myCategory.name).toLowerCase().trim().replace(/\s/g, "")
        panel_default.append(
            '<a class="list-group-item" data-toggle="collapse" href="#collapse_'+ categoryName +'">'+ myCategory.name +'</a>',
            '<div class="panel-collapse collapse" id="collapse_'+ categoryName +'">',
        )
        var myName = 'collapse_' + categoryName
        var panel_collapse = $('div#'+myName)
        panel_collapse.append(
            '<div id="scat_'+ myCategory.id +'" class="panel-body">',
        )
        var myIds = 'scat_' + myCategory.id
        var subContainer = $('div#'+myIds)
        
        var subCategories = myCategory.listSubcategoryRS
        subCategories.forEach(function(question) {
          subContainer.append('<a title="sub_cat" id="'+ question.id +'"class="list-group-item" href="javascript:void(0)">'+ question.name +'</a>')
        })
    }
}

function postSubCategories() {
    $("[title='sub_cat']").click(function() {
        let subCatText = ($(this).text())
        let subCatId = ($(this).attr("id"))
        console.log(subCatText)
        sessionStorage.setItem("repToPost", subCatId)
        sessionStorage.setItem("subCatName", subCatText)
        document.location.href="test.html"
    })
}