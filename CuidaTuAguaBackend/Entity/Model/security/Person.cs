using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class Person : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public User User { get; set; }
        public DataPerson DataPerson { get; set; }
    }
}
