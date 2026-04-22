using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.genericModel
{
    public class GenericModel : BaseModel
    {
        public string Name { get; set; }  
        public string Description { get; set; }
        public string Url { get; set; }
    }
}
