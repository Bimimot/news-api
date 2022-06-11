News-API
-----------
v.1.0.1
It's a backend for News-Finder project.
It was done during the training in the Yandex.Practicum.


URL
-----------
- stepan-popov.dev/news-api
- 141.8.198.35/news-api


Methods
-----------
| **Method** | **Routes**      |  **Body**			        		      			  |  **Response/Action**                                  |
|------------|-----------------|------------------------------------------------------|-------------------------------------------------------|
|   GET      |   /users/me     |  {} 											      |  Info about user (name, email)                        |
|   GET      |   /articles     |  {} 		  									      |  User's articles                                      |
|   POST     |   /articles     |  {keyword, title, text, date, source, link и image}  |  Save the new article                                 |
|   DELETE   |   /articles/{id}|  {} 	          				      				  |  Del thee article with  по _id                        |
|   POST     |   /signin       |  {email, password}				      				  |  Login			      			                      |
|   POST     |   /signup	   |  {email, password, name}  							  |  Registration                                         |


Authorization
-----------
All methods need auth
Delete method is available only to the author


Errors handler
-----------

| **Err code**    |  **Message**                        		|  **Reasons**    		                 					 					 		   |  
|-----------------|---------------------------------------------|------------------------------------------------------------------------------------------|
|   400	          |  Request data is not valid          		|  Data from response wasn't validated 						     	                       |
|   401           |  Authorization is needed               		|  No authorization header, or type of autorization isn't Bearer, or token is wrong        |
|   401           |  Email or password is wrong         		|  Sending wrong data to /signin route                                                     |
|   403           |  No rights to delete this article   		|  Method DEL with route /articles/{id} was called not by author     	  	 	  		   |
|   404           |  No articles    			         		|  Method GET with route /articles return nothing							               |
|   404           |  No user            			       		|  Method GET with route /users/me return nothing			   	 	   		               |
|   404           |  No card with this ID       	       		|  Method DEL with route /articles/{id} was called with wrong id		   	 	   		   |
|   404           |  Sorry, but URL is wrong	      		 	|  Call the wrong url					   	 	   					            		   |
|   409           |  Sorry, we have user with the same e-mail 	|  Method POST with route /signup was called with non-unique e-mail	  	 	   			   |
|   500           |  Sorry, we have an server error    	  		|  Any other error with request				 	 	  						   |

In the dev mode server return full err-message for codes 400 и 500.

Project's tasks
-----------

- API on the VPS, nginx was configured
- VPS uses Mongo DB
- Schemes & models Mongo
- Controllers & routes for methods
- Validation response data
- Autorization middleware to protect all routes
- Err-hadler middleware
- Passwords saves like hashs in the DB
- Logger saves info to the files: request.log и error.log 
- Сertificate for HTTPS was added 
- Server has .env file with secret key
- CORS was configured