## News-API
### Version 1.0

## newsfinder.tk/api
## 130.193.49.72/api


| **Method** | **Adress**      |  **Body**					      |  **Result**                                           |
|------------|-----------------|------------------------------------------------------|-------------------------------------------------------|
|   GET      |   /users/me     |  {} 						      |  возвращает информацию о пользователе (email и имя)   |
|   GET      |   /articles     |  {} 		  				      |  возвращает все сохранённые пользователем статьи      |
|   POST     |   /articles     |  {keyword, title, text, date, source, link и image}  |  создаёт статью с переданными в теле аттрибутами      |
|   DELETE   |   /articles/id  |  {} 	          				      |  удаляет сохранённую статью  по _id                   |


### Это бэкенд учебного проекта
	
### Автор - Stepan Popov
