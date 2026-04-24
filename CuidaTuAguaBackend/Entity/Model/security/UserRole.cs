using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class UserRole : BaseModel
    {
        public User User { get; set; }
        public Guid IdUser { get; set; }
        public Role Role { get; set; }
        public Guid IdRole { get; set; }
    }
}
