interface MovieSolution{
  play():void;
}

interface AudioControl{
  increaseVolume():void;
}

class TheLionKingSolution implements MovieSolution, AudioControl{
  play(): void {
    // play the MovieSolution
  }
  increaseVolume(): void {
    // increasing volume
  }
}

class ModernTimesSolution implements MovieSolution{
  play(): void {
    // play the MovieSolution
  }
}