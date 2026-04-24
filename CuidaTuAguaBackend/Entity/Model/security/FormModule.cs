using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class FormModule : BaseModel
    {
        public Form Form { get; set; }
        public Guid IdForm { get; set; }
        public Module Module { get; set; }
        public Guid IdModule { get; set; }
    }
}
