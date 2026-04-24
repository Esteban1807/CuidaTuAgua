using AutoMapper;
using Entity.dto.security.Permission;
using Entity.Model.security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Mappers.security
{
    public class PermissionProfile : Profile
    { 
        public PermissionProfile() 
        {
            CreateMap<PermissionCreateDto, Permission>()
                .ForMember(dest => dest.Id, org => org.Ignore())
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore())
                .ForMember(dest => dest.DeletedAt, org => org.Ignore())
                .ForMember(dest => dest.Status, org => org.Ignore());

            CreateMap<PermissionUpdateDto, Permission>()
                .ForMember(dest => dest.CreatedAt, org => org.Ignore())
                .ForMember(dest => dest.UpdatedAt, org => org.Ignore())
                .ForMember(dest => dest.DeletedAt, org => org.Ignore());

            CreateMap<Permission, PermissionDto>();
        }
    }
}
