namespace ServerApp.Models;

/// <summary>
/// Represents a task entity.
/// </summary>
public class TaskModel : IEntity
{
    /// <summary>
    /// Gets or sets the unique identifier for the task.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets a string describing the task the user wishes to perform.
    /// </summary>
    public string? Description { get; set; }

    /// <summary>
    /// Gets or sets a boolean indicator showing whether the task has been completed or not.
    /// </summary>
    public bool Completed { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the task was created.
    /// </summary>
    public DateTime? CreationDate { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the task was completed (can be null if not yet completed).
    /// </summary>
    public DateTime? CompletionDate { get; set; }
}

