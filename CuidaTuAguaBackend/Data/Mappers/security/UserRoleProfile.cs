using AutoMapper;
using Entity.dto.security.UserRole;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappers.security
{
    public class UserRoleProfile : Profile
    {
        public UserRoleProfile() { 
            CreateMap<UserRoleCreateDto, UserRole>()
                .ForMember(dest => dest.Id, org => org.Ignore())
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore())
                .ForMember(dest => dest.Status, org => org.Ignore());
        
            CreateMap<UserRoleUpdateDto, UserRole>()
                .ForMember(dest => dest.Id, org => org.Ignore())
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore())
                .ForMember(dest => dest.Status, org => org.Ignore());

            CreateMap<UserRole, UserRoleDto>();
        }
    }
}
