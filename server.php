<?php

error_reporting(E_ERROR); 

include("config/config.php"); 
include("libs/maLibSQL.pdo.php");



if (isset($_GET["action"]))
{
	switch($_GET["action"]) {

		case "getarticle" : 
			// Renvoie tous les paragraphes de la base de données
			$SQL = "SELECT * FROM articles ORDER BY titre DESC"; 
			$res = parcoursRs(SQLSelect($SQL));
			$data = $res;
		break;

		case "getparagraphe" : 
		// Renvoie tous les paragraphes de la base de données
		$SQL = "SELECT * FROM paragraphes WHERE id_article='".$_GET['id_article']."' ORDER BY ordre ASC "; 
		$res = parcoursRs(SQLSelect($SQL));
		$data = $res;
	break;

		case "addarticle" : 

	if (isset($_GET["titre"])) $titre = $_GET["titre"]; 

	if ($titre) 			
	{
		
		$SQL = "INSERT INTO articles (titre) VALUES ('".$titre."')"; 
		$nextId = SQLInsert($SQL);
		$data["success"] = true; 
		$data["id"] = $nextId; 
	}
	break;

	case "addparagraphe" : 
	
		if (isset($_GET["contenu"])) $contenu = $_GET["contenu"]; 
		if (isset($_GET["id_article"])) $id_article = $_GET["id_article"]; 
		if ($contenu && $id_article) 			
		{
			
			$SQL = "INSERT INTO paragraphes (ordre, contenu, id_article) VALUES ('1','".$contenu."', '".$id_article."')"; 
			$nextId = SQLInsert($SQL);
			$data["success"] = true; 
			$data["id"] = $nextId; 
		}
		break;	

	case "delparagraphe" : 
	if (isset($_GET["id"])) $id = $_GET["id"];
	if ($id) {
		$SQL = "DELETE FROM paragraphes WHERE id='$id'";
		SQLUpdate($SQL);
		$data["success"] = true; 
	}	
	break;

	case "upparagraphe" : 
	if (isset($_GET["contenu"])) $contenu = $_GET["contenu"]; 
	if (isset($_GET["id"])) $id = $_GET["id"];

	if ($id && $contenu) {
		$SQL = "UPDATE paragraphes SET contenu='$contenu' WHERE id='$id'";
		SQLUpdate($SQL);
		$data["success"] = true;
	}

	break;

	}
}

echo json_encode($data);
?>

