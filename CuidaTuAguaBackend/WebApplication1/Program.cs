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

using Data.context;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Builder;
using Swashbuckle.AspNetCore.SwaggerUI; // Añade este using

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Swagger / OpenAPI
// Reemplaza llamadas a métodos de extensión personalizados inexistentes por los estándar.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Sistema de Gestión",
        Version = "v1"
    });
});

// DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    options.EnableSensitiveDataLogging();
});

// Mapeo explícito para que DI resuelva IApplicationDbContext cuando se inyecte
builder.Services.AddScoped<IApplicationDbContext>(sp => sp.GetRequiredService<ApplicationDbContext>());

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
