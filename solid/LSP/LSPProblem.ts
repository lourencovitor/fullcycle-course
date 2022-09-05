class Movie{
  public play(){
    // play no video
  }

  public increaseVolume(){

  }
}

class TheLionKing extends Movie{

}

// Não pode ser extendido de movie por que o metodo increaseVolume não iria funcionar
class ModernTime extends Movie{
  public increaseVolume(){
    // putz
  }
}