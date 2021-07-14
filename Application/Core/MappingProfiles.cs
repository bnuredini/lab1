using Application.Allergies;
using Application.ChronicDiseases;
using Application.Profiles;
using Application.Vaccines;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Test, Test>();
            CreateMap<Patient, Patient>();
            CreateMap<Location, Location>();
            CreateMap<CovidRestriction, CovidRestriction>();
            CreateMap<Doctor, Doctor>();
            CreateMap<Private_Center, Private_Center>();
            CreateMap<Public_Center, Public_Center>();
            CreateMap<Rezult, Rezult>();
            CreateMap<Vaccine, Vaccine>();
            CreateMap<Article, Article>();
            CreateMap<Variation, Variation>();
            CreateMap<Allergy, Allergy>();
            CreateMap<TestConfirmation, TestConfirmation>();
            CreateMap<VaccineConfirmation, VaccineConfirmation>();
            CreateMap<Chronic_Disease, Chronic_Disease>();
            CreateMap<Chronic_Disease, ChronicDiseaseDto>();
            CreateMap<AppUser, Profiles.Profile>();
            CreateMap<PatientChronicDisease, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<Vaccine, VaccineDto>();
            CreateMap<PatientVaccine, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<Drug, Drug>();
            CreateMap<Treatment, Treatment>();
            CreateMap<VaccineApplication, VaccineApplication>();
            CreateMap<Allergy, AllergyDto>();
            CreateMap<PatientAllergy, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<PatientAllergy, PatientAllergyDto>()
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Allergy.Type))
                .ForMember(d => d.Causes, o => o.MapFrom(s => s.Allergy.Causes));
            CreateMap<PatientVaccine, PatientVaccineDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Vaccine.Name))
                .ForMember(d => d.Efficacy, o => o.MapFrom(s => s.Vaccine.Efficacy))
                .ForMember(d => d.Creator, o => o.MapFrom(s => s.Vaccine.Creator))
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Vaccine.Type));
            CreateMap<PatientChronicDisease, PatientChronicDiseaseDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.ChronicDisease.Name));
                            


        }
    }
}