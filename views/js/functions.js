function replaceNameInTheDom(id) {
    // This function will launch the AJAX request to get information about the article
    // And will fulfill the DOM

    // If the ID is null -> means that we are in case "Ajouter un article"
    if(id != "null") {
    $('#welcome_message').hide();
    $('#title_article').html(id);
    }
}