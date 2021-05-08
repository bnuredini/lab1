Contents
------
* [Usage](#usage)
* [Tech stack](#tech-stack)
* [Directory Structure](#directory-structure)

Usage
------
Restore the project 
```
donet restore
```
and run it in the API directory.
```
cd API
dotnet watch run
```

Then, install the front-end packages
```
cd ../client
npm install
```
and start with `npm`
```
npm start
```

Tech stack
------
* ASP.Net 5.0
* React w/ TypeScript
* Some framework for styling (e.g., semantic-ui, bootstrap, etc.)
* Entity Framework
* SQLite for testing
    - Maybe SQL Server for the final build
* Axios

Directory Structure
------
    .
    ├── API             # Web API written with ASP.Net 5.0
    ├── Application     # Application business rules
    ├── Domain          # Enterprise business rules    
    ├── Persistence     # DbContext & Migrations
    └── client          # Front-end     
        ├── public          
        └── src              
