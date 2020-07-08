using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiUsuarios.Models
{
    //Classe representando a classe de domínio que será referenciada a tabela de Usuários
    public class Usuario
    {
        public Usuario(){ }
        public Usuario(int Id, string Nome, string Sobrenome, string Email, DateTime DataNascimento, int Escolaridade)
        {
            this.Id = Id;
            this.Nome = Nome;
            this.Sobrenome = Sobrenome;
            this.Email = Email;
            this.DataNascimento = DataNascimento;
            this.Escolaridade = Escolaridade;
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string Nome { get; set; }
        [Required]
        [StringLength(100)]
        [Column(TypeName = "varchar(100)")]
        public string Sobrenome { get; set; }

        [Required]
        [EmailAddress]
        [Column(TypeName = "varchar(100)")]
        public string Email { get; set; }
        
        [Required]
        [Column(TypeName = "DateTime")]
        public DateTime DataNascimento { get; set; }
        
        [Column(TypeName = "Int")]
        public int Escolaridade { get; set; }


    }
}