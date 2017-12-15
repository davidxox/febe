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

	if (isset($_GET["titre"])) $titre = htmlspecialchars($_GET["titre"]); // Avoid some hack

	if ($titre) 			
	{
		
		$SQL = "INSERT INTO articles (titre) VALUES ('".$titre."')"; 
		$nextId = SQLInsert($SQL);
		$data["success"] = true; 
		$data["id"] = $nextId; 
	}
	break;

	case "addparagraphe" : 
	
		if (isset($_GET["contenu"])) $contenu = htmlspecialchars($_GET["contenu"]); 
		if (isset($_GET["id_article"])) $id_article = $_GET["id_article"]; 
		if ($contenu && $id_article) 			
		{
			// Which Order ?? Max(order + 1)
			$SQL_max = "SELECT MAX(ordre) AS 'max' FROM paragraphes WHERE id_article='".$id_article."'"; 
			$res_max = parcoursRs(SQLSelect($SQL_max));
			$max = $res_max[0]['max'] + 1;
			
			$SQL = "INSERT INTO paragraphes (ordre, contenu, id_article) VALUES ('".$max."','".$contenu."', '".$id_article."')"; 
			$nextId = SQLInsert($SQL);
			$data["success"] = true; 
			$data["id"] = $nextId; 
		}
		break;	

	case "delparagraphe" : 
	if (isset($_GET["id"])) $id = $_GET["id"];
	if ($id) {
		$SQL = "DELETE FROM paragraphes WHERE id='".$id."'";
		SQLUpdate($SQL);
		$data["success"] = true; 
	}	
	break;

	case "upparagraphe" : 
	if (isset($_GET["contenu"])) $contenu = htmlspecialchars($_GET["contenu"]); 
	if (isset($_GET["id"])) $id = $_GET["id"];

	if ($id && $contenu) {
		$SQL = "UPDATE paragraphes SET contenu='".$contenu."' WHERE id='".$id."'";
		SQLUpdate($SQL);
		$data["success"] = true;
	}

	break;

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

echo json_encode($data);
?>

