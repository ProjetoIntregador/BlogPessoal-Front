import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';
import { Usuario } from '../model/Usuario';
import { ProdutoService } from '../service/produto.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  listaProduto:Produto[]
  produto: Produto = new Produto()
  
  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]
  idCategoria: number

  usuario: Usuario= new Usuario
  idUsuario = environment.id

  private router: Router
  constructor(
  
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  
  ) { }

  ngOnInit() {
    if (environment.token == ''){
      alert('Sua seção expirou, faça o login novamente!')

      this.router.navigate(['/entrar'])
    }
      this.getAllProduto()
      this.getAllCategoria()
    }



    getAllCategoria(){
      this.categoriaService.getAllCategoria().subscribe((resp: Categoria[])=>{
        this.listaCategoria = resp
      })
    }


    findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria)=>{
    this.categoria = resp
      })
    }


  getAllProduto(){
    this.produtoService.getAllProduto().subscribe((resp: Produto[])=>{
      this.listaProduto = resp
    })
  }


  publicar(){
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario
    this.produto.usuario = this.usuario
     console.log(this.produto)
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) =>{
      this.produto = resp
      alert('Postagem realizada com sucesso!!!')
      this.produto = new Produto()
      this.getAllProduto()
    })
  }


}