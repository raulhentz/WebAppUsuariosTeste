using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApiUsuarios.Models;
using WebApiUsuarios.Repositorios;

namespace WebApiUsuarios.Controllers
{
    //Controler para processamentos e consultas de Usuários
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        //Construtor para realizar a injeção de dependência do repositório de usuários
        private IUsuarioRepository _usu;
        public UsuarioController(IUsuarioRepository usuario)
        {
            _usu = usuario;            
        }

        //Método que irá realizar a consulta de usuários, retornando um array
        [HttpGet]
        public async Task<IActionResult> ListarTodosUsuarios()
        {
            try
            {
                var resultado = await _usu.GetAllUsuariosAsync();
                return Ok(resultado);

            }
            catch(Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");   
            }
        }

        //Método que irá realizar a consulta dos dados de um usuário, retornando um objeto Usuario
        [HttpGet("{id}")]
        public async Task<IActionResult> ObterUsuario(int id)
        {
            try
            {
                var resultado = await _usu.GetUsuarioAsyncById(id);
                return Ok(resultado);

            }
            catch(Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");   
            }
        }

        //Método que irá realizar a inclusão dos dados de usuários, retornando um objeto Usuario
        [HttpPost]
        public async Task<IActionResult> IncluirUsuario(Usuario usuario)
        {
            try
            {
                if(await _usu.InserirDadosAsync(usuario))
                    return Ok(usuario);
                else
                    return BadRequest();
                
            }
            catch(Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");   
            }
        }

        //Método que irá realizar a atualização dos dados de usuários, retornando um objeto Usuario
        [HttpPut("{usuarioId}")]
        public async Task<IActionResult> AlterarUsuario([FromRoute] int usuarioId, [FromBody] Usuario usuario)
        {
            try
            {
                if(await _usu.AtualizarDadosDadosAsync(usuarioId, usuario))
                    return Ok(usuario);
                else
                    return BadRequest();
                
            }
            catch(Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");   
            }
        }

        //Método que irá realizar a exclusão dos dados de usuários, retornando um objeto Usuario
        [HttpDelete("{usuarioId}")]
        public async Task<IActionResult> DeletarUsuario([FromRoute] int usuarioId)
        {
            try
            {
                if(await _usu.DeletarUsuarioAsync(usuarioId))
                    return Ok(new { message = "deletado" });
                else
                    return BadRequest();
                
            }
            catch(Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");   
            }
        }



    }
}