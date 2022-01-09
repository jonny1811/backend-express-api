# Backend-Express-Api

This is a simple example Node.js API with Express, Typescript, 
Sequelize and Sqlite3 documented with swagger

## Build
```
npm run build
```

## Starting Project
```
npm start
```

## Lauch Development Mode
```
npm run dev
```

## Base Route
```
http://localhost:9000/api
```

## Documentation Route
```
http://localhost:9000/api/docs
```

## Routes
```
GET    - http://localhost:9000/api/users/read       - Obtain all Users profiles
GET    - http://localhost:9000/api/users/read/:id   - Obtain a User profile
POST   - http://localhost:9000/api/users/create     - Create a User profile
PUT    - http://localhost:9000/api/users/update/:id - Update a User profile
DELETE - http://localhost:9000/api/users/delete/:id - Delete a User profile
```