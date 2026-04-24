using AutoMapper;
using Entity.dto.security.DataPerson;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappers.security
{
    public class DataPersonProfile : Profile
    {
        public DataPersonProfile()
        {
            CreateMap<DataPersonCreateDto, DataPerson>()
                .ForMember(dest => dest.Id, org => org.Ignore())
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore())
                .ForMember(dest => dest.Status, org => org.Ignore());

            CreateMap<DataPersonUpdateDto, DataPerson>()
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());

            CreateMap<DataPerson, DataPersonDto>();
        }
    }
}
