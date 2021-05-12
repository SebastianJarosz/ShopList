using AutoMapper;
using ShopList.DTO;
using ShopList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopList.Mapper
{
    public class AutoMap: Profile
    {
        public AutoMap()
        {
            CreateMap<UserDTO, User>()
                .ForMember(d => d.Name, source => source.MapFrom(s => s.Name))
                .ForMember(d => d.Surname, source => source.MapFrom(s => s.Surname))
                .ForMember(d => d.UserName, source => source.MapFrom(s => s.UserName));

            CreateMap<User, UserProfileDTO>()
                .ForMember(d => d.Name, source => source.MapFrom(s => s.Name))
                .ForMember(d => d.Surname, source => source.MapFrom(s => s.Surname))
                .ForMember(d => d.UserName, source => source.MapFrom(s => s.UserName))
                .ForMember(d => d.RoleName, source => source.MapFrom(s => s.RoleName));
        }
    }
}
