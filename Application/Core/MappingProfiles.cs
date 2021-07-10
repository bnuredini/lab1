using Application.Vaccines;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Test, Test>();
            CreateMap<Patient, Patient>();
            CreateMap<Chronic_Disease, Chronic_Disease>();
            CreateMap<Private_Center, Private_Center>();
            CreateMap<Public_Center, Public_Center>();
            CreateMap<Rezult, Rezult>();
            CreateMap<Vaccine, Vaccine>();
            CreateMap<Article, Article>();
            CreateMap<Variation, Variation>();

            CreateMap<Vaccine, VaccineDto>();
            CreateMap<PatientVaccine, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
        }
    }
}