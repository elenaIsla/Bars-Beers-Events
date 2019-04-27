# Project Name

## Description

A Web-App though which a user can create bars according to his/her favourite beer bars. 

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can create bars and check bars according to beer types.
-  **Login:** As a user I can login to the platform so that I can create bars and check bars according to beer types. 
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Bars** As a user I can add a bar so that I can share it with the community
-  **List bars/beers/users** As a user I want to see the bars/beers and users
-  **Search bars/beers** As a user I want to search bars and/or beers by name so that I know if it´s already in the platform
-  **List of reviews** As a user I can see an updated list of the latest reviews. 


## Backlog

User profile:
- upload my profile picture
- add favorite bars
- deleted favorite bars


Bar y review:
- upload toilets and beers pictures

Events:
- Create different events based on beers or bars ("Correbars")

Geo Location:
- add geolocation to bars when creating
- show bar in a map in bar detail page
- show all bar in a map in the bar list page


  
# Client

## Pages

| url | public | Functionality |
|-----|-------|---------------|
| `/` | true | landing page |
| `/signup` | true | Signup user |
| `/login` | true | login user |
| `/homePage` | false | Navigate in the App, view reviews|
| `/listBeers` | false | View list of beers|
| `/listBars` | false | View list of bars |
| `/listUsers` | false | View list of Users |
| `/CreateBar` | false | Create a bar and add a review|
| `/ProfileBar` | false | View profile of bar and add review |

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Bars Service
  - bar.list()
  - bar.search(terms)
  - bar.create(data)
  - bar.detail(id)
  - bar.addFavorite(id)
  - bar.removeFavorite(id) 
- Beer Service
  - beer.list()
  - beer.search(terms)
  - beer.create(data)
  - beer.detail(id)
- Bars Review
  - review.list()
  - review.create(data)
  - review.detail(id)
 


# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
neighbourhood -String
favoriteBeers - [ObjectID<Beer>]
favoriteBars - [ObjectID<Bar>]
reviews - [ObjectID<Review>]
userimage - String
```

Bar model

```
- barType - String // required
- name - String // required and unique,
- address: {
        street: String,
        neighbourhood: String, 
        city: String, 
    }, 
- category: {
        type: String,
        music: String, 
        disabled: String, 
    }, 
    BeersDraft: [{
        ObjectID<Beer>,
        price
    }]
    BeersBottle: [{
        ObjectID<Beer>,
        price
    }]
    creator: {type: ObjectId, ref: 'User'},
    location: { type: { type: String }, coordinates: [Number] },
```

Beer model

```
- name - String // required
- beerlogoImage - String
```

Review model

```
- title - String // required
- comment - String 
- creator -  [ObjectID<User>]
- bar - [ObjectID<Bar>]
- ratingBeer - Number // required
- ratingToilet - Number // required
- ratingMusic - Number // required
- image - String 
```
Event model

```
- title - String // required
- Desciption - String 
- creator -  [ObjectID<User>]
- bars - [ObjectID<Bar>]
- logo - String 
- city - String
```

## API Endpoints (backend routes)

## API routes:

### auth
|Method|Route|Functionality|
|---|---|---|
|GET|api/auth/me|Check session status|
|POST|api/auth/signup|Log in user to app and set user to session (Body: username, password)|
|POST|api/auth/login|Register user to app and set user to session (Body: username, password)|
|POST|api/auth/logout|Log out user from app and remove session|

### bbe
|POST|api/bars&events/createbar |Register bar to app |
|POST|api/bars&events/updatebar |Update bar to app |
|POST|api/bars&events/deletebar |Delete bar to app |
|POST|api/bars&events/createbeer |Create beer to app |
|POST|api/bars&events/updatebeer |Update beer to app |
|POST|api/bars&events/deletebeer |Delete beer to app |
|POST|api/bars&events/newreview |Register review to app |
|POST|api/bars&events/deletereview |Delete review to app |
....


/createBeer
## Links

[picture] Bars&Events Flow: https://drive.google.com/file/d/1I1nmH0IH_GJpsRBp-UKbCQw7Ozy7TP6u/view?usp=sharing

### Trello/Kanban

[https://trello.com/b/j01piI36/bars-and-events]

### Git

The url to your repository and to your deployed project

[https://github.com/elenaIsla/bars-beers-events-API]

[https://github.com/elenaIsla/Bars-Beers-Events]

[Deploy Link Backend](http://heroku.com)

[Deploy Link Frontend]()

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
