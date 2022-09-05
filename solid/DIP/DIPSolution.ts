interface Category{}

class DramaCategorySolution implements Category{

}

class XCategorySolution implements Category{

}

class MovieSolution{
  private name: string;
  private category:DramaCategory2;

  constructor(name: string, category: Category){
    this.name = name;
    this.category = category;
  }

  public getName(){
    return this.name;
  }

  public setName(name:string){
    this.name = name;
  }

  public getCategory(){
    return this.category;
  }  

  public setCategory(category:Category){
    this.category = category;
  }
}