$(document).ready(function() {
    $.get("mock/getCategories.json", function(data, status){
        createCategories(data)
        postSubCategories()
      })
})

// permet de générer des balises de type pannel/collapse pour chaque data
function createCategories(data) {
    var container = $('div.panel-group');
    var categories = data.categories
    for(var i = 0; i < categories.length; i++) {
        var myCategory = categories[i]
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

function postSubCategories() {
    $("[title='sub_cat']").click(function() {
        let subCatText = ($(this).text())
        let subCatId = ($(this).attr("id"))
        console.log(subCatText)
        sessionStorage.setItem("repToPost", subCatId);
        sessionStorage.setItem("subCatName", subCatText);
        document.location.href="test.html" 
    })
}