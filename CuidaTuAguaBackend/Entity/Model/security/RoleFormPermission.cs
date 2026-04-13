using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class RoleFormPermission : BaseModel
    {
        public Role Role { get; set; }
        public int IdRole { get; set; }
        public Form Form { get; set; }
        public int IdForm { get; set; }
        public Permission Permission { get; set; }
        public int IdPermission { get; set; }
    }
}
