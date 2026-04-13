using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.baseModel
{
    public class BaseModel
    {
        public Guid Id { get; set; }
        public bool Status { get; set; }    
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime DeleteAt { get; set; }
    }
}
