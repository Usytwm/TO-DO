using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
    }

    public DbSet<TaskModel> Tareas { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskModel>().HasKey(t => t.Id);
        modelBuilder.Entity<TaskModel>().ToTable("Tareas");
        // Configuraciones del modelo aquí
    }
}
