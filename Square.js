
class SQ{
    constructor(n, c){
        this.pieceN = n;
        this.color = c;
    }
    getName(){
        return this.pieceN;
    }
    getColor(){
        return this.color;
    }
    setName(name){
        this.pieceN = name;
    }
    setColor(color){
        this.color = color;
    }
}