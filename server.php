<?php

error_reporting(E_ERROR); 

include("config/config.php"); 
include("libs/maLibSQL.pdo.php");


// API BACKEND 
if (isset($_GET["action"]))
{
	switch($_GET["action"]) {

		case "getarticle" : 
			// Get all articles
			$SQL = "SELECT * FROM articles ORDER BY titre DESC"; 
			$res = parcoursRs(SQLSelect($SQL));
			$data = $res;
		break;

		case "getparagraphe" : 
		// Get all paragraphs of an article
		$SQL = "SELECT * FROM paragraphes WHERE id_article='".$_GET['id_article']."' ORDER BY ordre ASC "; 
		$res = parcoursRs(SQLSelect($SQL));
		$data = $res;
	break;

		case "addarticle" : 

	if (isset($_GET["titre"])) $titre = htmlspecialchars($_GET["titre"]); 

	if ($titre) 			
	{
		// Insert an article with a value title
		$SQL = "INSERT INTO articles (titre) VALUES ('".$titre."')"; 
		$nextId = SQLInsert($SQL);
		$data["success"] = true; 
		$data["id"] = $nextId; 
	}
	break;

	case "addparagraphe" : 
		// Insert a paragraphe to an article
		if (isset($_GET["contenu"])) $contenu = htmlspecialchars($_GET["contenu"]); 
		if (isset($_GET["id_article"])) $id_article = $_GET["id_article"]; 
		if ($contenu && $id_article) 			
		{
			// Which Order ?? Max(order + 1)

			// Get back the max of the order
			$SQL_max = "SELECT MAX(ordre) AS 'max' FROM paragraphes WHERE id_article='".$id_article."'"; 
			$res_max = parcoursRs(SQLSelect($SQL_max));
			$max = $res_max[0]['max'] + 1;
			// Insert it
			$SQL = "INSERT INTO paragraphes (ordre, contenu, id_article) VALUES ('".$max."','".$contenu."', '".$id_article."')"; 
			$nextId = SQLInsert($SQL);
			$data["success"] = true; 
			$data["id"] = $nextId; 
		}
		break;	

	case "delparagraphe" : 
	if (isset($_GET["id"])) $id = $_GET["id"];
	// Delete a paragraph
	if ($id) {
		$SQL = "DELETE FROM paragraphes WHERE id='".$id."'";
		SQLUpdate($SQL);
		$data["success"] = true; 
	}	
	break;

	case "upparagraphe" : 
	// Update the content of a paragraph
	if (isset($_GET["contenu"])) $contenu = htmlspecialchars($_GET["contenu"]); 
	if (isset($_GET["id"])) $id = $_GET["id"];

	if ($id && $contenu) {
		$SQL = "UPDATE paragraphes SET contenu='".$contenu."' WHERE id='".$id."'";
		SQLUpdate($SQL);
		$data["success"] = true;
	}

	break;
	// Update the order of a paragraph
	case "upordrep" : 
	if (isset($_GET["id"])) $id = $_GET["id"];
	if (isset($_GET["ordre"])) $ordre = $_GET["ordre"];

	if ($id && $ordre) {
		$SQL = "UPDATE paragraphes SET ordre='".$ordre."' WHERE id='".$id."'";
		SQLUpdate($SQL);
		$data["success"] = true;
	}

	break;	

	}
}
// Return array to a JSON !
echo json_encode($data);
?>

