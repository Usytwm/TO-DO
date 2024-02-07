using Microsoft.EntityFrameworkCore;
using ServerApp.Models;

/// <summary>
/// Represents the database context for the application.
/// </summary>
public class MyDbContext : DbContext
{
    /// <summary>
    /// Initializes a new instance of the <see cref="MyDbContext"/> class with the specified options.
    /// </summary>
    /// <param name="options">The options for this context.</param>
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {
    }

    /// <summary>
    /// Gets or sets the DbSet for the TaskModel entities.
    /// </summary>
    public DbSet<TaskModel> Tasks { get; set; }

    /// <summary>
    /// Configures the entity mappings and relationships for the database context.
    /// </summary>
    /// <param name="modelBuilder">The model builder used to construct the model for the context.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskModel>().HasKey(t => t.Id);
        modelBuilder.Entity<TaskModel>().ToTable("Tareas");
    }
}

