import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-Titulos',
  templateUrl: './Titulos.component.html',
  styleUrls: ['./Titulos.component.css']
})
export class TitulosComponent implements OnInit {

  //A propriedade títulos terá que receber um valor para atualizar em cada um dos componentes
  @Input() titulos: string;

  constructor() { }

  ngOnInit() {
  }

}
