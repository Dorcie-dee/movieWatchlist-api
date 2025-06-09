movieWatchlist-api

For easy reading, try accesing this using my postman documentation link: https://documenter.getpostman.com/view/42782764/2sB2x3otPZ. This is accessible until I unpublish it
 
Else, you can view same documentation here!




Hello! and welcome to my movieWatchlist-api. I'll be guiding you on how to understand and use my api.

Note that this was built with the below functionalities in mind and might not be as sophisticated as you'd like it to be. But i'd be happy if you have a look at it and leave a like or follow :)

FUNCTIONALITIES involve:
Users can:
● Register & log in.
● Add movies they want to watch.
● Mark a movie as "watched" or "not watched."
● Remove a movie from their list.

I know you'll be impressed with what I did with regards to the functionalities already mentioned. So if you are looking for more sophistication, just send me a message and I'd be honoured to work with you on your unique ideas.

Looking forward to your likes and messages.
Enjoy your stay in my repo ^_^

﻿

Authentication
This folder houses the signup and login endpoints.

Here, a user can register on the platform and also gain access into their dashboard by logining into our system.

﻿

POST
liveRegister
https://moviewatchlist-api.onrender.com/api/auth/register
Register User Endpoint
This endpoint is used to register a new user in the system. It accepts user credentials and creates a new account.

HTTP Method
POST

Request URL
http://localhost:6002/api/auth/register

Request Parameters
The request body should be in JSON format and must include the following parameters:

email (string): The email address of the user. This will be used for account identification and communication.
password (string): The password for the user's account. It should meet the security requirements defined by the system.
Example Request Body
JSON
{
  "email": "user@heyya.com",
  "password": "yourpassword"
}
Expected Response
On successful registration, the server will respond with a status code of 201 Created and a JSON object containing a message.

Example Response
JSON
{
  "message": ""
}
Notes
Ensure that the email address provided is valid and not already in use.
Passwords should adhere to any specified security policies (e.g., length, complexity).
If the registration fails, the server may return different status codes and error messages indicating the reason for failure.
﻿

Authorization
Bearer Token
Token
<token>
Request Headers
Content-Type
application/json
Body
raw (json)
json
{
  "email": "**@**.com",
  "password": "*************"
}

POST
liveLogin
https://moviewatchlist-api.onrender.com/api/auth/login
Login API
This endpoint allows users to authenticate by providing their email and password. Upon successful authentication, a token is returned, which can be used for subsequent requests that require authentication.

Request
Method: POST
Endpoint: https://moviewatchlist-api.onrender.com/api/auth/login
Content-Type: application/json
Request Body
The request body must be in JSON format and include the following parameters:

email (string): The email address of the user attempting to log in.
password (string): The password associated with the user's account.
Example Request Body:

JSON
{
  "email": "user@heyya.com",
  "password": "yourpassword"
}
Response
Status Code: 200 OK
Content-Type: application/json
Response Body
On successful authentication, the response will contain a JSON object with the following structure:

token (string): A token that can be used for authenticated requests.
Example Response Body:

JSON
{
  "token": "your_auth_token"
}
Notes
Ensure that the email and password are correct to receive a valid token.
The token should be stored securely and included in the headers of subsequent requests that require authentication.
﻿

Body
raw (json)
json
{
   "email": "**@**.com",
  "password": "*************"
}

Movies
This folder allows a user to effortlessly add a new movie to their collection. Also, the user can access all their saved movies; be it watched or not watched at a go. All the user has to do, is to use the GET method.

Likewise, a user can either update the status of a movie in their collection by specifying whether it has been watched or not.

And lastly, one can delete a movie after watching or when they decide to not have anything to do with it again.

﻿

POST
add movie
https://moviewatchlist-api.onrender.com/api/movies
Add Movie
This endpoint allows users to add a new movie to the database.

Request
Method: POST
Endpoint: https://moviewatchlist-api.onrender.com/api/movies
Request Body:
title (string): The title of the movie being added.
status (string): The current viewing status of the movie (e.g., "watched", "not watched").
Example Request Body:

JSON
{
  "title": "Blacklist",
  "status": "not watched"
}
Response
Upon successful creation of the movie, the API will respond with a 201 Created status and a JSON object containing the following fields:

userId (string): The ID of the user who added the movie.
title (string): The title of the movie.
status (string): The status of the movie.
createdAt (string): Timestamp of when the movie was created.
updatedAt (string): Timestamp of when the movie was last updated.
id (string): The unique identifier of the newly added movie.
Example Response:

