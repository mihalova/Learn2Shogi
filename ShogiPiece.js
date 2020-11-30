
class ShogiPiece{
    constructor(name, onBoard, color, x, y){
        this.name = name;
        this.onBoard = onBoard;
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
    getOnBoard(){
        return this.onBoard;
    }
    setOnBoard(n){
        this.onBoard = n;
    }
}