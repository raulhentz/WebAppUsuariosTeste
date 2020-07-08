using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebApiUsuarios.Models;

namespace WebApiUsuarios.Data
{
    //Classe de contexto para aplicações no bancno de dados, utilizando o Entity FrameworkCore
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options) { }
        //DbSet representando a tabela de usuários
        public DbSet<Usuario> Usuarios { get; set; }


    }
}