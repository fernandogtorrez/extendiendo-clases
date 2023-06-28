import {readFileSync} from 'fs'
import {remove,orderBy} from 'lodash'


class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(name:string){
    super(name)
    const productosJSON = JSON.parse(readFileSync(__dirname + '/products.json').toString()) 
    productosJSON.forEach(element => {
      this.addProduct(element)
    });
  }
  addProduct(instancia: Product){
    return this.add(instancia)
  }
  getProduct(id:number):Product{
    return this.getCosas().find(item => item.id === id)
  }
  removeProduct(id:number) {
    return remove(this.getCosas(), cosa => cosa.id === id)
  }
  getSortedByPrice(order:'asc' | 'desc'){
    return orderBy(this.getCosas(), ['price'], [order])
  }
}

export { ListaDeProductos, Product };
