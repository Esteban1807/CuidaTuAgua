using Entity.baseModel;
using Entity.Security;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Text;
using System.Xml.Linq;

namespace Entity.Security
{
    public class Home : BaseModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public int Stratum { get; set; }
        public int Habitants { get; set; }

        public User User { get; set; }
        public int UserId { get; set; } 

    }
}
