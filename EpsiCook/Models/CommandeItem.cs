namespace EpsiCook.Models
{
    public class CommandeItem
    {
        public int Id { get; set; }
        public string? Entree { get; set; }

        public string? Plat { get; set; }
        public string? Dessert { get; set; }
        public string? Drink { get; set; }
    }
}
