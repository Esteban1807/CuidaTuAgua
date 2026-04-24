using AutoMapper;
using Entity.dto.security.Form;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappers.security
{
    public class FormProfile : Profile
    {
        public FormProfile()
        {
          CreateMap<FormCreateDto, Form>()
                .ForMember(dest => dest.Id, org => org.Ignore())
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore())
                .ForMember(dest => dest.Status, org => org.Ignore());

            CreateMap<FormUpdateDto, Form>()
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.DeletedAt, opt => opt.Ignore());

          CreateMap<Form, FormDto>();
        }
    }
}