JSON
{
  "userId": "",
  "title": "",
  "status": "",
  "createdAt": "",
  "updatedAt": "",
  "id": ""
}
This endpoint is useful for managing personal movie collections and tracking viewing statuses.

﻿

Authorization
Bearer Token
Token
<token>
Request Headers
Content-Type
application/json
Body
raw (json)
json
{
  "title": "Black CLover",
  "status": "not watched"
  }
GET
get movies
https://moviewatchlist-api.onrender.com/api/movies
Get Movies
This endpoint retrieves a list of movies from the API. It returns a collection of movie objects, each containing details about the movie.

Request
Method: GET
URL: https://moviewatchlist-api.onrender.com/api/movies
Response
Status Code: 200 OK
Content-Type: application/json
Response Body
The response body will be a JSON array of movie objects, each containing the following fields:

userId: A string representing the ID of the user associated with the movie.
title: A string representing the title of the movie.
status: A string indicating the current status of the movie.
createdAt: A string representing the date and time when the movie was created.
updatedAt: A string representing the date and time when the movie was last updated.
id: A unique identifier for the movie.
Notes
Ensure that the API is accessible and that you have the necessary permissions to retrieve the movie data.
The response will be an array, which may be empty if no movies are available.
﻿

Authorization
Bearer Token
Token
<token>
PATCH
update movie
https://moviewatchlist-api.onrender.com/api/movies/6846fb5d3d5537a458b887aa
PATCH /api/movies/{movieId}
This endpoint allows you to update the details of a specific movie in the database. By sending a PATCH request, you can modify attributes such as the status of the movie identified by its unique ID.

Request Parameters
The request body must be in JSON format and can include the following parameters:

status (string): The current status of the movie (e.g., "watched", "watching", "to watch"). This parameter is also optional and can be updated to indicate the user's progress with the movie.
Example Request Body
JSON
{
  "status": "watched"
}
Response Format
Upon a successful request, the server will respond with a status code of 200 and a JSON object containing the following fields:

message (string): A message indicating the result of the operation. This may be empty in some cases.
existingMovie (object): An object representing the existing movie's details after the update, including:
userId (string): The ID of the user who owns the movie.
title (string): The title of the movie.
status (string): The updated status of the movie.
createdAt (string): The timestamp when the movie was created.
updatedAt (string): The timestamp when the movie was last updated.
id (string): The unique identifier for the movie.
Example Response
JSON
{
  "message": "",
  "existingMovie": {
    "userId": "",
    "title": "",
    "status": "",
    "createdAt": "",
    "updatedAt": "",
    "id": ""
  }
}
Additional Notes
Ensure that the movie ID in the URL is valid and corresponds to an existing movie in the database.
This endpoint is particularly useful for users who want to keep their movie collection up-to-date with their viewing habits.
If any required parameters are missing or invalid, the server may return an error response indicating the issue.
﻿

Authorization
Bearer Token
Token
<token>
Body
raw (json)
json
{
    "title": "Kung Fu II",
  "status": "watched"
}
DELETE
delete movie
https://moviewatchlist-api.onrender.com/api/movies/684713b2c62e44ba35fc51af
DELETE /api/movies/{movieId}
This endpoint allows users to delete a specific movie from the database using its unique identifier.

Request Parameters
movieId (path parameter): The unique identifier of the movie to be deleted. This should be a valid movie ID present in the database.
Expected Response
Status Code: 200 OK
Content-Type: application/json
Response Body:
message: A confirmation message indicating the successful deletion of the movie. The message will be an empty string.
Notes
Ensure that the movie ID provided in the request is valid and corresponds to an existing movie in the database.
Deleting a movie is irreversible; once deleted, the movie cannot be recovered.
﻿

Authorization
Bearer Token
Token
<token>
POST
auth/register
http://localhost:6002/api/auth/register
﻿

Authorization
Bearer Token
Token
<token>
Request Headers
Content-Type
application/json
Body
raw (json)
json
{
  "email": "tired65@example.com",
  "password": "123456"
}

POST
auth/login
http://localhost:6002/api/auth/login
﻿

Body
raw (json)
json
{
  "email": "tired@example.com",
  "password": "123456"
}
JUMP TO
Introduction
Authentication
Movies
POST
auth/register
POST
auth/login
