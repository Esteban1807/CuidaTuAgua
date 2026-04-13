using Entity.Model.genericModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class Form : GenericModel
    {
        public ICollection<FormModule> FormModules {  get; set; }
        public ICollection<RoleFormPermission> RolePermissions { get; set; }
    }
}
