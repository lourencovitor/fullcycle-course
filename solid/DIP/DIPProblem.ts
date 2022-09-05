
class DramaCategory{

}

class Movie{
  private name: string;
  private category:DramaCategory;

  public getName(){
    return this.name;
  }

  public setName(name:string){
    this.name = name;
  }

  public getCategory(){
    return this.category;
  }  

  public setCategory(category:DramaCategory){
    this.category = category;
  }
}