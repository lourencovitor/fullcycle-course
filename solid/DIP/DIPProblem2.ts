
class DramaCategory2{

}

class Movie2{
  private name: string;
  private category:DramaCategory2;

  public getName(){
    return this.name;
  }

  public setName(name:string){
    this.name = name;
  }

  public getCategory(){
    return new DramaCategory2()
  }  

  public setCategory(category:DramaCategory2){
    this.category = category;
  }
}