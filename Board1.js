

class Board1 extends React.Component {
    state = {
        pieces: {pawn_white: new ShogiPiece("pawn", 0, "white", 36, 27),
                 bishop_white: new ShogiPiece("bishop", 0, "white", 36, 97),
                 king_white: new ShogiPiece("king", 0, "white", 36, 167),
                 rook_white: new ShogiPiece("rook", 0, "white", 36, 237),
                 lance_white: new ShogiPiece("lance", 0, "white", 36, 307),
        },
        clicked: "",
        startX: 0,
        startY: 0,
        PPath: ["F"],
        KPath: ["AllDD", "AllSD"],
        LPath: ["MF"],
        RPath: ["MSD"],
        BPath: ["MDD"]
    };

    mark(type, color){
        let name = type + "_" + color;
        let isPlaying = this.state.pieces[name].getOnBoard();

        if(isPlaying === 1) {
            if(this.state.clicked === name) {
                this.setState({
                    clicked: ""
                });
                this.deleteMovement();
            } else {
                this.setState({
                    clicked: name
                });

                let movement;
                switch (type) {
                    case "king":
                        movement = this.state.KPath;
                        break;
                    case "lance":
                        movement = this.state.LPath;
                        break;
                    case "bishop":
                        movement = this.state.BPath;
                        break;
                    case "rook":
                        movement = this.state.RPath;
                        break;
                    case "pawn":
                        movement = this.state.PPath;
                        break;
                    default:
                        movement = [];
                }

                let cx = this.state.pieces[name].getX();
                let cy = this.state.pieces[name].getY();

                this.possibleMov(movement, color, cx, cy);
            }
        } else if (isPlaying === 0){
            let allPieces = this.state.pieces;

            for(let pName in allPieces){
                let piece = allPieces[pName];
                if(piece.getOnBoard() === 1){
                    this.deleteMovement();

                    let startX = this.state.startX;
                    let startY = this.state.startY;
                    piece.setX(startX);
                    piece.setY(startY);
                    piece.setOnBoard(0);

                    let playingID = document.getElementById(pName);
                    playingID.setAttribute("x", startX + "px");
                    playingID.setAttribute("y", startY + "px");

                    break;
                }
            }
            let newPiece = this.state.pieces[name];
            this.setState({
                clicked: "",
                startX: newPiece.getX(),
                startY: newPiece.getY()
            });

            newPiece.setX(272);
            newPiece.setY(157);
            newPiece.setOnBoard(1);
            let newPID = document.getElementById(name);
            newPID.setAttribute("x", 272 + "px");
            newPID.setAttribute("y", 157 + "px");
        }
    }

    possibleMov(movement, currentColor, cx, cy){
        const svg = document.querySelector(".svgBoard1");

        for (let i = 0; i < movement.length; i++) {
            if(movement[i] === "AllDD"){    //diagonal directions
                if((cx-38) >= 120 && (cy+38) < 347){
                    let bx = cx-38;
                    let by = cy+38;
                    let newRect1 =  this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect1);
                }

                if((cx-38) >= 120 && (cy-38) >= 5){
                    let bx = cx-38;
                    let by = cy-38;
                    let newRect2 = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect2);

                }

                if((cx+38) < 462 && (cy-38) >= 5){
                    let bx = cx+38;
                    let by = cy-38;
                    let newRect3 = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect3);
                }

