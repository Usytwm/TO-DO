# TO-DO

## Requisitos previos

Antes de ejecutar este proyecto en tu máquina, asegúrate de tener instalado lo siguiente:

- [.NET SDK](https://dotnet.microsoft.com/download) - versión 8.0 o superior
- [MySQL](https://www.mysql.com/) - versión compatible con Entity Framework Core (EF Core)
- [Docker](https://www.docker.com/) (opcional) - si prefieres ejecutar el servidor de base de datos MySQL en un contenedor Docker

## Configuración del Proyecto

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Usytwm/TO-DO.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd TO-DO
   ```
3. Abre el archivo appsettings.json y configura la cadena de conexión a tu base de datos MySQL:
   ```json
   {
     "ConnectionStrings": {
       "MySqlConnection": "server=servidor;port=puerto;database=nombre-base-datos;user=usuario;password=contraseña;"
     }
   }
   ```

## Migraciones de la Base de Datos

Antes de ejecutar el proyecto, es necesario aplicar las migraciones a la base de datos. Sigue estos pasos para realizar las migraciones:

Abre una terminal en el directorio del proyecto.

Ejecuta el siguiente comando para crear las migraciones basadas en los modelos de tu aplicación:

```bash
dotnet ef migrations add <Nombre>
```

Si estás utilizando un contenedor Docker para la base de datos MySQL, asegúrate de tener la conexión adecuada configurada en el archivo appsettings.json.

Luego, aplica las migraciones a la base de datos ejecutando el siguiente comando:

```bash
dotnet ef database update
```

Esto aplicará todas las migraciones pendientes a tu base de datos.

### Instalación de Dependencias

Puedes instalar todas las dependencias necesarias para el proyecto con un solo comando utilizando el gestor de paquetes dotnet. Sigue estos pasos:

Abre una terminal en el directorio del proyecto.

Ejecuta el siguiente comando para restaurar todas las dependencias especificadas en el archivo ServerApp.csproj:

```bash
dotnet restore
```

Esto instalará automáticamente todos los paquetes NuGet necesarios para tu proyecto.

## Ejecución del Frontend en React

Para ejecutar el frontend en React, sigue estos pasos:

1. Abre una terminal en el directorio del frontend del proyecto.

2. Asegúrate de tener Node.js y npm instalados en tu máquina. Si no los tienes instalados, puedes descargarlos e instalarlos desde [Node.js](https://nodejs.org/).

3. Instala las dependencias del proyecto ejecutando el siguiente comando:

   ```bash
   yarn install
   ```

   Este comando instalará todas las dependencias necesarias para el proyecto, incluyendo React y otras bibliotecas utilizadas.

## Lanzando la aplicación

Después de que se completen las instalaciones, ya puedes iniciar el servidor de .Net y el servidor de desarrollo de react ejecutando los siguientes comandos:

### Backend (.NET)

1. Abre una terminal en el directorio raíz del proyecto.

2. Navega al directorio del backend ejecutando el siguiente comando:

   ```bash
   cd ServerApp
   ```

3. Inicia el servidor de .NET ejecutando el siguiente comando:
   ```bash
   dotnet run
   ```
   Este comando iniciará el servidor de .NET y comenzará a escuchar las solicitudes en el puerto configurado.

### Frontend (React)

1. Abre una nueva terminal en el directorio raíz del proyecto.

2. Navega al directorio del frontend ejecutando el siguiente comando:

   ```bash
   cd clientapp
   ```

3. Ahora, inicia el servidor de desarrollo de React ejecutando el siguiente comando:

   ```bash
   yarn start
   ```

   Esto iniciará el servidor de desarrollo de React y abrirá automáticamente tu navegador predeterminado con la aplicación en ejecución. Si no se abre automáticamente, puedes acceder a la aplicación desde http://localhost:3000.

Con ambos servidores en funcionamiento, podrás interactuar con la aplicación tanto desde el frontend como desde el backend.

Recuerda asegurarte de que el backend esté en ejecución antes de intentar acceder a la aplicación desde el frontend para garantizar una experiencia fluida
