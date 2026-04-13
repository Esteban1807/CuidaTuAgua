using Entity.Model.baseModel;
using Entity.Model.security;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security;
using System.Text;
using System.Threading.Tasks;


namespace Data.context
{
    public interface IApplicationDbContext
    {
        // ── DbSets — Security ───────────────────────────────────────
        DbSet<User> Users { get; }
        DbSet<Person> People { get; }
        DbSet<Role> Rols { get; }
        DbSet<Permission> Permissions { get; }
        DbSet<Form> Forms { get; }
        DbSet<FormModule> FormModules { get; }
        DbSet<Entity.Model.security.Module> Modules { get; }
        DbSet<RoleFormPermission> RoleFormPermissions { get; }
        DbSet<UserRole> UserRols { get; }
        DbSet<DataPerson> DataPeople { get; }

        DbSet<T> Set<T>() where T : class;

        // ── Persistencia ────────────────────────────────────────────
        /// SaveChanges síncrono — para operaciones no async
        int SaveChanges();

        /// SaveChanges async — versión recomendada
        Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default);

        // ── Dapper (comparte conexión y transacción de EF) ──────────
        /// Devuelve una colección de T ejecutando SQL crudo
        Task<IEnumerable<T>> QueryAsync<T>(
            string text,
            object? parameters = null,
            int? timeout = null,
            CommandType? type = null);

        /// Devuelve el primer resultado o null
        Task<T?> QueryFirstOrDefaultAsync<T>(
            string text,
            object? parameters = null,
            int? timeout = null,
            CommandType? type = null);

        // ── Helpers LINQ ────────────────────────────────────────────
        /// IQueryable filtrado por Status = true
        IQueryable<T> GetActiveSet<T>() where T : class;

        /// Aplica paginación a un IQueryable existente
        IQueryable<T> GetPaged<T>(
            IQueryable<T> query,
            int page,
            int pageSize) where T : class;

        /// Materializa un IQueryable a List de forma segura
        Task<List<T>> ToListAsyncSafe<T>(IQueryable<T> query);
    }
}

