using Data.context;
using Data.Interfaces.baseData;
using Entity.Model.baseModel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements.baseImplement.@abstract
{
    public abstract class ABaseData<T> : IBaseData<T> where T : BaseModel
    {
        protected readonly IApplicationDbContext _context;
        protected readonly DbSet<T> _dbSet;
        protected ABaseData(IApplicationDbContext context) { 
            _context = context; 
            _dbSet = _context.Set<T>();
        }

        public abstract Task<IEnumerable<T>> GetAllAsync();
        public abstract Task<T> CreateAsync(T entity);
        public abstract Task<T> GetByIdAsync(Guid id);        
        public abstract Task<T> UpdateAsync(T entity);
        public abstract Task<T> DeleteAsync(T entity);
        public abstract Task<bool> SoftDeleteAsync(T entity);
    }
}
