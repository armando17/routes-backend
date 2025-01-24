## Descripción

Proyecto backend prueba técnica:<br>
Nest.js, Prisma con Mysql, SWAGGER


## Configuración

Configurar el archivo .env (.env-sample)
```bash
# Definir la url de la conección a la Base de datos MYSQL y Nombre de la Base de datos
DATABASE_URL="mysql://root:admin@127.0.0.1:3306/pruebatecnica"

# Definir la URl Externo REST API
EXTERNAL_API="http://localhost:8000/"

# Valores por defecto
CRYPTR_PHRASE=super_secret_key
JWT_SECRET=breakout
ACCESS_TOKEN=accessToken_breakout
REFRESH_TOKEN=refreshToken_breakout
ACCESS_TOKEN_EXP=1d
REFRESH_TOKEN_EXP=1d
LINK_TOKEN_EXP=2d

# Acceso Swagger
SWAGGER_USER=admin
SWAGGER_PASSWORD=admin
```


```bash
# Emular y levantar el servicio externo (db.json)
npx json-server db.json --port 8000
```

```bash
# Instalar las dependecias
$ npm install

# Generar el prisma Cliente
$ npx prisma generate

# Ejecutar la migración para crear la Base de datos, tablas y datos iniciales
$ npx prisma migrate deploy
```

## Levantar el Proyecto API REST

```bash
# watch mode (http://localhost:5000/)
$ npm run start:dev
```
## Acceso al Swagger

http://localhost:5000/docs#/

usuario: *admin*<br>
contraseña: *admin*