# Normative Calculator App

This application allows user to login and create, read, update, delete ingredients, categories and recipes. Basic usage is that user add ingredients (some are already seeded to DB), categories and than create recipes. App calculate cost of each ingredient and gives user overview of costs of each recipe based on chosen ingredients.

## Technologies

- .NET CORE 5
- Entity Framework with Microsoft SQL Server Express
- JWT for authentication
- ReactJS with Bootstrap UI

## Requirements

Please make sure you have .NET 5, Microsoft SQL Server Express installed on your local machine as application back-end will use IIS and MS SQL Server.

## Installation Backend

- Clone git repository on your local machine
- CD into app root folder

First you need to migrate and create database as follows:

- Open project in Visual Studio
- Open Package manager console
- Make sure that default selected project is JapTask1.Database
- Enter to command line:

```
Add-Migration InitialCreate_FirstStartup
```

```
Update-Database
```

-Hit F5 to run the project

## Installation Frontend

- CD into app root folder than CD into JapTask_Frontend

```
npm install
```

## Version

Version: 2.0
