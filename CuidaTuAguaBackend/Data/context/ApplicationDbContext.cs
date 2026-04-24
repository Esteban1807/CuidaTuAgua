using Dapper;
using Entity.Model.baseModel;
using Entity.Model.security;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Linq.Expressions;
using System.Reflection;

namespace Data.context
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        // ✔ Constructor limpio (IMPORTANTE)
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // ── DbSets — (actívalos cuando los uses) ─────────────────────
        
        public DbSet<User> Users { get; set; }
        public DbSet<Person> People { get; set; } 
        public DbSet<Role> Rols { get; set; } 
        public DbSet<Permission> Permissions { get; set; } 
        public DbSet<Form> Forms { get; set; }
        public DbSet<FormModule> FormModules { get; set; } 
        public DbSet<Entity.Model.security.Module> Modules { get; set; }
        public DbSet<RoleFormPermission> RoleFormPermissions { get; set; }
        public DbSet<UserRole> UserRols { get; set; } 
        public DbSet<DataPerson> DataPeople { get; set; } 

        // ── Configuración del modelo ────────────────────────────────
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Person>()
                .HasOne(p => p.User)
                .WithOne(u => u.Person)
                .HasForeignKey<User>(u => u.IdPerson);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.Roles)
                .HasForeignKey(ur => ur.IdUser);
            
            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(ur => ur.IdRole);    

            modelBuilder.Entity<RoleFormPermission>()
                .HasOne(rfp => rfp.Role)
                .WithMany(r => r.FormPermissions)
                .HasForeignKey(rfp => rfp.IdRole);

            modelBuilder.Entity<RoleFormPermission>()
                .HasOne(rfp => rfp.Form)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(rfp => rfp.IdRole);

            modelBuilder.Entity<RoleFormPermission>()
                .HasOne(rfp => rfp.Permission)
                .WithMany(r => r.RoleForms)
                .HasForeignKey(rfp => rfp.IdRole);

            modelBuilder.Entity<FormModule>()
                .HasOne(rfp => rfp.Form)
                .WithMany(f => f.FormModules)
                .HasForeignKey(rfp => rfp.IdForm);

            modelBuilder.Entity<FormModule>()
                .HasOne(rfp => rfp.Module)
                .WithMany(m => m.FormModules)
                .HasForeignKey(rfp => rfp.IdModule);    

            modelBuilder.Entity<DataPerson>()
                .HasOne(dp => dp.Person)
                .WithOne(p => p.DataPerson)
                .HasForeignKey<DataPerson>(dp => dp.IdPerson);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes()
                .Where(t => t.ClrType.IsSubclassOf(typeof(BaseModel))))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .Property("CreatedAt").IsRequired();

                modelBuilder.Entity(entityType.ClrType)
                    .Property("UpdatedAt").IsRequired(false);

                modelBuilder.Entity(entityType.ClrType)
                    .Property("DeletedAt").IsRequired(false);

                modelBuilder.Entity(entityType.ClrType)
                    .Property("Status").HasDefaultValue(true);
            }

            base.OnModelCreating(modelBuilder);

            // Aplica configuraciones con IEntityTypeConfiguration<T>
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        

        // ── Convenciones ────────────────────────────────────────────
        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<decimal>().HavePrecision(18, 2);
        }

        // ── Persistencia ────────────────────────────────────────────
        public override int SaveChanges()
        {
            EnsureAudit();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default)
        {
            EnsureAudit();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        // ── Dapper integrado ────────────────────────────────────────
        public async Task<IEnumerable<T>> QueryAsync<T>(
            string text,
            object? parameters = null,
            int? timeout = null,
            CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(
                this, text, parameters ?? new { }, timeout, type,
                CancellationToken.None);

            var connection = Database.GetDbConnection();
            return await connection.QueryAsync<T>(command.Definition);
        }

        public async Task<T?> QueryFirstOrDefaultAsync<T>(
            string text,
            object? parameters = null,
            int? timeout = null,
            CommandType? type = null)
        {
            using var command = new DapperEFCoreCommand(
                this, text, parameters ?? new { }, timeout, type,
                CancellationToken.None);

            var connection = Database.GetDbConnection();
            return await connection.QueryFirstOrDefaultAsync<T>(command.Definition);
        }

        // ── Helpers LINQ ────────────────────────────────────────────
        public IQueryable<T> GetActiveSet<T>() where T : class
        {
            var query = Set<T>().AsQueryable();
            var parameter = Expression.Parameter(typeof(T), "e");

            if (typeof(T).GetProperty("Status") == null) return query;

            try
            {
                var property = Expression.Property(parameter, "Status");
                var value = Expression.Constant(true);
                var equal = Expression.Equal(property, value);
                var lambda = Expression.Lambda<Func<T, bool>>(equal, parameter);
                query = query.Where(lambda);
            }
            catch { }

            return query;
        }

        public IQueryable<T> GetPaged<T>(IQueryable<T> query, int page, int pageSize)
            where T : class
        {
            if (page <= 0) page = 1;
            if (pageSize <= 0) pageSize = 10;

            return query.Skip((page - 1) * pageSize).Take(pageSize);
        }

        public async Task<List<T>> ToListAsyncSafe<T>(IQueryable<T> query)
            => query == null ? new List<T>() : await query.ToListAsync();

        // ── Auditoría automática ────────────────────────────────────
        private void EnsureAudit()
        {
            ChangeTracker.DetectChanges();
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is BaseModel);

            var now = DateTime.UtcNow;

            foreach (var entry in entries)
            {
                if (entry.Entity is not BaseModel entity) continue;

                switch (entry.State)
                {
                    case EntityState.Added:
                        entity.CreatedAt = now;
                        entity.Status = true;
                        break;

                    case EntityState.Modified:
                        entity.UpdatedAt = now;
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entity.DeletedAt = now;
                        entity.Status = false;
                        break;
                }
            }
        }

        // ── Factory (MUY recomendada para migraciones) ──────────────
        public class ApplicationDbContextFactory
            : IDesignTimeDbContextFactory<ApplicationDbContext>
        {
            public ApplicationDbContext CreateDbContext(string[] args)
            {
                var config = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

                optionsBuilder.UseSqlServer(
                    config.GetConnectionString("DefaultConnection")
                );

                return new ApplicationDbContext(optionsBuilder.Options);
            }
        }

        // ── Dapper helper interno ───────────────────────────────────
        public readonly struct DapperEFCoreCommand : IDisposable
        {
            public DapperEFCoreCommand(
                DbContext context,
                string text,
                object parameters,
                int? timeout,
                CommandType? type,
                CancellationToken ct)
            {
                var transaction = context.Database
                    .CurrentTransaction?.GetDbTransaction();

                var commandType = type ?? CommandType.Text;
                var commandTimeout = timeout ?? context.Database.GetCommandTimeout() ?? 30;

                Definition = new CommandDefinition(
                    text, parameters, transaction,
                    commandTimeout, commandType,
                    cancellationToken: ct);
            }

            public CommandDefinition Definition { get; }
            public void Dispose() { }
        }
    }
}