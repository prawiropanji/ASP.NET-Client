using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplicationClient.Models
{
    public class Departement
    {


        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int DivisionId { get; set; }
     

       

    }
}
