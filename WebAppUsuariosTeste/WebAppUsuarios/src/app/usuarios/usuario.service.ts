import { Usuario } from './../Models/Usuario';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService { //Classe para construção das chamadas para a WebApi
  //variável com a url base da webAPI
  //A url base é construída a partir do componente Envirenment.ts na variável urlPrincipal
  //Caso a url da api seja diferente, se faz necessário cinfigurar.
  public baseUrl = `${environment.urlPrincipal}/Usuario`;

  //construtor que receberá uma variável do tipo HttpClient
  constructor(private http: HttpClient) { }

  //Chamada GET para retornar todos os usuários, retornando da api um array de usuarios
  getTodosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}`);
  }

  //Chamada GET para retornar os dados de apenas um usuário, retornando da api um obj Usuario
  getUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  //Chamada POST para inclusão dos dados de um usuário, retornando da api um obj Usuario
  postUsuario(usuario: Usuario){
    return this.http.post(`${this.baseUrl}`, usuario);
  }
//Chamada PUT para atualização dos dados de um usuário, retornando da api um obj Usuario
  putUsuario(id: number, usuario: Usuario){
    return this.http.put(`${this.baseUrl}/${id}`, usuario);
  }
//Chamada DELETE para exclusão dos dados de um usuário, retornando da api um obj contendo uma string
  deletarUsuario(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
