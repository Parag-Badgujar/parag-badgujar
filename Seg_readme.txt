Note : Swagger is also implemented, you can also test it on bellow link :-

http://localhost:3000/api-docs/#/

Assumption : -
	Postgresql database is used and have following table.
	
create table sales(
	ID serial primary key,
	UserName varchar,
	Amount int,
	RegistrationDate timestamp
)

Note : Node module folder is not included, so first run npm install command
		then npm start command to run project.
		Also change database host,database name,password of your database.