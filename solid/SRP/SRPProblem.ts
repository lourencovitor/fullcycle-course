
class Course{
  private name: string;
  private category: string;
  private description: string;
  
  public connection(){
    const pdo = {insert: (param) => ''};
    return pdo
  }

  public createCategory(){
    this.connection().insert(this.category)
  }

  public createCorse() {
    this.connection().insert(this.name)
  }

  public getName(){
    return this.name
  }

  public setName(name: string){
    this.name = name
    return this
  }

  public getCategory(){
    return this.category
  }

  public setCategory(category:string){
    this.category = category
    return this
  }
}