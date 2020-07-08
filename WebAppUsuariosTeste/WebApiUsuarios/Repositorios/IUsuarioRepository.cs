using System.Threading.Tasks;
using WebApiUsuarios.Models;

namespace WebApiUsuarios.Repositorios
{
    //Interface que irá determinar os métodos do repositório Usuário
    public interface IUsuarioRepository
    {
        //Obter todos os alunos do banco de dados
         public Task<Usuario[]> GetAllUsuariosAsync();
         //Obter apenas um aluno do banco de dados
         public Task<Usuario> GetUsuarioAsyncById(int usuarioId);
         //Processamento de atualização do usuario
         public Task<bool> AtualizarDadosDadosAsync(int usuarioId, Usuario usuario);
        //Processamento de exclusão dos dados
        public Task<bool> DeletarUsuarioAsync(int usuarioId);
        //Processamento de inclusão dos dados
        public Task<bool> InserirDadosAsync(Usuario usuario);
    }
}