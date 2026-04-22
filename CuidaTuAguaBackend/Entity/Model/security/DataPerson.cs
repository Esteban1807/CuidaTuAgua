using Entity.Model.baseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Model.security
{
    public class DataPerson : BaseModel
    {
        public string PhoneNumber { get; set; }
        public string IdentificationNumber { get; set; }
        public DateOnly YearBirth { get; set; }
        public Person Person { get; set; }
        public Guid IdPerson { get; set; }
    }
}
