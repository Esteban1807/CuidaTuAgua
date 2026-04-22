using Entity.baseModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.Security
{
    internal class Person : BaseModel
    {

        public string FirstName { get; set; }
        public string LastName{ get; set; }
        public string Email{ get; set; }
        public string Document{ get; set; }

    }
}
