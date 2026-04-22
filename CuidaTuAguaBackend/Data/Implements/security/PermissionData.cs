using Data.context;
using Data.Implements.baseImplement.impAbstract;
using Data.Interfaces.securityInterface;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements.security
{
    public class PermissionData : BaseData<Permission>, IPermissionData
    {
        public PermissionData(IApplicationDbContext context) : base(context) { }
    }
}
