import { UsuarioService } from './usuario.service';
import { Usuario } from './../Models/Usuario';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  //Variáveis globais que serão utilizadas em todo componente
  
  //variável que será incluída no título da página
  public titulo = 'Usuários';
  //variável para controle do form de usuários
  public usuarioForm: FormGroup;
  
  //variável para controle de vidualização e atualização dos dados de um usuário
  public usuarioSelecionado: Usuario;
  //variável contendo o tipo de escolaridade carregado no combo Escolaridade
  public tipoEscolaridade = '0';
  //variável de controle das mensagens de erros de validação
  public msgErro = null;
  //variável para atribuir o id do usuário no momento de uma exclusão
  public usuarioExclusao = 0;
  //objeto contendo os tipos de escolaridades
  public escolaridades = 
  [
    { id: 1, descricao: 'Infantil' },
    { id: 2, descricao: 'Fundamental' },
    { id: 3, descricao: 'Ensino Médio' },
    { id: 4, descricao: 'Ensino Superior' }
  ];

  //variável para atribuir os dados de um usuário
  public usuarios: Usuario[];
  //variável de controle dos modais da página
  modalRef: BsModalRef;
 
  //Construtor que vai referenciar a criação do formulário, modal e serviços (WebApi) através da injeção de dependência
  constructor(private fb: FormBuilder, private modalService: BsModalService,
    private usuarioService: UsuarioService) { 
    this.criarForm();
  }

  //Quando carregar a página, o componente deverá chamar o serviço 
  //para chamada da WebApi, carregando a lista de usuários
  ngOnInit(): void {
    this.carregarUsuarios();
  }

//Funções em Geral

//função responsável por listar todos os usuários do banco de dados
carregarUsuarios(){
  this.usuarioService.getTodosUsuarios().subscribe(
    (usuarios: Usuario[]) => { this.usuarios = usuarios }, //atribuindo a lista de alunos vinda do banco de dados
    (erro: any) => { console.error(erro) }
  );
}

//Função responsável por obter a descrição de cada tipo de escolaridade vinda do banco de dados
//dados registrados na construção da listagem
obterDescricaoEscolaridade(escolaridade: number){
  if(escolaridade == 1)
    return 'Infantil';
  else if(escolaridade == 2)
    return 'Fundamental';
  else if(escolaridade == 3)
    return 'Ensino Médio';
  else if(escolaridade == 4)
    return 'Ensino Superior';
  else
    return '';
}

//Função responsável por abrir os modal contendo o formulário da página
//Fazendo o controle para atribuir os dados de um usuário ou um novo registro
openModal(template: TemplateRef<any>, usuario: Usuario) {
  
  this.msgErro = null;
  
  if(usuario != null) { //Atribuindo os valores fdo usuário ao formulário
    this.usuarioSelecionado = usuario;
    this.tipoEscolaridade = usuario.escolaridade.toString();
    this.usuarioForm.patchValue(usuario);
  }
  else { //resetando formulário, controles e combos
    this.usuarioSelecionado = null;
    this.usuarioForm.reset();
    this.tipoEscolaridade = '0';
  }
  //abrindo o modal
  this.modalRef = this.modalService.show(template);
}

//função para abrir o modal de exclusão de um registro
openModalExcluir(template: TemplateRef<any>, usuario: Usuario) {
  this.usuarioExclusao = usuario.id;
  this.modalRef = this.modalService.show(template);
}

//Esta função atribui a variável usuarioForm (agrupador de campos) para controle dos objetos no formulário
//e suas respectivas validações
criarForm(){
  this.usuarioForm = this.fb.group({
    id: [''],
    nome: ['', [Validators.required, Validators.maxLength(100)]],
    sobrenome: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    dataNascimento: ['', Validators.required],
    escolaridade: ['', Validators.required]
  })
}

  //Função que vai realizar o put do formulário (atualização)
  salvarUsuario(usuario: Usuario){
    usuario.escolaridade = Number(usuario.escolaridade);

     this.usuarioService.putUsuario(usuario.id, usuario).subscribe(
       (usuario: Usuario) => {
         console.log(usuario);
         this.carregarUsuarios(); //após o processamento recarregar a lista de usuários
         this.modalRef.hide(); //fecha o modal do formulário
        },
       (erro: any) => { console.log(erro) } //apresenta o erro da requisição (caso tenha)
     );
  }

  //função que vai realizar o post do formulário (inclusão)
  postUsuario(usuario: Usuario){
    usuario.id = 0;
    usuario.escolaridade = Number(usuario.escolaridade);

     this.usuarioService.postUsuario(usuario).subscribe(
       (usuario: Usuario) => {
         console.log(usuario);
         this.carregarUsuarios(); //após o processamento recarregar a lista de usuários
         this.modalRef.hide(); //fecha o modal do formulário
        },
       (erro: any) => { console.log(erro) } //apresenta o erro da requisição (caso tenha)
     );
  }

  //Função responsável para a requisição do serviço com o intuito de excluir o registro do usuário
  excluirUsuario(){
    this.usuarioService.deletarUsuario(this.usuarioExclusao).subscribe(
      (acao: any) => {
        console.log(acao);
        this.usuarioExclusao = 0;
        this.carregarUsuarios(); //após o processamento recarregar a lista de usuários
        this.modalRef.hide(); //fecha o modal do formulário
      },
      (erro: any) => { console.log(erro); } //apresenta o erro da requisição (caso tenha)
    );
  }

  //Função responsável pelo submit do formulário
  //Se o formulário estiver válido, será necessário verificar se é uma atualização ou inclusão
  usuarioSubmit(){

      if(this.usuarioForm.valid){
        if(this.usuarioSelecionado == null)
          this.postUsuario(this.usuarioForm.value)
        else
          this.salvarUsuario(this.usuarioForm.value);
      }
      else{
        this.verificaErros(this.usuarioForm); //chamada da função para validação dos dados   
      }
  }

  //Função para validação dos dados do formulário
  verificaErros(usuForm: FormGroup){

      if(this.usuarioForm.get('nome').errors != null) {
        if(this.usuarioForm.get('nome').errors.required != null){
          this.msgErro = 'O campo nome é obrigatório'; 
        }
        
        if(this.usuarioForm.get('nome').errors.maxlength != null){
          this.msgErro = 'No campo nome é possível inserir no máximo 100 caracteres'; 
        }
      }

      if(this.usuarioForm.get('sobrenome').errors != null) {
        if(this.usuarioForm.get('sobrenome').errors.required != null){
          this.msgErro = 'O campo sobrenome é obrigatório'; 
        }
        
        if(this.usuarioForm.get('sobrenome').errors.maxlength != null){
          this.msgErro = 'No campo sobrenome é possível inserir no máximo 100 caracteres'; 
        }
      }

      if(this.usuarioForm.get('email').errors != null) {
        if (this.usuarioForm.get('email').errors.required != null){
          this.msgErro = 'O campo email é obrigatório'; 
        }
        if (this.usuarioForm.get('email').errors.email){
          this.msgErro = 'O campo email está inválido'; 
        }
      }



      

      

      
      
      


  }






}
