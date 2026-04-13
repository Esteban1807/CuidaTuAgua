using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class User : BaseModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public Person Person { get; set; }
        public Guid IdPerson { get; set; }
        public ICollection<UserRole> Roles { get; set; }
    }
}
