using Data.context;
using Data.Implements.baseImplement.@abstract;
using Entity.Model.baseModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements.baseImplement.impAbstract
{
    public class BaseData<T> : ABaseData<T> where T : BaseModel
    {
        public BaseData(IApplicationDbContext context) : base(context)
        {
        }

        public override async Task<T> CreateAsync(T entity)
        {
            var entry = await _dbSet.AddAsync(entity);
            return entry.Entity;
        }
        public override async Task<T> GetByIdAsync(Guid id) => await _dbSet.FindAsync(id);

        public override async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
        public override async Task<T> UpdateAsync(T entity)
        {
            var entry = _dbSet.Update(entity);
            return entry.Entity;
        }

        public override async Task<T> DeleteAsync(T entity)
        {
            var existingEntity = await GetByIdAsync(entity.Id);
            if (existingEntity == null) return null;
            var entry = _dbSet.Remove(existingEntity);
            return entry.Entity;
        }
    }
}
