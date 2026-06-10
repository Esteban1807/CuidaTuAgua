# 💧 CuidaTuAgua – Backend (.NET)

Este repositorio contiene el backend del proyecto **CuidaTuAgua**, desarrollado con **C#**, **.NET**, **Visual Studio 2022** y arquitectura por capas (Controller – Service – Repository).  
El objetivo del proyecto es ofrecer una API REST estructurada, modular y mantenible siguiendo buenas prácticas de desarrollo.

---

## 🛠 Tecnologías Utilizadas

* C# / .NET
* ASP.NET Core Web API
* Entity Framework Core
* Visual Studio 2022 (v17)
* SQL Server / PostgreSQL
* Git

---

## 📁 Estructura del Proyecto

```
CuidaTuAgua-Backend/
│── CuidaTuAguaBackend/
│   ├── Controllers/
│   ├── Services/
│   ├── Repositories/
│   ├── Models/
│   ├── Program.cs
│   ├── appsettings.json
│   └── CuidaTuAguaBackend.csproj
│── CuidaTuAguaBackend.sln
│── README.md
```

---

## ⚙️ Configuración del Entorno

### 1. Prerrequisitos

* .NET SDK 6.0 o superior
* Visual Studio 2022 (v17+) o VS Code con extensión C#
* SQL Server / PostgreSQL
* Git

### 2. Clonar el repositorio

```bash
git clone https://github.com/usuario/CuidaTuAgua-Backend.git
cd CuidaTuAgua-Backend
```

### 3. Configuración de la base de datos

En `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CuidaTuAgua;User Id=sa;Password=tu_password;"
  }
}
```

### 4. Aplicar migraciones

```bash
dotnet ef database update
```

---

## ▶️ Ejecución del Proyecto

### Con .NET CLI

```bash
dotnet run --project CuidaTuAguaBackend
```

### Con Visual Studio

Abrir `CuidaTuAguaBackend.sln` y presionar `F5` o el botón **Iniciar**.

La API estará disponible en:

```
http://localhost:5000
https://localhost:5001
```

---

## 📌 Endpoints Principales

| Método | Endpoint            | Descripción                    |
| ------ | ------------------- | ------------------------------ |
| GET    | /api/users          | Lista todos los usuarios       |
| POST   | /api/users          | Crear usuario                  |
| GET    | /api/users/{id}     | Obtener un usuario             |
| PUT    | /api/users/{id}     | Actualizar usuario             |
| DELETE | /api/users/{id}     | Eliminar usuario               |
| GET    | /api/water          | Consultar datos de agua        |
| POST   | /api/water          | Registrar consumo de agua      |

---

## 🧱 Arquitectura

### Controller

Maneja las solicitudes HTTP, validaciones de entrada y respuestas JSON.

### Service

Contiene la lógica de negocio del sistema.

### Repository

Comunicación con la base de datos mediante Entity Framework Core.

### Model

Representa las entidades y tablas del sistema.

---

## 📦 Construcción del Proyecto

### Generar el binario

```bash
dotnet publish -c Release -o ./publish
```

### Ejecutarlo

```bash
dotnet ./publish/CuidaTuAguaBackend.dll
```

---

## 🤝 Contribución

1. Hacer fork del repositorio
2. Crear una rama: `git checkout -b feature/nueva-funcionalidad`
3. Realizar cambios y hacer commit: `git commit -m "feat: descripción"`
4. Enviar un pull request

---

> ⚠️ **Nota:** Si el proyecto aún no tiene archivos de código fuente (`.cs`, controladores, modelos), asegúrate de incluirlos en el repositorio antes de compartirlo.
