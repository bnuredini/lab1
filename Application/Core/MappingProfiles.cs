using Application.Allergies;
using Application.ChronicDiseases;
using Application.Doctors;
using Application.Drugs;
using Application.Profiles;
using Application.Rezults;
using Application.Roles;
using Application.Treatments;
using Application.VaccineApplications;
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
            CreateMap<Position, Position>();
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
            CreateMap<Position, RoleDto>();
            CreateMap<UserPosition, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<Vaccine, VaccineDto>();
            CreateMap<PatientVaccine, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<Doctor, DoctorDto>();
            CreateMap<PatientDoctor, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<Drug, DrugDto>();
            CreateMap<PatientDrug, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
            CreateMap<Treatment, TreatmentDto>();
            CreateMap<PatientTreatment, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
                 CreateMap<VaccineApplication, ApplicationDto>();
            CreateMap<PatientApplication, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));
                CreateMap<Rezult, ResultDto>();
            CreateMap<PatientResult, Profiles.Profile>()
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
                CreateMap<PatientResult, PatientResultDto>()
                .ForMember(d => d.Result, o => o.MapFrom(s => s.Result.Result))
                .ForMember(d => d.TestName, o => o.MapFrom(s => s.Result.TestName))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Result.Date));
                CreateMap<PatientDoctor, PatientDoctorDto>()
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Doctor.Type));
                CreateMap<PatientDrug, PatientDrugDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Drug.Name))
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Drug.Type))
                .ForMember(d => d.SideEffects, o => o.MapFrom(s => s.Drug.SideEffects))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Drug.Description));
                CreateMap<PatientTreatment, PatientTreatmentDto>()
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Treatment.Description))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Treatment.Date))
                .ForMember(d => d.Doctor, o => o.MapFrom(s => s.Treatment.Doctor))
                .ForMember(d => d.Patient, o => o.MapFrom(s => s.Treatment.Patient));
                CreateMap<PatientApplication, PatientApplicationDto>()
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Application.Type))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Application.Date))
                .ForMember(d => d.Email, o => o.MapFrom(s => s.Application.Email))
                .ForMember(d => d.Location, o => o.MapFrom(s => s.Application.Location));
                            


        }
    }
}