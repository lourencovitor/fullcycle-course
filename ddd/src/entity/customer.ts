
// Uma entidade é unica mais os atributos podem mudar com o tempo

import Address from "./address"

// entidade tem que representar o estado correto e atual daquele elemento

// Uma entidade por padrão sempre vai ter que se autovalidar


// Complexidade de negocio
// - Entity
// -- customer.ts (regra de negocio)

// Complexidade acidental
// - infra - Mundo externo
// -- Entity / Model
// --- customer.ts (get, set)


// Entidade focada em negocio
export default class Customer{
  _id: string
  _name: string = ""
  _address!: Address
  _active: boolean = false

  constructor(id:string, name:string){
    this._id = id
    this._name = name
    this.validate()
  }

  validate(){
    if(this._name.length === 0){
      throw new Error('Name is required')
    }

    if(this._id.length === 0){
      throw new Error('Id is required')
    }
  }

  set name(name:string){
    this._name = name
  }

  changeName(name:string){
    this._name = name
    this.validate()
  }

  activate(){
    if(this._address === undefined){
      throw new Error('Address is mandatory to activate a costumer')
    }
    this._active = true
  }

  desactivate(){
    this._active = false
  }

  set Address(address: Address){
    this._address = address
  }
}
// TEM QUE ESTAR CONSISTENTE


// ORM cria entidade focada em PERSISTENCIA (model, persisten ...)