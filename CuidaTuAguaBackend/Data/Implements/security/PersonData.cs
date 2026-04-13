using Data.context;
using Data.Implements.baseImplement.impAbstract;
using Data.Interfaces.securityInterface;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Implements.security
{
    public class PersonData : BaseData<Person>, IPersonData
    {
        public PersonData(IApplicationDbContext context) : base(context){}
    }
}
