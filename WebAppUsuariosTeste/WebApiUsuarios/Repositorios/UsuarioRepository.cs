using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApiUsuarios.Data;
using WebApiUsuarios.Models;

namespace WebApiUsuarios.Repositorios
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly ApplicationDbContext _context;

        public UsuarioRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Usuario[]> GetAllUsuariosAsync()
        {
            return await _context.Usuarios.ToArrayAsync();
            
        }
        public async Task<Usuario> GetUsuarioAsyncById(int usuarioId)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(usu => usu.Id == usuarioId);
        }

        public async Task<bool> AtualizarDadosDadosAsync(int usuarioId, Usuario usuario)
        {
            var usuarioOld = _context.Usuarios.FirstOrDefault(entry => entry.Id.Equals(usuarioId));
 
            if (usuarioOld != null)
            {
                _context.Entry(usuarioOld).State = EntityState.Detached;
            }
            // aplicando estado de modificado
            _context.Entry(usuario).State = EntityState.Modified;
            //salvando alterações
            return (await _context.SaveChangesAsync()) > 0;
        }

         public async Task<bool> DeletarUsuarioAsync(int usuarioId)
        {
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(usu => usu.Id == usuarioId);

            if (usuario == null)
                return false;

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> InserirDadosAsync(Usuario usuario)
        {
            if (usuario == null)
                return false;

            _context.Usuarios.Add(usuario);
            return (await _context.SaveChangesAsync()) > 0;
        }


    }
}