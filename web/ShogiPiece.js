
class ShogiPiece{
    constructor(name, id, color, x, y){
        this.name = name;
        this.id = id;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    getName(){
        return this.name;
    }
    getColor(){
        return this.color;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    setX(newX){
        this.x = newX;
    }
    setY(newY){
        this.y = newY;
    }
}
