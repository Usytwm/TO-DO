namespace ServerApp.Models;
using System;

public class TaskModel
{
    public Guid TaskId { get; set; } // Identificador único de la tarea (clave primaria) como GUID.
    public string? Descripcion { get; set; } // Una cadena que describe la tarea que el usuario desea realizar.
    public bool Completada { get; set; } // Un indicador booleano que muestra si la tarea ha sido completada o no.
    public DateTime? FechaCreacion { get; set; } // La fecha y hora en que se creó la tarea.
    public DateTime? FechaCompletacion { get; set; } // La fecha y hora en que se completó la tarea (puede ser nulo si aún no se ha completado).
}
