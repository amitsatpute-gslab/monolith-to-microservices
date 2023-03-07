# Monolith

Please follow following steps:

1. Install mysql
    -   docker run --name mono-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql

2. Set environment variables in .env file ( check example in .env.example file)

3. For database setup:
    - only database and tables run "sh ./setupDb.sh"
    - database and tables with mock data run "sh ./setupMockDb.sh"

4. Run "npm start" -> it will start monolith service
5. For react app:
    -  go to react-app folder and run "npm start"

6. For Api reference:
    - check src/api.rest file ( install REST client extension in VS code or use postman)

