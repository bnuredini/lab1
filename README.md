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
