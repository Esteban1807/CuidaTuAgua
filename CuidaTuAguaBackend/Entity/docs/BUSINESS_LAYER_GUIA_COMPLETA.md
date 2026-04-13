# Business Layer — Guía Completa y Detallada

Esta es la guía definitiva para entender la Business Layer del proyecto. Explica **cada línea de código**, **por qué existe cada método**, **cómo funciona el flujo**, y **cómo implementar nuevas funcionalidades**.

---

## Tabla de contenidos

1. [¿Qué es la Business Layer?](#qué-es-la-business-layer)
2. [Estructura de carpetas](#estructura-de-carpetas)
3. [Las tres capas: Interfaz → Abstracta → Implementación](#las-tres-capas-interfaz--abstracta--implementación)
4. [Código real del proyecto](#código-real-del-proyecto)
5. [Análisis detallado de cada método](#análisis-detallado-de-cada-método)
6. [Flujo de datos completo](#flujo-de-datos-completo)
7. [DTOs vs Entidades](#dtos-vs-entidades)
8. [AutoMapper: La magia de la transformación](#automapper-la-magia-de-la-transformación)
9. [Cómo implementar para una nueva entidad](#cómo-implementar-para-una-nueva-entidad)
10. [Diagrama de arquitectura](#diagrama-de-arquitectura)
11. [Problemas comunes y soluciones](#problemas-comunes-y-soluciones)
12. [Checklist de implementación](#checklist-de-implementación)

---

## ¿Qué es la Business Layer?

La **Business Layer** (capa de lógica de negocio) es el **intermediario inteligente** entre:
- **Controladores** (que reciben requests HTTP del cliente)
- **Data Layer** (que accede a la base de datos)

### Su misión:
Cliente HTTP ↓ Controlador recibe JSON ↓ Business Layer procesa y valida ↓ Data Layer accede BD ↓ Business Layer transforma resultado ↓ Controlador devuelve JSON al cliente

### ¿Por qué no hacer esto directamente en el controlador?

**Razón 1: Reutilización**

Sin Business Layer:
•	ControladorA (Product) → BD
•	ControladorB (Product) → BD
•	ControladorC (Product) → BD → Código duplicado

Con Business Layer:
•	ControladorA → ProductBusiness → BD
•	ControladorB → ProductBusiness → BD
•	ControladorC → ProductBusiness → BD → Un solo lugar con la lógica

**Razón 2: Mantenibilidad**
Cambio en la lógica: Sin Business: Modificas 3 controladores Con Business: Modificas 1 clase Business

**Razón 3: Testabilidad**
Puedes testear la Business Layer sin HTTP Puedes mockear la Data Layer Separación clara de responsabilidades

**Razón 4: Escalabilidad**
Sin Business: El controlador hace todo Con Business: El controlador solo orquesta
Cuando crece el proyecto:
•	Nuevas validaciones → Business Layer
•	Nuevas transformaciones → Business Layer
•	El controlador sigue igual → Reutilizable

---

## Estructura de carpetas
Business/ ├── Interfaces/ │   └── baseBusiness/ │       └── IBaseBusiness.cs          ← Interface CRUD genérica ├── Implements/ │   └── baseBusiness/ │       ├── abstractBusiness/ │       │   └── ABaseBusiness.cs      ← Clase abstracta con DI │       └── impAbstract/ │           └── BaseBusiness.cs       ← Implementación genérica CRUD
├── DTOs/ │   └── ProductDTO.cs          ← DTO específico para Product └── Mappings/     └── AutoMapperProfile.cs    ← Configuración de AutoMapper

**Convención de nombres:**
- `I` + nombre = Interface (contrato)
- `A` + nombre = Abstract (estructura base)
- Nombre sin prefijo = Implementación concreta
- `base` = Es genérica, reutilizable para cualquier entidad

---

## Las tres capas: Interfaz → Abstracta → Implementación

### Capa 1: `IBaseBusiness<T, D>` — El Contrato

Ubicación: `Business/Interfaces/baseBusiness/IBaseBusiness.cs`
public interface IBaseBusiness<T, D> where T : BaseModel where D : BaseDto { Task<IEnumerable<D>> GetAllAsync(); Task<D> GetByIdAsync(Guid id); Task<D> CreateAsync(D dto); Task<D> UpdateAsync(D dto); Task<bool> DeleteAsync(Guid id); }

**¿Qué significa esto?**

- `IBaseBusiness<T, D>` = Una interfaz genérica que define operaciones CRUD para cualquier entidad.
- `T` = Tipo de entidad (ejemplo: `User`, `Product`, `Role`). **Debe heredar de `BaseModel`**.
- `D` = Tipo de DTO (ejemplo: `UserDto`, `ProductDto`). **Debe heredar de `BaseDto`**.

**¿Por qué dos genéricos (`T` y `D`)?**

Porque **no es lo mismo lo que guardas en la BD que lo que envías al cliente**:

Entidad en BD (T): User { Id: guid Email: "user@example.com" PasswordHash: "abc123xyz" ← NO QUIERES ENVIAR ESTO CreatedAt: "2024-01-01" Status: true }
DTO al cliente (D): UserDto { Id: guid Email: "user@example.com" Name: "Juan" CreatedAt: "2024-01-01" // PasswordHash NO APARECE - SEGURIDAD }

**Métodos de la interfaz:**

| Método | Entrada | Salida | ¿Qué hace? |
|--------|---------|--------|-----------|
| `GetAllAsync()` | Nada | `IEnumerable<D>` | Obtiene todas las entidades y las transforma a DTOs |
| `GetByIdAsync(Guid id)` | ID (GUID) | `D` o `null` | Busca una entidad por ID y la transforma a DTO |
| `CreateAsync(D dto)` | DTO | `D` | Crea una nueva entidad desde un DTO |
| `UpdateAsync(D dto)` | DTO | `D` | Actualiza una entidad existente |
| `DeleteAsync(Guid id)` | ID (GUID) | `bool` | Elimina una entidad (retorna éxito/fallo) |

---

### Capa 2: `ABaseBusiness<T, D>` — La Estructura Base

Ubicación: `Business/Implements/baseBusiness/abstractBusiness/ABaseBusiness.cs`

public abstract class ABaseBusiness<T, D> : IBaseBusiness<T, D> where T : BaseModel where D : BaseDto { protected readonly IBaseData<T> _data; protected readonly IMapper _mapper; protected readonly ILogger<ABaseBusiness<T, D>> _logger;
public ABaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<ABaseBusiness<T, D>> logger)
{
    _data = data;
    _mapper = mapper;
    _logger = logger;
}

// Métodos abstractos que las implementaciones deben definir
public abstract Task<IEnumerable<D>> GetAllAsync();
public abstract Task<D> GetByIdAsync(Guid id);
public abstract Task<D> CreateAsync(D dto);
public abstract Task<D> UpdateAsync(D dto);
public abstract Task<bool> DeleteAsync(Guid id);
}

**¿Qué hace?**

Esta clase abstracta:
1. **Inyecta las tres dependencias principales** en el constructor (Inyección de Dependencias)
2. **Centraliza la construcción** del constructor para todas las subclases
3. **Marca métodos como abstractos** para que las implementaciones concretas las definan

**Las tres dependencias inyectadas:**

1. **`IBaseData<T> _data`** — Repositorio genérico
   - Accede a la **capa de datos** (Data Layer)
   - Expone operaciones CRUD sobre la BD (obtenidas de `BaseData<T>`)
   - Es la responsable de comunicarse con Entity Framework Core
   - Ejemplo: `_data.GetAllAsync()`, `_data.CreateAsync(entity)`, `_data.UpdateAsync(entity)`

2. **`IMapper _mapper`** — AutoMapper
   - **Transforma entidades a DTOs** y viceversa
   - Evita escribir código de mapeo manual repetitivo
   - Se configura centralmente en DI (inyección de dependencias)
   - Ejemplo: `_mapper.Map<UserDto>(user)` convierte entidad `User` a DTO `UserDto`

3. **`ILogger<ABaseBusiness<T, D>> _logger`** — Logging
   - **Registra eventos, errores y información de debug**
   - Facilita diagnóstico y troubleshooting cuando algo falla
   - Integrado con el sistema de logging de .NET
   - Ejemplo: `_logger.LogError(ex, "Error en GetAllAsync")`

**¿Por qué es abstracta y no concreta?**

Porque queremos que cada Business pueda **personalizar su lógica** según necesidades:
- `UserBusiness` podría validar email único en `CreateAsync`
- `ProductBusiness` podría validar inventario en `UpdateAsync`
- La clase abstracta define la estructura, las implementaciones definen el comportamiento

---

### Capa 3: `BaseBusiness<T, D>` — La Implementación Genérica

Ubicación: `Business/Implements/baseBusiness/impAbstract/BaseBusiness.cs`

Esta es la implementación concreta **reutilizable para todas las entidades** sin lógica personalizada.

public class BaseBusiness<T, D> : ABaseBusiness<T, D> where T : BaseModel where D : BaseDto { public BaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<BaseBusiness<T, D>> logger) : base(data, mapper, logger) { }
// Métodos implementados...
}

---

## Código real del proyecto

Aquí está el código **exacto** que tienes en tu proyecto:

### `IBaseBusiness.cs` — La interfaz
using Entity.Model.baseModel;
namespace Business.Interfaces.baseBusiness { public interface IBaseBusiness<T, D> where T : BaseModel where D : BaseDto { Task<IEnumerable<D>> GetAllAsync(); Task<D> GetByIdAsync(Guid id); Task<D> CreateAsync(D dto); Task<D> UpdateAsync(D dto); Task<bool> DeleteAsync(Guid id); } }


**Explicación:**
- Define el **contrato** que todas las Business deben cumplir
- Es **genérica** (`<T, D>`) para ser reutilizable
- Define **5 operaciones CRUD** básicas

---

### `ABaseBusiness.cs` — La clase abstracta
using Business.Interfaces.baseBusiness; using Data.Interfaces.baseData; using Entity.dto.baseDto; using Entity.Model.baseModel; using Microsoft.Extensions.Logging;
namespace Business.Implements.baseBusiness.abstractBusiness { public abstract class ABaseBusiness<T, D> : IBaseBusiness<T, D> where T : BaseModel where D : BaseDto { protected readonly IBaseData<T> _data; protected readonly IMapper _mapper; protected readonly ILogger<ABaseBusiness<T, D>> _logger;
    public ABaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<ABaseBusiness<T, D>> logger)
    {
        _data = data;
        _mapper = mapper;
        _logger = logger;
    }

    public abstract Task<IEnumerable<D>> GetAllAsync();
    public abstract Task<D> GetByIdAsync(Guid id);
    public abstract Task<D> CreateAsync(D dto);
    public abstract Task<D> UpdateAsync(D dto);
    public abstract Task<bool> DeleteAsync(Guid id);
}
}

**Explicación:**
- **Inyecta 3 dependencias**: `_data`, `_mapper`, `_logger`
- **Guarda en propiedades protegidas** para que las subclases las usen
- **Declara métodos abstractos** (las subclases deben implementarlos)
- **Evita duplicación**: El constructor es igual para todas las Business

---

### `BaseBusiness.cs` — La implementación
using AutoMapper; using Business.Implements.baseBusiness.abstractBusiness; using Data.Interfaces.baseData; using Entity.dto.baseDto; using Entity.Model.baseModel; using Microsoft.Extensions.Logging;
namespace Business.Implements.baseBusiness.impAbstract { public class BaseBusiness<T, D> : ABaseBusiness<T, D> where T : BaseModel where D : BaseDto { public BaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<BaseBusiness<T, D>> logger) : base(data, mapper, logger) { }
    public override async Task<IEnumerable<D>> GetAllAsync()
    {
        try
        {
            var entities = await _data.GetAllAsync();
            return _mapper.Map<List<D>>(entities.ToList());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error en {nameof(GetAllAsync)}");
            throw;
        }
    }

    public override async Task<D> GetByIdAsync(Guid id)
    {
        try
        {
            var entity = await _data.GetByIdAsync(id);
            if (entity == null)
                return null;
            return _mapper.Map<D>(entity);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error en {nameof(GetByIdAsync)} con Id={id}");
            throw;
        }
    }

    public override async Task<D> CreateAsync(D dto)
    {
        try
        {
            var entity = _mapper.Map<T>(dto);
            var createdEntity = await _data.CreateAsync(entity);
            return _mapper.Map<D>(createdEntity);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating entity");
            throw;
        }
    }

    public override async Task<D> UpdateAsync(D dto)
    {
        try
        {
            var entity = _mapper.Map<T>(dto);
            await _data.DeleteAsync(entity);  // ⚠️ PROBLEMA: Está borrando en lugar de actualizar
            await Task.CompletedTask;
            var updated = await _data.GetByIdAsync(entity.Id);
            return _mapper.Map<D>(updated);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error en {nameof(UpdateAsync)}");
            throw;
        }
    }

    public override async Task<bool> DeleteAsync(Guid id)
    {
        try
        {
            var entity = await _data.GetByIdAsync(id);
            if (entity == null)
                return false;
            await _data.DeleteAsync(entity);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error en {nameof(DeleteAsync)} con Id={id}");
            throw;
        }
    }
}
}

**Explicación:**
- **Implementa todos los métodos abstractos**
- **Cada método sigue el patrón**: Try-Catch-Finally
- Usa `_data`, `_mapper`, `_logger` heredados de la clase abstracta
- ⚠️ **Problema en UpdateAsync**: Usa `DeleteAsync` en lugar de `UpdateAsync`

---

## Análisis detallado de cada método

### 1️⃣ Constructor — La preparación
public BaseBusiness(IBaseData<T> data, IMapper mapper, ILogger<BaseBusiness<T, D>> logger) : base(data, mapper, logger) { }


**¿Qué pasa aquí?**

1. El constructor recibe tres parámetros (Inyección de Dependencias automática)
2. `:` base(...)` **pasa esos parámetros a la clase padre** `ABaseBusiness`
3. La clase padre **guarda esas dependencias** en `_data`, `_mapper`, `_logger`
4. Todas las subclases tendrán acceso a esas propiedades protegidas

**¿Por qué pasar al padre?**

Porque el padre declara esas propiedades como `protected`, y **todas las subclases necesitan acceso a ellas** para poder usarlas en sus métodos.

**Flujo de inyección:**

Controlador pide: IProductBusiness ↓ DI crea: ProductBusiness (que hereda de ABaseBusiness) ↓ Constructor necesita: IBaseData<Product>, IMapper, ILogger ↓ DI proporciona esas dependencias ↓ ProductBusiness pasa al padre (ABaseBusiness) esas dependencias ↓ ABaseBusiness guarda en _data, _mapper, _logger ↓ ProductBusiness puede usar _data, _mapper, _logger en sus métodos


### 2️⃣ `GetAllAsync()` — Obtener todas las entidades

public override async Task<IEnumerable<D>> GetAllAsync() { try { var entities = await _data.GetAllAsync(); return _mapper.Map<List<D>>(entities.ToList()); } catch (Exception ex) { _logger.LogError(ex, $"Error en {nameof(GetAllAsync)}"); throw; } }}

**Paso a paso:**

1.	try { ↓
2.	var entities = await _data.GetAllAsync(); // Accede a Data Layer y obtiene TODAS las entidades de la BD // Ejemplo: Obtiene todos los Users de la tabla Users // _data es IBaseData<User> que accede a BaseData<User> // Resultado: IEnumerable<User> ↓
3.	entities.ToList() // Convierte a List (necesario para que AutoMapper funcione correctamente) // IEnumerable<User> → List<User> ↓
4.	_mapper.Map<List<D>>(...) // AutoMapper TRANSFORMA cada entidad a su DTO // Transforma: List<User> → List<UserDto> // Ejemplo: User { Id, Email, PasswordHash } //       → UserDto { Id, Email } // PasswordHash NO se incluye (SEGURIDAD) ↓
5.	return // Retorna List<UserDto> al controlador
} catch (Exception ex) { ↓ 6. _logger.LogError(ex, $"Error en GetAllAsync") // Registra la excepción en los logs // Permite ver qué error ocurrió exactamente ↓ 7. throw; // RELANZA la excepción para que el controlador la maneje // El controlador decide si retornar 500, 400, etc }

**Ejemplo real:**

BD tiene:
•	User1(Id:550e8400-e29b-41d4-a716-446655440000, Email:"juan@mail.com", PasswordHash:"abc123")
•	User2(Id:550e8400-e29b-41d4-a716-446655440001, Email:"maria@mail.com", PasswordHash:"xyz789")
GetAllAsync():
1.	_data.GetAllAsync() obtiene ambas entidades de la BD
2.	Transforma a DTOs (sin passwords)
3.	Retorna: [ { Id: "550e8400-e29b-41d4-a716-446655440000", Email: "juan@mail.com" }, { Id: "550e8400-e29b-41d4-a716-446655440001", Email: "maria@mail.com" } ] ↓ El controlador recibe esta lista y la retorna al cliente con Status 200 OK

### 3️⃣ `GetByIdAsync(Guid id)` — Obtener por ID
public override async Task<D> GetByIdAsync(Guid id) { try { var entity = await _data.GetByIdAsync(id); if (entity == null) return null; return _mapper.Map<D>(entity); } catch (Exception ex) { _logger.LogError(ex, $"Error en {nameof(GetByIdAsync)} con Id={id}"); throw; } }}

**Paso a paso:**
1.	var entity = await _data.GetByIdAsync(id); // Busca en BD una entidad con ese ID específico // Si NO existe: entity = null // Si EXISTE: entity = User { Id, Email, PasswordHash, ... } ↓
2.	if (entity == null) return null; // Si no existe, retorna null DIRECTAMENTE // No intenta mapear un null // El controlador debe comprobar si es null para retornar 404 ↓
3.	return _mapper.Map<D>(entity); // Si existe, transforma la entidad a DTO y retorna // User { Id, Email, PasswordHash } → UserDto { Id, Email }

**Ejemplo real:**
Usuario pide: GET /api/users/550e8400-e29b-41d4-a716-446655440000
GetByIdAsync("550e8400-e29b-41d4-a716-446655440000"):
1.	Busca en BD por ese ID
2.	Si EXISTE:
•	Encuentra: User { Id, Email:"juan@mail.com", PasswordHash:"abc123" }
•	Transforma: UserDto { Id, Email:"juan@mail.com" }
•	Retorna: UserDto
•	Controlador: Retorna 200 OK + UserDto
3.	Si NO EXISTE:
•	entity = null
•	Retorna: null
•	Controlador: Retorna 404 Not Found
---

### 4️⃣ `CreateAsync(D dto)` — Crear nueva entidad
public override async Task<D> CreateAsync(D dto) { try { var entity = _mapper.Map<T>(dto); var createdEntity = await _data.CreateAsync(entity); return _mapper.Map<D>(createdEntity); } catch (Exception ex) { _logger.LogError(ex, "Error creating entity"); throw; } }}

**Paso a paso:**
1.	var entity = _mapper.Map<T>(dto); // TRANSFORMA DTO → ENTIDAD // UserDto { Email: "nuevo@mail.com" } //   → User { Email: "nuevo@mail.com", Status: true, CreatedAt: now } // AutoMapper rellena campos automáticamente basado en el mapeo ↓
2.	var createdEntity = await _data.CreateAsync(entity); // AGREGA la entidad a la BD // Pero IMPORTANTE: Aún NO hace COMMIT // Solo la añade al DbSet (Entity Framework Core sigue el cambio) // Se asigna el ID por Entity Framework (si es identity) // Resultado: La entidad con ID asignado pero no guardado en BD ↓
3.	return _mapper.Map<D>(createdEntity); // TRANSFORMA la entidad creada → DTO // User { Id, Email, Status, CreatedAt } //   → UserDto { Id, Email, CreatedAt } // Retorna el DTO al controlador

**Flujo completo de una solicitud:**
1.	Cliente envía: POST /api/users Content-Type: application/json { "email": "nuevo@mail.com", "name": "Juan" }
2.	Controlador recibe: [HttpPost] public async Task<IActionResult> Create([FromBody] CreateUserDto dto) { // dto = { Email: "nuevo@mail.com", Name: "Juan" } var result = await _userBusiness.CreateAsync(dto); await _db.SaveChangesAsync(true);  // ← AQUÍ se guarda en BD return CreatedAtAction(nameof(GetById), new { id = result.Id }, result); }
3.	Business Layer - CreateAsync: a) _mapper.Map<User>(dto) CreateUserDto { Email: "nuevo@mail.com", Name: "Juan" } → User { Email, Name, Id=guid-nuevo, Status=true, CreatedAt=now }
b) await _data.CreateAsync(entity) Agrega el User al DbSet El DbSet lo marca para INSERCIÓN Se asigna el Id (identidad de BD) AÚN NO se guarda en BD
c) _mapper.Map<UserDto>(createdEntity) User { Id, Email, Name, Status, CreatedAt } → UserDto { Id: "abc-123", Email, Name }
d) return UserDto { Id: "abc-123", Email, Name }
4.	Controlador continúa: await _db.SaveChangesAsync(true) → INSERT INTO Users (Id, Email, Name, Status, CreatedAt, ...) → Se ejecuta la consulta SQL en la BD → Retorna 1 (1 fila afectada) → La entidad se persiste en BD
5.	Controlador responde: Status: 201 Created Location: /api/users/abc-123 Body: { id: "abc-123", email: "nuevo@mail.com", name: "Juan" }
6.	Cliente recibe: 201 Created { id: "abc-123", email: "nuevo@mail.com", name: "Juan" }


**⚠️ PUNTO CRÍTICO:** El `CreateAsync` de Business **NO guarda en BD**, solo **lo prepara**. El guardado lo hace el **Controlador** llamando a `_db.SaveChangesAsync()`.

---

### 5️⃣ `UpdateAsync(D dto)` — Actualizar entidad ⚠️ PROBLEMA

**⚠️ PROBLEMA CRÍTICO EN TU CÓDIGO:**
public override async Task<D> UpdateAsync(D dto) { try { var entity = _mapper.Map<T>(dto); await _data.DeleteAsync(entity);  // ← ESTO ESTÁ MAL, BORRA EN LUGAR DE ACTUALIZAR await Task.CompletedTask; var updated = await _data.GetByIdAsync(entity.Id); return _mapper.Map<D>(updated); } catch (Exception ex) { _logger.LogError(ex, $"Error en {nameof(UpdateAsync)}"); throw; } }

**EL PROBLEMA:**
Llama a `_data.DeleteAsync(entity)` en lugar de `_data.UpdateAsync(entity)`. Esto **ELIMINA la entidad** en lugar de actualizarla.

**SOLUCIÓN CORRECTA:**
public override async Task<D> UpdateAsync(D dto) { try { var entity = _mapper.Map<T>(dto); var updatedEntity = await _data.UpdateAsync(entity);  // ← CORRECTO return _mapper.Map<D>(updatedEntity); } catch (Exception ex) { _logger.LogError(ex, $"Error en {nameof(UpdateAsync)}"); throw; } }

**Paso a paso (versión corregida):**
1.	var entity = _mapper.Map<T>(dto); // TRANSFORMA DTO → ENTIDAD // UserDto { Id: "abc-123", Email: "actualizado@mail.com" } //   → User { Id: "abc-123", Email: "actualizado@mail.com", ... } ↓
2.	var updatedEntity = await _data.UpdateAsync(entity); // MARCA la entidad como MODIFICADA en DbSet // Entity Framework Core detectará los cambios // IMPORTANTE: Aún NO hace COMMIT en BD // Resultado: La entidad lista para actualizarse ↓
3.	return _mapper.Map<D>(updatedEntity); // TRANSFORMA la entidad actualizada → DTO // User { Id, Email: "actualizado@mail.com", ... } //   → UserDto { Id, Email: "actualizado@mail.com" } // Retorna el DTO al controlador

**Flujo completo:**
1.	Cliente envía: PUT /api/users Content-Type: application/json { "id": "abc-123", "email": "actualizado@mail.com", "name": "Juan Actualizado" }
2.	Controlador recibe: [HttpPut] public async Task<IActionResult> Update([FromBody] UserDto dto) { var result = await _userBusiness.UpdateAsync(dto); await _db.SaveChangesAsync(true);  // ← AQUÍ se guarda en BD return Ok(result); }
3.	Business Layer - UpdateAsync (VERSIÓN CORRECTA): a) _mapper.Map<User>(dto) UserDto { Id: "abc-123", Email: "actualizado@mail.com" } → User { Id, Email: "actualizado@mail.com" }
b) await _data.UpdateAsync(entity) Marca el User como MODIFICADO en DbSet EF Core detecta que Email cambió AÚN NO se guarda en BD
c) _mapper.Map<UserDto>(updatedEntity) → UserDto { Id: "abc-123", Email: "actualizado@mail.com" }
4.	Controlador continúa: await _db.SaveChangesAsync(true) → UPDATE Users SET Email = 'actualizado@mail.com', UpdatedAt = now WHERE Id = 'abc-123' → Se ejecuta en BD → Retorna 1 (1 fila afectada)
5.	Controlador responde: Status: 200 OK Body: { id: "abc-123", email: "actualizado@mail.com", ... }

---

### 6️⃣ `DeleteAsync(Guid id)` — Eliminar entidad
public override async Task<bool> DeleteAsync(Guid id) { try { var entity = await _data.GetByIdAsync(id); if (entity == null) return false; await _data.DeleteAsync(entity); return true; } catch (Exception ex) { _logger.LogError(ex, $"Error en {nameof(DeleteAsync)} con Id={id}"); throw; } }

**Paso a paso:**
1.	var entity = await _data.GetByIdAsync(id); // Obtiene la entidad a eliminar de la BD // Si NO existe: entity = null // Si EXISTE: entity = User { Id, Email, ... } ↓
2.	if (entity == null) return false; // Si no existe, retorna false (no se pudo eliminar) // El controlador debe comprobar esto y retornar 404 ↓
3.	await _data.DeleteAsync(entity); // MARCA para ELIMINACIÓN en DbSet // Entity Framework Core lo marca como "a eliminar" // IMPORTANTE: Aún NO se ejecuta DELETE en BD ↓
4.	return true; // Retorna true (operación fue exitosa en Business Layer) // El controlador debe llamar SaveChangesAsync() para confirmar en BD

**Flujo completo:**
1.	Cliente envía: DELETE /api/users/abc-123
2.	Controlador recibe: [HttpDelete("{id}")] public async Task<IActionResult> Delete(Guid id) { var success = await _userBusiness.DeleteAsync(id); if (!success) return NotFound();  // No existía await _db.SaveChangesAsync(true);  // ← AQUÍ se ejecuta DELETE en BD return NoContent();  // 204 }
3.	Business Layer - DeleteAsync: a) _data.GetByIdAsync(id) Busca el User en BD
b) if (entity == null) Si no existe: Retorna false Controlador retorna 404 Not Found
c) Si existe: await _data.DeleteAsync(entity) Marca para ELIMINACIÓN en DbSet AÚN NO se ejecuta DELETE en BD
d) return true Retorna true (éxito)
4.	Controlador continúa: await _db.SaveChangesAsync(true) → DELETE FROM Users WHERE Id = 'abc-123' → Se ejecuta en BD → Retorna 1 (1 fila afectada) → Pero ESPERA: Tu auditoría convierte DELETE en soft-delete → UPDATE Users SET Status = false, DeleteAt = now WHERE Id = 'abc-123'
5.	Controlador responde: Status: 204 No Content (Sin body, la entidad fue eliminada)
6.	Cliente recibe: 204 No Content.

**⚠️ IMPORTANTE SOBRE ELIMINACIÓN:**

En tu `ApplicationDbContext` hay auditoría automática. Cuando marques una entidad para eliminar:

EnsureAudit() convierte DELETE en SOFT DELETE:
•	entity.DeleteAt = now
•	entity.Status = false
Entonces el UPDATE es: UPDATE Users SET Status = 0, DeleteAt = '2024-04-09' WHERE Id = 'abc-123'
La entidad no se elimina físicamente, solo se marca como eliminada.

---

## Flujo de datos completo

Veamos un ejemplo completo: **Crear un usuario, actualizarlo y eliminarlo**.

### Escenario: Gestión de Usuarios
PASO 1: CREAR USUARIO ═══════════════════════════════════════════════════════════════
1.	Cliente (Frontend/Postman) envía: POST /api/users { "email": "juan@mail.com", "name": "Juan García" }
2.	Controlador recibe en CreateUserDto: email: "juan@mail.com" name: "Juan García"
3.	Controlador llama: var result = await _userBusiness.CreateAsync(userDto);
4.	Business - CreateAsync: a) _mapper.Map<User>(userDto) → User { Id: Guid.NewGuid(), Email: "juan@mail.com", Name: "Juan García", PasswordHash: null, Status: true, CreatedAt: DateTime.UtcNow }
b) var createdEntity = await _data.CreateAsync(entity); → _dbSet.AddAsync(user) → DbSet marca para inserción → NO se guarda aún
c) _mapper.Map<UserDto>(createdEntity) → UserDto { Id: "550e8400-e29b-41d4-a716-446655440000", Email: "juan@mail.com", Name: "Juan García" }
5.	Controlador llama: await _db.SaveChangesAsync(true); → INSERT INTO Users (Id, Email, Name, Status, CreatedAt, ...) → Se guarda en BD → Retorna 1
6.	Controlador responde: 201 Created Location: /api/users/550e8400-e29b-41d4-a716-446655440000 { "id": "550e8400-e29b-41d4-a716-446655440000", "email": "juan@mail.com", "name": "Juan García" }
═══════════════════════════════════════════════════════════════
PASO 2: OBTENER USUARIO ═══════════════════════════════════════════════════════════════
1.	Cliente envía: GET /api/users/550e8400-e29b-41d4-a716-446655440000
2.	Controlador llama: var result = await _userBusiness.GetByIdAsync(id);
3.	Business - GetByIdAsync: a) var entity = await _data.GetByIdAsync(id); → _dbSet.FindAsync(id) → Busca en BD → Encuentra: User { Id, Email, Name, PasswordHash, ... }
b) if (entity == null) return null; → No es null, continúa
c) return _mapper.Map<UserDto>(entity); → Transforma User → UserDto (sin PasswordHash)
4.	Controlador responde: 200 OK { "id": "550e8400-e29b-41d4-a716-446655440000", "email": "juan@mail.com", "name": "Juan García" }
═══════════════════════════════════════════════════════════════
PASO 3: ACTUALIZAR USUARIO ═══════════════════════════════════════════════════════════════
1.	Cliente envía: PUT /api/users { "id": "550e8400-e29b-41d4-a716-446655440000", "email": "juan.actualizado@mail.com", "name": "Juan García Actualizado" }
2.	Controlador llama: var result = await _userBusiness.UpdateAsync(userDto);
3.	Business - UpdateAsync (VERSIÓN CORRECTA): a) _mapper.Map<User>(userDto) → User { Id: "550e8400-e29b-41d4-a716-446655440000", Email: "juan.actualizado@mail.com", Name: "Juan García Actualizado" }
b) var updatedEntity = await _data.UpdateAsync(entity); → _dbSet.Update(user) → Marca como modificado → NO se guarda aún → Auditoría: UpdatedAt = DateTime.UtcNow
c) return _mapper.Map<UserDto>(updatedEntity); → UserDto { Id, Email: "juan.actualizado@mail.com", Name: "Juan García Actualizado" }
4.	Controlador llama: await _db.SaveChangesAsync(true); → UPDATE Users SET Email = 'juan.actualizado@mail.com', Name = 'Juan García Actualizado', UpdatedAt = now WHERE Id = '550e8400-e29b-41d4-a716-446655440000' → Se guarda en BD
5.	Controlador responde: 200 OK { "id": "550e8400-e29b-41d4-a716-446655440000", "email": "juan.actualizado@mail.com", "name": "Juan García Actualizado" }
═══════════════════════════════════════════════════════════════
PASO 4: ELIMINAR USUARIO ═══════════════════════════════════════════════════════════════
1.	Cliente envía: DELETE /api/users/550e8400-e29b-41d4-a716-446655440000
2.	Controlador llama: var success = await _userBusiness.DeleteAsync(id);
3.	Business - DeleteAsync: a) var entity = await _data.GetByIdAsync(id); → Busca el usuario → Encuentra: User { Id, Email, ... }
b) if (entity == null) return false; → No es null, continúa
c) await _data.DeleteAsync(entity); → _dbSet.Remove(entity) → Marca para eliminación → Auditoría (EnsureAudit): - entity.DeleteAt = DateTime.UtcNow - entity.Status = false - entry.State = EntityState.Modified (no es Delete físico)
d) return true; → Retorna true
4.	Controlador llama: await _db.SaveChangesAsync(true); → UPDATE Users SET Status = 0, DeleteAt = now WHERE Id = '550e8400-e29b-41d4-a716-446655440000' → Se ejecuta en BD (SOFT DELETE, no eliminación física)
5.	Controlador responde: 204 No Content
═══════════════════════════════════════════════════════════════
RESULTADO FINAL EN BD: ═══════════════════════════════════════════════════════════════
Users table: Id                                   | Email                      | Name               | Status | CreatedAt      | UpdatedAt      | DeleteAt 550e8400-e29b-41d4-a716-446655440000 | juan.actualizado@mail.com  | Juan García Actual | 0      | 2024-04-09...  | 2024-04-09...  | 2024-04-09...
Status = 0 (false) indica que está eliminado (soft delete)

---

## DTOs vs Entidades

### ¿Qué es un DTO?

DTO = **Data Transfer Object**. Es un objeto **solo para transportar datos** entre capas.

No es un modelo complejo con lógica, simplemente **contenedor de propiedades**.

### ¿Qué diferencia hay con la Entidad?

**Entidad (User) — Mapea a BD:**
- Contiene **todos** los campos de la tabla
- Incluye campos que **NO debería mostrar** al cliente
- Se usa **dentro** de la aplicación
- Heredera de `BaseModel` (tiene auditoría)

public class User : BaseModel { public string Email { get; set; } public string PasswordHash { get; set; }  // ← SECRETO - NO ENVIAR AL CLIENTE public string Phone { get; set; } public DateTime CreatedAt { get; set; }   // ← Interno public DateTime? UpdatedAt { get; set; }  // ← Interno public DateTime? DeleteAt { get; set; }   // ← Interno public bool Status { get; set; }          // ← Interno }

**DTO (UserDto) — Para API Response:**
- Contiene **solo lo necesario** para el cliente
- **Excluye campos sensibles** y internos
- Se usa **para comunicación HTTP**
- Hereda de `BaseDto` (solo propiedades básicas)

public class UserDto : BaseDto { public string Email { get; set; } public string Phone { get; set; } // PasswordHash NO APARECE - SEGURIDAD // CreatedAt, UpdatedAt, DeleteAt NO APARECEN - INTERNOS // Status NO APARECE - INTERNO }

### Ventajas de esta separación:

| Aspecto | Sin DTO (Expones Entidad) | Con DTO (Controlas qué envías) |
|--------|---------------------------|--------------------------------|
| **Seguridad** | Cliente ve PasswordHash | Cliente NO ve PasswordHash |
| **Flexibilidad** | Una sola estructura | Múltiples DTOs por contexto |
| **Cambios BD** | Si añades campo → Se expone | Si añades campo → Control |
| **Performance** | Envías todo | Envías solo lo necesario |
| **Evolución API** | Rompe clientes | La API sigue igual |
| **Auditoría** | Se exponen fechas internas | Control de qué mostrar |

### Ejemplo de múltiples DTOs para diferentes contextos:
// Para LISTAR usuarios (solo info básica) public class UserListDto : BaseDto { public string Email { get; set; } public string Name { get; set; } }
// Para VER DETALLE de usuario (más información) public class UserDetailDto : BaseDto { public string Email { get; set; } public string Name { get; set; } public string Phone { get; set; } public DateTime CreatedAt { get; set; }  // Aquí sí se muestra public IEnumerable<RoleDto> Roles { get; set; }  // Relaciones }
// Para CREAR usuario (menos campos, sin ID) public class CreateUserDto { public string Email { get; set; } public string Password { get; set; }  // Campo especial public string Name { get; set; } }
// Para ACTUALIZAR usuario (puede tener campos opcionales) public class UpdateUserDto { public Guid Id { get; set; } public string Email { get; set; } public string Name { get; set; } // El password NO va aquí, tiene endpoint aparte }

---

## AutoMapper: La magia de la transformación

### ¿Qué es AutoMapper?

AutoMapper es una **librería que transforma objetos automáticamente** de un tipo a otro, mapeando propiedades por nombre y tipo.

### Problema sin AutoMapper (hacerlo manual):
var userDto = new UserDto { Id = user.Id,              // ← Manual Email = user.Email,        // ← Manual Name = user.Name,          // ← Manual Phone = user.Phone,        // ← Manual CreatedAt = user.CreatedAt // ← Manual // 5 líneas por cada conversión // Propenso a errores // Duplicación de código };

### Solución con AutoMapper (automático):
var userDto = _mapper.Map<UserDto>(user);  // 1 línea, automático

### Cómo configurar AutoMapper

**Paso 1: Crear un perfil de mapeo**
// Business/Mappings/MappingProfile.cs using AutoMapper; using Entity.Model.security; using Entity.dto.security;
public class MappingProfile : Profile { public MappingProfile() { // Mapeos CRUD básicos CreateMap<User, UserDto>().ReverseMap(); CreateMap<User, CreateUserDto>().ReverseMap(); CreateMap<User, UserDetailDto>();
    // Otros mapeos
    CreateMap<Product, ProductDto>().ReverseMap();
    CreateMap<Role, RoleDto>().ReverseMap();
}
}

**Paso 2: Registrar en DI (Program.cs)**
// Registra AutoMapper en el contenedor de inyección de dependencias builder.Services.AddAutoMapper(typeof(MappingProfile));

**Paso 3: Inyectar y usar**
private readonly IMapper _mapper;
public UserBusiness(IMapper mapper) { _mapper = mapper; }
public async Task Example() { var user = new User { Id = Guid.NewGuid(), Email = "test@mail.com" };
// User → UserDto
var dto = _mapper.Map<UserDto>(user);

// UserDto → User
var entity = _mapper.Map<User>(dto);
}

### ReverseMap(): Mapeo bidireccional
CreateMap<User, UserDto>().ReverseMap();

Esto permite:
var user = new User { Email = "test@mail.com" }; var dto = _mapper.Map<UserDto>(user);      // User → UserDto
var newUser = _mapper.Map<User>(dto);      // UserDto → User (gracias a ReverseMap)

**Sin ReverseMap:**
CreateMap<User, UserDto>();  // Solo User → UserDto var entity = _mapper.Map<User>(dto);  // ← ERROR, no está configurado

### Mapeos personalizados

Para campos que no coinciden automáticamente:
CreateMap<User, UserDetailDto>() .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}")) .ForMember(dest => dest.RoleCount, opt => opt.MapFrom(src => src.Roles.Count()));

---

## Cómo implementar para una nueva entidad

Supongamos que quieres crear un servicio completo para la entidad **Productos**.

### Paso 1: Crear la Entidad
// Entity/Model/Product.cs using Entity.Model.baseModel;
public class Product : BaseModel { public string Name { get; set; } public string Description { get; set; } public decimal Price { get; set; } public int Stock { get; set; } }

### Paso 2: Crear los DTOs
// Entity/Dto/ProductDto.cs using Entity.dto.baseDto;
public class ProductDto : BaseDto { public string Name { get; set; } public string Description { get; set; } public decimal Price { get; set; } public int Stock { get; set; } }
// Entity/Dto/CreateProductDto.cs (sin ID, para crear nuevos) public class CreateProductDto { public string Name { get; set; } public string Description { get; set; } public decimal Price { get; set; } public int Stock { get; set; } }
// Entity/Dto/ProductDetailDto.cs (con más información) public class ProductDetailDto : BaseDto { public string Name { get; set; } public string Description { get; set; } public decimal Price { get; set; } public int Stock { get; set; } public int StockPercentage { get; set; }  // Campo calculado }

### Paso 3: Agregar el DbSet
// Data/context/ApplicationDbContext.cs public class ApplicationDbContext : DbContext, IApplicationDbContext { // ... otros DbSets ...
public DbSet<Product> Products { get; set; } = null!;
}

### Paso 4: Configurar AutoMapper
// Business/Mappings/MappingProfile.cs public class MappingProfile : Profile { public MappingProfile() { // ... mapeos anteriores ...
    CreateMap<Product, ProductDto>().ReverseMap();
    CreateMap<Product, CreateProductDto>().ReverseMap();
    CreateMap<Product, ProductDetailDto>()
        .ForMember(d => d.StockPercentage, 
                   opt => opt.MapFrom(s => (int)(s.Stock * 100 / 1000)));  // Porcentaje
}
}


### Paso 5: Crear interfaz Business (opcional, si necesitas métodos personalizados)
// Business/Interfaces/IProductBusiness.cs using Business.Interfaces.baseBusiness; using Entity.Model; using Entity.dto;
public interface IProductBusiness : IBaseBusiness<Product, ProductDto> { Task<IEnumerable<ProductDto>> GetByPriceRangeAsync(decimal min, decimal max); Task<IEnumerable<ProductDto>> GetLowStockAsync(); Task<IEnumerable<ProductDto>> GetByNameAsync(string name); }


### Paso 6: Crear implementación Business
// Business/Implements/ProductBusiness.cs using AutoMapper; using Business.Implements.baseBusiness.abstractBusiness; using Business.Interfaces; using Data.Interfaces.baseData; using Entity.Model; using Entity.dto; using Microsoft.Extensions.Logging; using System.Collections.Generic; using System.Linq; using System.Threading.Tasks;
public class ProductBusiness : ABaseBusiness<Product, ProductDto>, IProductBusiness { public ProductBusiness(IBaseData<Product> data, IMapper mapper, ILogger<ProductBusiness> logger) : base(data, mapper, logger) { }
// ═══════ MÉTODOS HEREDADOS DE IBaseBusiness ═══════

public override async Task<IEnumerable<ProductDto>> GetAllAsync()
{
    try
    {
        var entities = await _data.GetAllAsync();
        return _mapper.Map<List<ProductDto>>(entities.ToList());
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Error en {nameof(GetAllAsync)}");
        throw;
    }
}

public override async Task<ProductDto> GetByIdAsync(Guid id)
{
    try
    {
        var entity = await _data.GetByIdAsync(id);
        if (entity == null)
            return null;
        return _mapper.Map<ProductDto>(entity);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Error en {nameof(GetByIdAsync)} con Id={id}");
        throw;
    }
}

public override async Task<ProductDto> CreateAsync(ProductDto dto)
{
    try
    {
        var entity = _mapper.Map<Product>(dto);
        var createdEntity = await _data.CreateAsync(entity);
        return _mapper.Map<ProductDto>(createdEntity);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error creating product");
        throw;
    }
}

public override async Task<ProductDto> UpdateAsync(ProductDto dto)
{
    try
    {
        var entity = _mapper.Map<Product>(dto);
        var updatedEntity = await _data.UpdateAsync(entity);  // ← CORRECTO
        return _mapper.Map<ProductDto>(updatedEntity);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Error en {nameof(UpdateAsync)}");
        throw;
    }
}

public override async Task<bool> DeleteAsync(Guid id)
{
    try
    {
        var entity = await _data.GetByIdAsync(id);
        if (entity == null)
            return false;
        await _data.DeleteAsync(entity);
        return true;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Error en {nameof(DeleteAsync)} con Id={id}");
        throw;
    }
}

// ═══════ MÉTODOS PERSONALIZADOS DE IProductBusiness ═══════

public async Task<IEnumerable<ProductDto>> GetByPriceRangeAsync(decimal min, decimal max)
{
    try
    {
        var entities = await _data.GetAllAsync();
        var filtered = entities
            .Where(p => p.Price >= min && p.Price <= max)
            .ToList();
        return _mapper.Map<List<ProductDto>>(filtered);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Error en {nameof(GetByPriceRangeAsync)} range={min}-{max}");
        throw;
    }
}

public async Task<IEnumerable<ProductDto>> GetLowStockAsync()
{
    try
    {
        var entities = await _data.GetAllAsync();
        var lowStock = entities
            .Where(p => p.Stock < 10)  // Stock bajo = menos de 10
            .ToList();
        _logger.LogInformation($"Encontrados {lowStock.Count()} productos con stock bajo");
        return _mapper.Map<List<ProductDto>>(lowStock);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Error en {nameof(GetLowStockAsync)}");
        throw;
    }
}

public async Task<IEnumerable<ProductDto>> GetByNameAsync(string name)
{
    try
    {
        var entities = await _data.GetAllAsync();
        var filtered = entities
            .Where(p => p.Name.Contains(name, StringComparison.OrdinalIgnoreCase))
            .ToList();
        return _mapper.Map<List<ProductDto>>(filtered);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Error en {nameof(GetByNameAsync)} name={name}");
        throw;
    }
}
}


### Paso 7: Registrar en DI (Program.cs)
// ═══════ REGISTRAR DATA LAYER ═══════ builder.Services.AddScoped<IBaseData<Product>, BaseData<Product>>();
// ═══════ REGISTRAR BUSINESS LAYER ═══════ builder.Services.AddScoped<IProductBusiness, ProductBusiness>();

### Paso 8: Crear el Controlador
// Controllers/ProductsController.cs using Microsoft.AspNetCore.Mvc; using Business.Interfaces; using Entity.dto; using Data.context; using AutoMapper; using System; using System.Collections.Generic; using System.Threading.Tasks;
[ApiController] [Route("api/[controller]")] public class ProductsController : ControllerBase { private readonly IProductBusiness _business; private readonly IApplicationDbContext _db; private readonly IMapper _mapper;
public ProductsController(IProductBusiness business, IApplicationDbContext db, IMapper mapper)
{
    _business = business;
    _db = db;
    _mapper = mapper;
}

// GET /api/products — Obtener todos
[HttpGet]
public async Task<IActionResult> GetAll()
{
    var result = await _business.GetAllAsync();
    return Ok(result);
}

// GET /api/products/{id} — Obtener por ID
[HttpGet("{id}")]
public async Task<IActionResult> GetById(Guid id)
{
    var result = await _business.GetByIdAsync(id);
    if (result == null)
        return NotFound(new { message = "Producto no encontrado" });
    return Ok(result);
}

// POST /api/products — Crear nuevo
[HttpPost]
public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var productDto = _mapper.Map<ProductDto>(dto);
    var result = await _business.CreateAsync(productDto);
    await _db.SaveChangesAsync(true);  // ← IMPORTANTE
    
    return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
}

// PUT /api/products — Actualizar
[HttpPut]
public async Task<IActionResult> Update([FromBody] ProductDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var result = await _business.UpdateAsync(dto);
    await _db.SaveChangesAsync(true);  // ← IMPORTANTE
    return Ok(result);
}

// DELETE /api/products/{id} — Eliminar
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(Guid id)
{
    var success = await _business.DeleteAsync(id);
    if (!success)
        return NotFound(new { message = "Producto no encontrado" });
    
    await _db.SaveChangesAsync(true);  // ← IMPORTANTE
    return NoContent();  // 204
}

// GET /api/products/price-range?min=10&max=100 — Por rango de precio
[HttpGet("price-range")]
public async Task<IActionResult> GetByPriceRange([FromQuery] decimal min, [FromQuery] decimal max)
{
    if (min < 0 || max < 0 || min > max)
        return BadRequest(new { message = "Rango de precio inválido" });

    var result = await _business.GetByPriceRangeAsync(min, max);
    return Ok(result);
}

// GET /api/products/low-stock — Productos con stock bajo
[HttpGet("low-stock")]
public async Task<IActionResult> GetLowStock()
{
    var result = await _business.GetLowStockAsync();
    return Ok(result);
}

// GET /api/products/search?name=laptop — Buscar por nombre
[HttpGet("search")]
public async Task<IActionResult> GetByName([FromQuery] string name)
{
    if (string.IsNullOrWhiteSpace(name))
        return BadRequest(new { message = "Nombre requerido" });

    var result = await _business.GetByNameAsync(name);
    return Ok(result);
}
}

### Paso 9: Testear en Postman
1.	POST /api/products Content-Type: application/json { "name": "Laptop", "description": "Laptop de 15 pulgadas", "price": 999.99, "stock": 50 } → Respuesta 201 Created + ProductDto
2.	GET /api/products → Respuesta 200 OK + Lista de ProductDto
3.	GET /api/products/550e8400-e29b-41d4-a716-446655440000 → Respuesta 200 OK + ProductDto
4.	PUT /api/products { "id": "550e8400-e29b-41d4-a716-446655440000", "name": "Laptop Actualizada", "price": 1099.99, "stock": 40 } → Respuesta 200 OK + ProductDto actualizado
5.	DELETE /api/products/550e8400-e29b-41d4-a716-446655440000 → Respuesta 204 No Content
6.	GET /api/products/price-range?min=500&max=1500 → Respuesta 200 OK + Productos en rango
7.	GET /api/products/low-stock → Respuesta 200 OK + Productos con stock < 10


---

## Diagrama de arquitectura









---

## Problemas comunes y soluciones

### ❌ Problema 1: "El mapper no existe"

**Error:**
InvalidOperationException: Unable to resolve service for type 'AutoMapper.IMapper'


**Causa:** No registraste AutoMapper en DI.

**Solución:**
// Program.cs builder.Services.AddAutoMapper(typeof(MappingProfile));

---

### ❌ Problema 2: "No puedo crear un mapeo bidireccional"

**Intento incorrecto:**
CreateMap<User, UserDto>();  // Solo User → UserDto var user = _mapper.Map<User>(dto);  // ← ERROR: No existe mapeo inverso

**Solución:**
CreateMap<User, UserDto>().ReverseMap();  // Bidireccional

---

### ❌ Problema 3: "SaveChangesAsync se llama pero no guarda nada"

**Error común:**
var result = await _business.CreateAsync(dto); // ... se olvida llamar SaveChangesAsync return Ok(result);  // ← NO se guardó en BD

**Solución:**
var result = await _business.CreateAsync(dto); await _db.SaveChangesAsync(true);  // ← OBLIGATORIO return Ok(result);

---

### ❌ Problema 4: "Mi DTO tiene más campos que la entidad"

**Esto es normal y correcto.** AutoMapper solo mapea campos que **coinciden en nombre y tipo**.
// Entity public class User { public string Email { get; set; } public string Name { get; set; } }
// DTO public class UserDto { public string Email { get; set; } public string Name { get; set; } public string FullName { get; set; }  // No existe en Entity }
// Mapeo personalizado CreateMap<User, UserDto>() .ForMember(d => d.FullName, opt => opt.MapFrom(s => $"{s.Name} (User)"));


---

### ❌ Problema 5: "UpdateAsync está borrando en lugar de actualizar" ⚠️

**Este es el PROBLEMA ACTUAL en tu código.**

**Código incorrecto:**
public override async Task<D> UpdateAsync(D dto) { try { var entity = _mapper.Map<T>(dto); await _data.DeleteAsync(entity);  // ← ESTO ESTÁ MAL, BORRA await Task.CompletedTask; var updated = await _data.GetByIdAsync(entity.Id); return _mapper.Map<D>(updated); } catch (Exception ex) { _logger.LogError(ex, $"Error en {nameof(UpdateAsync)}"); throw; } }


**¿Por qué está mal?**
- Llama a `_data.DeleteAsync(entity)` en lugar de `_data.UpdateAsync(entity)`
- Esto marca la entidad para **eliminación** en lugar de actualización
- El próximo `SaveChangesAsync()` va a **eliminar** la fila en lugar de actualizarla

**Código correcto:**
public override async Task<D> UpdateAsync(D dto) { try { var entity = _mapper.Map<T>(dto); var updatedEntity = await _data.UpdateAsync(entity);  // ← CORRECTO return _mapper.Map<D>(updatedEntity); } catch (Exception ex) { _logger.LogError(ex, $"Error en {nameof(UpdateAsync)}"); throw; } }

---

### ❌ Problema 6: "Tengo propiedades null en el DTO"

**Causa:** Entity Framework no cargó las relaciones (navegación properties).
// Entity con relaciones public class User : BaseModel { public string Email { get; set; } public IEnumerable<Role> Roles { get; set; }  // Relación 1:N }
// DTO espera Roles public class UserDetailDto { public string Email { get; set; } public IEnumerable<RoleDto> Roles { get; set; } }
// Problema: Roles viene null var user = await _data.GetByIdAsync(id);  // No carga Roles var dto = _mapper.Map<UserDetailDto>(user);  // Roles = null

**Solución:** Usar eager loading en Data Layer o pasar el Include en LINQ.

---

### ❌ Problema 7: "Tengo circular reference en mapeos"

**Causa:** La entidad A tiene referencia a B, y B tiene referencia a A.
// Entidades public class User { public IEnumerable<Role> Roles { get; set; } }
public class Role { public IEnumerable<User> Users { get; set; }  // ← Circular }
// AutoMapper se queja CreateMap<User, UserDto>().ReverseMap();  // Error de recursión

**Solución:** No mapees la relación inversa.
CreateMap<User, UserDto>() .ForMember(d => d.Roles, opt => opt.Ignore());  // No mapear roles

---

### ❌ Problema 8: "Los cambios no se persisten en transacciones"

**Causa:** La excepción ocurre después de `SaveChangesAsync()`.
var result = await _business.CreateAsync(dto); await _db.SaveChangesAsync(true);  // ← Se guardó
// Algo falla aquí throw new Exception("Algo malo pasó");  // ← Pero la excepción ocurre después

**La transacción ya se confirmó, no hay rollback.**

**Solución:** Usar transacciones explícitas.
using var transaction = await _db.Database.BeginTransactionAsync(); try { var result = await _business.CreateAsync(dto); await _db.SaveChangesAsync(true);
// Más lógica que podría fallar
ValidateBusinessRules();

await transaction.CommitAsync();
} catch (Exception ex) { await transaction.RollbackAsync(); throw; }


---

## Checklist de implementación

Para cada nueva entidad, verifica que hayas hecho TODO:

### Base
- [ ] Creada la **Entidad** que hereda de `BaseModel`
  - [ ] En carpeta `Entity/Model`
  - [ ] Contiene propiedades del dominio
  
- [ ] Creados los **DTOs** que heredan de `BaseDto`
  - [ ] `Entity/Dto/XyzDto.cs` (CRUD general)
  - [ ] `Entity/Dto/CreateXyzDto.cs` (para POST)
  - [ ] `Entity/Dto/UpdateXyzDto.cs` (para PUT, opcional)
  - [ ] No incluye campos sensibles

- [ ] Añadido `DbSet<Entity>` en `ApplicationDbContext`
  - [ ] `public DbSet<Xyz> Xyzs { get; set; } = null!;`

### Data Layer
- [ ] `IBaseData<Xyz>` puede usarse genéricamente
- [ ] `BaseData<Xyz>` hereda de `ABaseData<Xyz>`
- [ ] Registrado en DI: `AddScoped<IBaseData<Xyz>, BaseData<Xyz>>()`

### Business Layer
- [ ] Configurado mapeo en `MappingProfile`
  - [ ] `CreateMap<Xyz, XyzDto>().ReverseMap();`
  - [ ] `CreateMap<Xyz, CreateXyzDto>().ReverseMap();`

- [ ] Creada **Interfaz Business** (opcional si solo usas CRUD genérico)
  - [ ] `Business/Interfaces/IXyzBusiness.cs`
  - [ ] Hereda de `IBaseBusiness<Xyz, XyzDto>`
  - [ ] Define métodos personalizados si hay

- [ ] Creada **Implementación Business**
  - [ ] `Business/Implements/XyzBusiness.cs`
  - [ ] Hereda de `ABaseBusiness<Xyz, XyzDto>`
  - [ ] Implementa `IXyzBusiness` (si existe)
  - [ ] Implementa todos los métodos abstractos
  - [ ] ✅ **UpdateAsync CORRECTO** (no usa Delete)

- [ ] Registrado en DI (Program.cs)
  - [ ] `AddScoped<IXyzBusiness, XyzBusiness>()`

### Controllers
- [ ] Creado el **Controlador**
  - [ ] `Controllers/XyzsController.cs`
  - [ ] Inyecta `IXyzBusiness` e `IApplicationDbContext`
  
- [ ] Métodos básicos implementados:
  - [ ] `GetAll()` → GET /api/xyzs
  - [ ] `GetById(id)` → GET /api/xyzs/{id}
  - [ ] `Create(dto)` → POST /api/xyzs + SaveChangesAsync()
  - [ ] `Update(dto)` → PUT /api/xyzs + SaveChangesAsync()
  - [ ] `Delete(id)` → DELETE /api/xyzs/{id} + SaveChangesAsync()
  
- [ ] Métodos personalizados si hay
  - [ ] Cada método llama al correspondiente de Business

### Testing
- [ ] Testeado en Postman:
  - [ ] GET todos → 200 OK + lista
  - [ ] GET por ID (existe) → 200 OK + objeto
  - [ ] GET por ID (no existe) → 404 Not Found
  - [ ] POST crear → 201 Created + objeto
  - [ ] PUT actualizar → 200 OK + objeto actualizado
  - [ ] DELETE → 204 No Content
  - [ ] Métodos personalizados → Respuestas correctas

### Documentación
- [ ] Comentarios en métodos complejos
- [ ] README o documentación actualizada
- [ ] Ejemplos de uso en Postman o Swagger

---

## Resumen final

La **Business Layer es la columna vertebral** de tu arquitectura. Aquí ocurre:

1. **Transformación:** DTO ↔ Entidad (AutoMapper)
2. **Lógica:** Reglas de negocio, validaciones
3. **Orquestación:** Coordina Data Layer y Controlador
4. **Manejo de errores:** Try-catch y logging
5. **Reutilización:** Código genérico y personalizable

| Componente | ¿Qué es? | ¿Para qué sirve? | ¿Dónde va? |
|---|---|---|---|
| `IBaseBusiness<T, D>` | Interfaz genérica | Define contrato CRUD | `Business/Interfaces` |
| `ABaseBusiness<T, D>` | Clase abstracta | Inyecta dependencias | `Business/Implements/.../abstract` |
| `BaseBusiness<T, D>` | Implementación | Lógica CRUD genérica | `Business/Implements/.../impAbstract` |
| **DTO** | Contenedor de datos | Transportar datos al cliente | `Entity/Dto` |
| **Entidad** | Modelo ORM | Mapear a tabla en BD | `Entity/Model` |
| **AutoMapper** | Librería | Transformar objetos | Inyectado en Business |
| **IBaseData<T>** | Repositorio genérico | Acceso a BD | Inyectado en Business |
| **Controlador** | API HTTP | Recibir/enviar requests | `Controllers` |

Con esta estructura:
- ✅ Código **reutilizable**
- ✅ **Mantenible** y escalable
- ✅ **Testeable** fácilmente
- ✅ **Separación clara** de responsabilidades
- ✅ **Implementable** rápidamente para nuevas entidades

¡Ahora estás listo para implementar cualquier nuevo servicio! 🚀