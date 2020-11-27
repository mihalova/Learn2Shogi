class Board1 extends React.Component {
    state = {//nemam vyriesene ze ked vyhodis protihraca tak je potom tvoj(asi spravil len classy bez tych mien v
        // pieces alebo by som posielal id v poli cez stlacenie)
        pieces: {pawn_black: new ShogiPiece("pawn", 1, "black", 234, 119),
            silver_white: new ShogiPiece("silver", 1, "white", 272, 157)
        },
        clicked: "",
        SPath: ["AllDD", "F"],
        PPath: ["F"],
        KPath: ["AllDD", "AllSD"],
        LPath: ["MF"],
        RPath: ["MSD"]
    };

    mark(type, color){
        let name = type + "_" + color;
        console.log(this.state.pieces[name].getColor());
        if(this.state.clicked !== name) {   //zaklikni
            this.setState({
                clicked: name
            });

            let movement;
            switch (type) {
                case "king":
                    movement = this.state.KPath;
                    break;
                case "gold":
                    movement = [];
                    break;
                case "silver":
                    movement = this.state.SPath;
                    break;
                case "promotedSilver":
                    movement = [];
                    break;
                case "knight":
                    movement = [];
                    break;
                case "promotedKnight":
                    movement = [];
                    break;
                case "lance":
                    movement = this.state.LPath;
                    break;
                case "promotedLance":
                    movement = [];
                    break;
                case "bishop":
                    movement = [];
                    break;
                case "promotedBishop":
                    movement = [];
                    break;
                case "rook":
                    movement = this.state.RPath;
                    break;
                case "promotedRook":
                    movement = [];
                    break;
                case "pawn":
                    movement = this.state.PPath;
                    break;
                case "promotedPawn":
                    movement = [];
                    break;
                default:
                    movement = [];
            }
            let cx = this.state.pieces[name].getX();
            let cy = this.state.pieces[name].getY();

            this.possibleMov(movement, cx, cy);
        } else { //odklikni
            this.setState({
                clicked: ""
            });
            const svg = document.querySelector("svg");
            while (svg.childNodes[25]) { //25 pretoze tam mame nakreslenych 25 veci a potom su uz len tie modre stvorce
                svg.removeChild(svg.childNodes[25]);
            }
        }
    }

    possibleMov(movement, cx, cy){
        const svg = document.querySelector("svg");

        for (let i = 0; i < movement.length; i++) {
            if(movement[i] === "AllDD"){    //diagonal directions
                if((cx-38) >= 120 && (cy+38) < 347){
                    let newRect1 =  this.blueRect({
                        'x':cx-38, 'y':cy+38,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx-38, cy+38);
                    svg.appendChild(newRect1);
                }

                if((cx-38) >= 120 && (cy-38) >= 5){
                    let newRect2 =  this.blueRect({
                        'x':cx-38, 'y':cy-38,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx-38, cy-38);
                    svg.appendChild(newRect2);
                }

                if((cx+38) < 462 && (cy-38) >= 5){
                    let newRect3 =  this.blueRect({
                        'x':cx+38, 'y':cy-38,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx+38, cy-38);
                    svg.appendChild(newRect3);
                }

                if((cx+38) < 462 && (cy+38) < 347){
                    let newRect4 =  this.blueRect({
                        'x':cx+38, 'y':cy+38,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx+38, cy+38);
                    svg.appendChild(newRect4);
                }
            } else if (movement[i] === "F"){    // 1 forward
                if((cy-38) >= 5){
                    let newRect =  this.blueRect({
                        'x':cx, 'y':cy-38,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx, cy-38);
                    svg.appendChild(newRect);
                }
            } else if (movement[i] === "AllSD"){    //straight directions
                if((cx-38) >= 120){
                    let newRect =  this.blueRect({
                        'x':cx-38, 'y':cy,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx-38, cy);
                    svg.appendChild(newRect);
                }

                if((cy-38) >= 5){
                    let newRect =  this.blueRect({
                        'x':cx, 'y':cy-38,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx, cy-38);
                    svg.appendChild(newRect);
                }

                if((cx+38) < 462){
                    let newRect =  this.blueRect({
                        'x':cx+38, 'y':cy,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx+38, cy);
                    svg.appendChild(newRect);
                }

                if((cy+38) < 347){
                    let newRect =  this.blueRect({
                        'x':cx, 'y':cy+38,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx, cy+38);
                    svg.appendChild(newRect);
                }
            } else if (movement[i] === "MF"){    //many forward
                let n = (cy-5)/38;      //kolko ma pred sebou policok
                for (let i = 1; i <= n; i++) {
                    let k = 38*i;
                    let newRect =  this.blueRect({
                        'x':cx, 'y':cy-k,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx, cy-k);
                    svg.appendChild(newRect);
                }
            } else if (movement[i] === "MSD"){    //many straight directions
                let n1 = (cy-5)/38;      //kolko ma pred sebou policok
                let n2 = (462-38-cx)/38;      //kolko ma na pravo policok
                let n3 = (347-38-cy)/38;      //kolko ma pod sebou policok
                let n4 = (cx-120)/38;      //kolko ma na lavo policok
                for (let i = 1; i <= n1; i++) {
                    let k = 38*i;
                    let newRect =  this.blueRect({
                        'x':cx, 'y':cy-k,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx, cy-k);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n2; i++) {
                    let k = 38*i;
                    let newRect =  this.blueRect({
                        'x':cx+k, 'y':cy,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx+k, cy);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n3; i++) {
                    let k = 38*i;
                    let newRect =  this.blueRect({
                        'x':cx, 'y':cy+k,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx, cy+k);
                    svg.appendChild(newRect);
                }
                for (let i = 1; i <= n4; i++) {
                    let k = 38*i;
                    let newRect =  this.blueRect({
                        'x':cx-k, 'y':cy,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': "blue",
                        'pointer-events': "visible",
                    }, cx-k, cy);
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
        const svg = document.querySelector("svg");
        while (svg.childNodes[25]) { //25 pretoze tam mame nakreslenych 25 veci a potom su uz len tie modre stvorce
            svg.removeChild(svg.childNodes[25]);
        }

        let allPieces = this.state.pieces;
        let name = this.state.clicked;
        let markType = this.state.pieces[name];
        let canMove = true;
        for(let pieceN in allPieces){
            let pieceClass = allPieces[pieceN];
            if(pieceClass.getX() === nx && pieceClass.getY() === ny){
                if(pieceClass.getColor() !== markType.getColor()){
                    let enemyN = pieceClass.getName();
                    let enemyP = document.getElementById(pieceN);
                    enemyP.setAttribute("href", "images/normal/"+enemyN+".png");
                    enemyP.setAttribute("x", 480 + "px");
                    enemyP.setAttribute("y", 230 + "px");
                }else{
                    canMove = false;
                    break;
                }
            }
        }

        if(canMove){
            markType.setX(nx);
            markType.setY(ny);
            let p = document.getElementById(name);
            p.setAttribute("x", nx + "px");
            p.setAttribute("y", ny + "px");
        }
        this.setState({
            clicked: ""
        });
    }


    render() {
        return (
            <div className="tutorialBoard">
                <svg width="582px" height="360px" viewBox="0 0 582 360" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5px" y="5px" width="100px" height="120px" fill="bisque" stroke="black" />
                    <rect id="mainBoard" x="120px" y="5px" width="342px" height="342px" fill="wheat" stroke="black" />
                    <rect x="477px" y="227px" width="100px" height="120px" fill="bisque" stroke="black" />

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

                    <image id="silver_white" onClick={() => this.mark("silver", "white")} href="images/normal/silver.png" x="272" y="157" height="38px" width="38px" />
                    <image id="pawn_black" href="images/rotate/pawn.png" x="234" y="119" height="38px" width="38px" />
                </svg>
            </div>
        );
    }
}

ReactDOM.render(<Board1 />, document.getElementById('hracia_plocha'));