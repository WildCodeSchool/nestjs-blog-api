# API d'article de blog

2 entités :

- User
- Article

## Auth

Routes :

Création d'un compte :

```
// Request
POST /auth/register
{
    "email": "thomas@durand.fr",
    "password": "123456789",
    "firstname": "Thomas",
    "lastname": "Durand"
}

// Response
{
    "email": "thomas@durand.fr",
    "firstname": "Thomas",
    "lastname": "Durand",
    "id": 7
}
```

Authentification :

```
// Request
POST /auth/login
{
    "email": "thomas@durand.fr",
    "password": "123456789"
}

// Response
{
    "expires_in": 3600,
    "access_token": "eyJhbGciOiJIUzI1NiJ9.bWFlbEB2aW5jZW50LmZy.88V_gwNWyh4qVAtSAVfmddP_p9xywhNjwPqr6fiT0p0"
}
```

## API articles

Lister tous les articles

```
// Request
GET /articles

// Response
[
 {
    "id": 1,
    "title": "Un titre",
    "content": "Le contenu de mon article de blog"
  }
]
```

Lire un article

```
// Request
GET /articles/:id

// Response
{
  "id": 1,
  "title": "Un titre",
  "content": "Le contenu de mon article de blog"
}
```

Créer un article. Il faut être authentifié en passant un access token.

```
// Request
POST /articles
Header:
  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.bWFlbEB2aW5jZW50LmZy.88V_gwNWyh4qVAtSAVfmddP_p9xywhNjwPqr6fiT0p0

// Response
{
  "title": "Un titre",
  "content": "Le contenu de mon article de blog"
}
```

Mettre à jour un article. Il faut être authentifié en passant un access token.

```
// Request
PUT /articles
Header:
  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.bWFlbEB2aW5jZW50LmZy.88V_gwNWyh4qVAtSAVfmddP_p9xywhNjwPqr6fiT0p0

// Response
{
  "id": 1,
  "title": "Un titre",
  "content": "Le contenu de mon article de blog"
}
```

Supprimer un article. Il faut être authentifié en passant un access token.

```
// Request
DELETE /articles/:id
Header:
  Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.bWFlbEB2aW5jZW50LmZy.88V_gwNWyh4qVAtSAVfmddP_p9xywhNjwPqr6fiT0p0
```

## Bonus

Actuellement, un utilisateur authentifié peut modifier et supprimer n'importe quel article.
Une amélioration consiste à ne permettre les modifications et suppresions que des articles dont l'utilisateur connecté est l'auteur.
Pour récupérer l'utilisateur connecté, tu peux regarder la méthode de création d'un article du controller des articles.
Pour émettre une erreur d'autorisation tu peux utiliser les exceptions directement incluses dans nest :

```
import { UnauthorizedException } from '@nestjs/common';

throw new UnauthorizedException();
```
