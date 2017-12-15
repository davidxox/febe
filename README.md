# Devoir final front end / back end

API réalisée en PHP/MySQL 

## Getting Started

Tout d'abord configurer le fichier config/config.php ave les identifiants de la base de donnée.
Puis charger le fichier db/install.sql dans phpMyAdmin

## Documentation

base_url: localhost:8888

Pour le formatage du body nous utilisons x-www-form-urlencoded

### Format de la documentation

Method : POST, GET, DELETE, PUT…

Body : champ à mettre dans le body de la requête si nécessaire

Query : paramètres de la requête

route: base_url/la route

Réponse : la réponse de la requête

## API DOC

#### 1.1	Les Articles

    Récupération :
    	Method : GET
		Body : rien
		Query : email = "email du client"
	    	password = "mot de passe du client"
		Route : base_url/user/authenticate
		Réponse:id = "id du client"
	    		token = "le token pour accéder aux autres API"
        Method : GET
        Body : null
        Query : null
        Route : base_url/server.php?action=getarticle
    Réponse de l'API : 
        JSON comportant les articles et les ids
        id,
        titre
    Exemple de réponse : 
        [{
        id: 1,
        titre : Article 1
        },
        {
        id:2,
        titre: Article 2
        }]

    Création d'un article :
        Method : POST (maquillé en GET)
        Body : null
        Query : titre -> titre de l'article
        Route : base_url/server.php?action=addarticle
    Réponse de l'API : 
        id, -> id de l'article crée
        success -> true ou false
    Exemple de réponse : 
        [{
        id: 18,
        success : true
        }]

#### 1.2 Les paragraphes

    Récupération des paragraphes associés à un article
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

    Ajout d'un paragraphe associé à un article (en dernière position)

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

    Modification du contenu d'un paragraphe (lorsque la touche entrée est saisie)

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

    Suppression d'un paragraphe

        Method : DELETE (maquillé en GET)
        Body : null
        Query : id -> id du paragraphe à supprimer
        Route : base_url/server.php?action=delparagraphe
    Réponse de l'API : 
        success -> true ou false
    Exemple de réponse : 
        [{
        success : true
        }]

    Modification de l'ordre d'un paragraphe

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