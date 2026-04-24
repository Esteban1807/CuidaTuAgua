using Entity.Model.genericModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class Role : GenericModel
    {
     public ICollection<UserRole> Users { get; set; }   
     public ICollection<RoleFormPermission> FormPermissions { get; set; }
    }
}
