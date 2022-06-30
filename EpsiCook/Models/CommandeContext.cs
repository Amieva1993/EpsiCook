using Microsoft.EntityFrameworkCore;

namespace EpsiCook.Models
{
    public class CommandeContext : DbContext
    {
        public CommandeContext(DbContextOptions<CommandeContext> options)
            : base(options)
        {
        }

        public DbSet<CommandeItem> CommandeItem { get; set; }
    }
}
