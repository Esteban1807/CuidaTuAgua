/* 
Pseudocódigo / Plan (paso a paso):
1. Importar los namespaces necesarios (incluyendo OpenApi para Swagger).
2. Configurar el builder:
   - Añadir controllers.
   - Registrar Swagger estándar (EndpointsApiExplorer + AddSwaggerGen).
   - Registrar DbContext con SQL Server.
   - Configurar CORS usando orígenes desde configuración.
3. Construir la aplicación (solo una vez).
4. En entorno de desarrollo activar Swagger (UseSwagger + UseSwaggerUI).
5. Añadir middleware de manejo de excepciones (salida JSON).
6. Habilitar HTTPS redirection, CORS, Autorización y Mapear controllers.
7. Aplicar migraciones al iniciar (con logging).
8. Ejecutar la aplicación.
Nota: Es necesario instalar el paquete NuGet "Swashbuckle.AspNetCore" si no está instalado.
*/

using AutoMapper;
using Business.Implements.baseBusiness.abstractBusiness;
using Business.Implements.baseBusiness.impAbstract;
using Business.Implements.security;
using Business.Interfaces.baseBusiness;
using Business.Interfaces.security;
using Data.context;
using Data.Implements.baseImplement.impAbstract;
using Data.Implements.security;
using Data.Interfaces.baseData;
using Data.Interfaces.securityInterface;
using Data.Mappers.security;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI; // Añade este using

var builder = WebApplication.CreateBuilder(args);


// Definicion de mis paquetes profile para el funcionamiento correcto del AutoMapper
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(UserProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(RoleProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(UserRoleProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(RoleFormPermissionProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(PermissionProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(FormProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(FormModuleProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(ModuleProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(PersonProfile).Assembly));
builder.Services.AddAutoMapper(cfg => cfg.AddMaps(typeof(DataPersonProfile).Assembly));


// Add services to the container.
// Swagger / OpenAPI
// Reemplaza llamadas a métodos de extensión personalizados inexistentes por los estándar.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Sistema de Gestión",
        Version = "v1"
    });
});


// Mapeo explícito para que DI resuelva IApplicationDbContext cuando se inyecte
builder.Services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());

builder.Services.AddScoped(typeof(IBaseData<>), typeof(BaseData<>));
builder.Services.AddScoped(typeof(IBaseBusiness<,,,>), typeof(BaseBusiness<,,,>));

// data
builder.Services.AddScoped<IUserData, UserData>();
builder.Services.AddScoped<IRoleData, RoleData>();
builder.Services.AddScoped<IUserRoleData, UserRoleData>();
builder.Services.AddScoped<IRoleFormPermissionData, RoleFormPermissionData>();
builder.Services.AddScoped<IPermissionData, PermissionData>();
builder.Services.AddScoped<IFormData, FormData>();
builder.Services.AddScoped<IFormModuleData, FormModuleData>();
builder.Services.AddScoped<IModuleData, ModuleData>();
builder.Services.AddScoped<IPersonData, PersonData>();
builder.Services.AddScoped<IDataPersonData, DataPersonData>();

// business
builder.Services.AddScoped<IUserBusiness, UserBusiness>();
builder.Services.AddScoped<IRoleBusiness, RoleBusiness>();
builder.Services.AddScoped<IUserRoleBusiness, UserRoleBusiness>();
builder.Services.AddScoped<IRoleFormPermissionBusiness, RoleFormPermissionBusiness>();  
builder.Services.AddScoped<IPermissionBusiness, PermissionBusiness>();
builder.Services.AddScoped<IFormBusiness, FormBusiness>();
builder.Services.AddScoped<IFormModuleBusiness, FormModuleBusiness>();
builder.Services.AddScoped<IModuleBusiness, ModuleBusiness>();
builder.Services.AddScoped<IPersonBusiness, PersonBusiness>();
builder.Services.AddScoped<IDataPersonBusiness, DataPersonBusiness>();




// DbContext
// En Program.cs
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        x => x.MigrationsAssembly("Data") // <-- AGREGA ESTO
    ));



// CORS
var origenesPermitidos = builder.Configuration.GetValue<string>("origenesPermitidos")?.Split(";", StringSplitOptions.RemoveEmptyEntries) ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(origenesPermitidos)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Swagger en dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Sistema de Gestión v1");
        c.RoutePrefix = string.Empty;
    });
}

// Middleware manejo errores personalizado (salida JSON)
app.UseExceptionHandler(appError =>
{
    appError.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        var response = new
        {
            StatusCode = context.Response.StatusCode,
            Message = "Error interno del servidor."
        };
        var json = System.Text.Json.JsonSerializer.Serialize(response);
        await context.Response.WriteAsync(json);
    });
});

app.UseHttpsRedirection();

// Habilitar CORS
app.UseCors();

app.UseAuthorization();

app.MapControllers();

// Aplicar migraciones con logging
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var dbContext = services.GetRequiredService<ApplicationDbContext>();
        var logger = services.GetRequiredService<ILogger<Program>>();
        dbContext.Database.Migrate();
        logger.LogInformation("Base de datos verificada y migraciones aplicadas exitosamente.");
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error durante la migración de la base de datos.");
    }
}

app.Run();
