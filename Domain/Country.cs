namespace Domain
{
    public class Country
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Deaths { get; set; }
        public int Infections { get; set; }
        public int Vaccinated { get; set; }
        public int Recoveries { get; set; }
    }
}