                if((cx+38) < 462 && (cy+38) < 347){
                    let bx = cx+38;
                    let by = cy+38;
                    let newRect4 = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect4);
                }
            } else if (movement[i] === "F"){    // 1 forward
                if((cy-38) >= 5){
                    let bx = cx;
                    let by = cy-38;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
            } else if (movement[i] === "AllSD"){    //straight directions
                if((cx-38) >= 120){
                    let bx = cx-38;
                    let by = cy;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }

                if((cy-38) >= 5){
                    let bx = cx;
                    let by = cy-38;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);

                }

                if((cx+38) < 462){
                    let bx = cx+38;
                    let by = cy;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }

                if((cy+38) < 347){
                    let bx = cx;
                    let by = cy+38;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
            } else if (movement[i] === "MF"){    //many forward
                let n = (cy-5)/38;      //kolko ma pred sebou policok
                let k, bx, by;
                for (let i = 1; i <= n; i++) {
                    k = 38*i;
                    bx = cx;
                    by = cy-k;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
            } else if (movement[i] === "MSD"){    //many straight directions
                let n1 = (cy-5)/38;      //kolko ma pred sebou policok
                let n2 = (462-38-cx)/38;      //kolko ma na pravo policok
                let n3 = (347-38-cy)/38;      //kolko ma pod sebou policok
                let n4 = (cx-120)/38;      //kolko ma na lavo policok
                let k, bx, by;
                for (let i = 1; i <= n1; i++) {
                    k = 38*i;
                    bx = cx;
                    by = cy-k;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n2; i++) {
                    k = 38*i;
                    bx = cx+k;
                    by = cy;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n3; i++) {
                    k = 38*i;
                    bx = cx;
                    by = cy+k;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n4; i++) {
                    k = 38*i;
                    bx = cx-k;
                    by = cy;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
            } else if (movement[i] === "MDD"){    //many diagonal directions
                let n1 = this.diagSquaresNumber("topLeft", cx, cy);   //kolko ma na lavo hore policok
                let n2 = this.diagSquaresNumber("topRight", cx, cy);  //kolko ma na pravo hore policok
                let n3 = this.diagSquaresNumber("botRight", cx, cy);  //kolko ma na pravo dole policok
                let n4 = this.diagSquaresNumber("botLeft", cx, cy);   //kolko ma na lavo dole policok
                let k, bx, by;
                for (let i = 1; i <= n1; i++) {
                    k = 38*i;
                    bx = cx-k;
                    by = cy-k;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n2; i++) {
                    k = 38*i;
                    bx = cx+k;
                    by = cy-k;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n3; i++) {
                    k = 38*i;
                    bx = cx+k;
                    by = cy+k;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n4; i++) {
                    k = 38*i;
                    bx = cx-k;
                    by = cy+k;
                    let newRect =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, bx, by);
                    svg.appendChild(newRect);
                }
            }
        }
    }

    blueRect(obj, x,y){
        const svgns = "http://www.w3.org/2000/svg";
        let newRect = document.createElementNS(svgns, 'rect');

        for(let prop in obj) {
            newRect.setAttribute(prop, obj[prop]);
        }
        newRect.addEventListener("click", () => this.newPos(x,y));
        return newRect;
    }

    newPos(nx, ny) {
        this.deleteMovement();

        let name = this.state.clicked;
        let markType = this.state.pieces[name];
        markType.setX(nx);
        markType.setY(ny);
        let p = document.getElementById(name);
        p.setAttribute("x", nx + "px");
        p.setAttribute("y", ny + "px");

        this.setState({
            clicked: ""
        });
    }

    deleteMovement(){
        const svg = document.querySelector(".svgBoard1");
        while (svg.childNodes[32]) { //32 pretoze tam mame nakreslenych 32 veci a potom su uz len tie modre stvorce
            svg.removeChild(svg.childNodes[32]);
        }
    }
    boardClick(){
        this.setState({
            clicked: ""
        });
        this.deleteMovement();
    }

    diagSquaresNumber(direction, x, y){
        let nx;
        let ny;
        if(direction === "topLeft"){
            nx = (x-120)/38; //na lavo
            ny = (y-5)/38; //hore
        } else if (direction === "topRight"){
            nx = (462-38-x)/38; //na pravo
            ny = (y-5)/38; //hore
        } else if (direction === "botRight"){
            nx = (462-38-x)/38; //na pravo
            ny = (347-38-y)/38; //dole
        } else if (direction === "botLeft"){
            nx = (x-120)/38; //na lavo
            ny = (347-38-y)/38; //dole
        }

        if(nx <= ny){
            return nx;
        } else {
            return ny;
        }
    }

    render() {
        return (
            <div className="tutorialBoard">
                <svg className="svgBoard1" width="582px" height="360px" viewBox="0 0 582 360" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5px" y="5px" width="100px" height="342px" fill="bisque" stroke="black" />
                    <rect id="mainBoard" onClick={() => this.boardClick()} x="120px" y="5px" width="342px" height="342px" fill="wheat" stroke="black" />

                    <text x="10" y="24" fontWeight="bold" fontSize="18px" >Pešiak</text>
                    <text x="10" y="94" fontWeight="bold" fontSize="18px" >Strelec</text>
                    <text x="10" y="164" fontWeight="bold" fontSize="18px" >Kráľ</text>
                    <text x="10" y="234" fontWeight="bold" fontSize="18px" >Veža</text>
                    <text x="10" y="304" fontWeight="bold" fontSize="18px" >Oštep</text>

                    <line x1="158px" y1="5px" x2="158px" y2="347px" stroke="black" strokeWidth="1px" />
                    <line x1="196px" y1="5px" x2="196px" y2="347px" stroke="black" strokeWidth="1px" />
                    <line x1="234px" y1="5px" x2="234px" y2="347px" stroke="black" strokeWidth="1px" />
                    <line x1="272px" y1="5px" x2="272px" y2="347px" stroke="black" strokeWidth="1px" />
                    <line x1="310px" y1="5px" x2="310px" y2="347px" stroke="black" strokeWidth="1px" />
                    <line x1="348px" y1="5px" x2="348px" y2="347px" stroke="black" strokeWidth="1px" />
                    <line x1="386px" y1="5px" x2="386px" y2="347px" stroke="black" strokeWidth="1px" />
                    <line x1="424px" y1="5px" x2="424px" y2="347px" stroke="black" strokeWidth="1px" />

                    <line x1="120px" y1="43px" x2="462px" y2="43px" stroke="black" strokeWidth="1px" />
                    <line x1="120px" y1="81px" x2="462px" y2="81px" stroke="black" strokeWidth="1px" />
                    <line x1="120px" y1="119px" x2="462px" y2="119px" stroke="black" strokeWidth="1px" />
                    <line x1="120px" y1="157px" x2="462px" y2="157px" stroke="black" strokeWidth="1px" />
                    <line x1="120px" y1="195px" x2="462px" y2="195px" stroke="black" strokeWidth="1px" />
                    <line x1="120px" y1="233px" x2="462px" y2="233px" stroke="black" strokeWidth="1px" />
                    <line x1="120px" y1="271px" x2="462px" y2="271px" stroke="black" strokeWidth="1px" />
                    <line x1="120px" y1="309px" x2="462px" y2="309px" stroke="black" strokeWidth="1px" />

                    <circle cx="234px" cy="119px" r="3px" fill="black" />
                    <circle cx="234px" cy="233px" r="3px" fill="black" />
                    <circle cx="348px" cy="119px" r="3px" fill="black" />
                    <circle cx="348px" cy="233px" r="3px" fill="black" />

                    <image id="pawn_white" onClick={() => this.mark("pawn", "white")} href="images/normal/pawn.png" x="36" y="27" height="38px" width="38px" cursor="pointer" />
                    <image id="bishop_white" onClick={() => this.mark("bishop", "white")} href="images/normal/bishop.png" x="36" y="97" height="38px" width="38px" cursor="pointer" />
                    <image id="king_white" onClick={() => this.mark("king", "white")} href="images/normal/king.png" x="36" y="167" height="38px" width="38px" cursor="pointer" />
                    <image id="rook_white" onClick={() => this.mark("rook", "white")} href="images/normal/rook.png" x="36" y="237" height="38px" width="38px" cursor="pointer" />
                    <image id="lance_white" onClick={() => this.mark("lance", "white")} href="images/normal/lance.png" x="36" y="307" height="38px" width="38px" cursor="pointer" />
                </svg>
            </div>
        );
    }
}

ReactDOM.render(<Board1 />, document.getElementById('hracia_plocha1'));