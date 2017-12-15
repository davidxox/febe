function replaceNameInTheDom(id, title=null) {
    // This function will launch the AJAX request to get information about the article
    // And will fulfill the DOM

    // If the ID is null -> means that we are in case "Ajouter un article"
    if(id != "null") {
    $('#welcome_message').hide();
      var html_edit = title+' '+
      '<div class="align-center">'+
      '<h4>Ajouter un nouveau paragraphe à l\'article</h4>'+
      '<textarea class="form-control newp" rows="5" id="newptext"></textarea>'+
      '<button type="button" class="btn btn-success" data-aid="'+id+'" id="addnewp">Ajouter un nouveau paragraphe</button>'+           
      '</div>';    
      $('#title_article').html(html_edit);
      
// Requête AJAX pour récupérer les paragraphes associés à l'article
/*

	Method : GET
	Body : null
	Query : id -> id de l'article à considérer
	Route : base_url/server.php?action=getparagraphe
  Réponse de l'API : 
    JSON comportant les articles et les ids
    id,
    titre
  Exemple de réponse : 
    [{
      id: 1,
      contenu : Paragraphe 1,
      ordre : 1
    },
    {
      id:2,
      contenu : Contenu paragraphe 2,
      ordre : 2
    }]

*/
      $('#loading').show(); // To wait the user
      $.getJSON(
        "server.php", 
        {	"action" : "getparagraphe",
          "id_article" : id }, 
            function (paragraphes) {
        $('#loading').hide(); // Time to hide this  
        var html_paragraphe = '';
              for (let i = 0; i < paragraphes.length; i++) {
           html_paragraphe += '<div class="info_paragraphe_first" data-id="'+paragraphes[i].id+'">'+
        '<button type="button" class="close position-close" data-id="'+paragraphes[i].id+'" data-aid="'+id+'">&times;</button>'+
        '<div class="info_paragraphe" data-id="'+paragraphes[i].id+'" data-aid="'+id+'">'+
        '<p class="div_content_paragraphe" data-id="'+paragraphes[i].id+'" data-content="'+paragraphes[i].contenu+'">'+paragraphes[i].contenu+'</p>'+
      '</div>'+
  '</div>';             
              }

    $('#paragraphes').html(html_paragraphe);
      })


    }
}
function draggable(id) {
$( function() {
  $( "#"+id).sortable({
    axis: 'y',
    update: function(event, ui) {
      var json_sort = [];
        var ordre = 1;
      $(".info_paragraphe").each(function() {
        var temp = {};
        temp["id_article"] = $(this).attr('data-aid');
        temp["id"] = $(this).attr('data-id')
        temp["ordre"] = ordre;
        json_sort.push(temp);
        ordre++;
      })
      // Lets update the order now !
        for (let i = 0; i < json_sort.length; i++) {

/*
	Method : PUT (maquillé en GET)
	Body : null
  Query : 
  id -> id du paragraphe à modifier
  ordre -> nouveau ordre
	Route : base_url/server.php?action=upordrep
  Réponse de l'API : 
    success -> true ou false
  Exemple de réponse : 
    [{
      success : true
    }]
*/
      $('#loading').show();
      $.getJSON(
        "server.php", 
        {	"action" : "upordrep",
          "ordre" : json_sort[i].ordre,
          "id" : json_sort[i].id}, 
            function (response) {  
              $('#loading').hide(); 
              console.log("success");
            }) 

        }
      console.log(json_sort);

    }
  });
  $( "#"+id+" .info_paragraphe" ).disableSelection();
} );
}


function transformPToInputAndInputToP(action, object=null) {
  if(action == "ptoinput" && object != null) {
      object.html('<textarea id="textarea-content" class="form-control" rows="5" data-id="'+object.children().attr('data-id')+'" data-aid="'+object.attr('data-aid')+'" data-content="'+object.children().attr('data-content')+'">'+object.children().attr('data-content')+'</textarea>');
  } else {
    $(".info_paragraphe > textarea").each(function() {
      $(this).parent().html('<p class="div_content_paragraphe" data-id="'+$(this).attr('data-id')+'" data-aid="'+$(this).attr('data-aid')+'" data-content="'+$(this).attr('data-content')+'">'+$(this).attr('data-content')+'</p>');      
    })

  }
}

function validateModify(object) {
  $('#editp').hide();
  $('#newp').hide(); 
/*
	Method : PUT (maquillé en GET)
	Body : null
  Query : 
  contenu -> nouveau paragraphe à modifier
  id -> id du paragraphe à modifier
	Route : base_url/server.php?action=upparagraphe
  Réponse de l'API : 
    success -> true ou false
  Exemple de réponse : 
    [{
      success : true
    }]
*/

$.getJSON(
  "server.php", 
  {	"action" : "upparagraphe",
    "contenu" : object.val(),
    "id" : object.attr('data-id') }, 
      function (response) {  
        $('#loading').hide(); 
        object.parent().html('<p class="div_content_paragraphe" data-content="'+object.val()+'">'+object.val()+'</p>'); 
      }) 
}

function addANewParagraphe() {
  $(document).on('click', '#addnewp', function() {

      var text = 'Nouveau paragraphe';
      if($('#newptext').val()) text = $('#newptext').val();
/*
	Method : POST (maquillé en GET)
	Body : null
  Query : 
  ordre -> 1 (par défaut)
  contenu -> contenu du paragraphe
  id_article -> id de l'article
	Route : base_url/server.php?action=addparagraphe
  Réponse de l'API : 
    id, -> id du paragraphe crée
    success -> true ou false
  Exemple de réponse : 
    [{
      id: 18,
      success : true
    }]
*/

$('#loading').show();    
    var id_article = $(this).attr('data-aid');
$.getJSON(
"server.php", 
{	"action" : "addparagraphe",
  "contenu" : text,
  "id_article" : id_article }, 
    function (response) {  
      $('#loading').hide(); 
     $('#paragraphes').append('<div class="info_paragraphe_first" data-id="p1">'+
      '<button type="button" class="close position-close" data-id="'+response.id+'">&times;</button>'+
        '<div class="info_paragraphe">'+
            '<textarea id="textarea-content" class="form-control" rows="5" data-id="'+response.id+'" data-aid="'+id_article+'" data-content="'+text+'">'+text+'</textarea>'+
    '</div>'+
'</div>');
$('#textarea-content').focus(); 
})
  })
}