
class Board3 extends React.Component {
    state = {
        //onBoard tu bude znamenat ze ci je v ploche kde sa da povysit
        pieces: {lance_white_B3: new ShogiPiece("lance", 0, "white", 310, 271),
            promLance_white_B3: new ShogiPiece("promLance", 1, "white", 0, 0),
            king_black_B3: new ShogiPiece("king", 1, "black", 234, 5)
        },
        clicked: "",
        KPath: ["AllDD", "AllSD"],
        LPath: ["MF"],
        promLPath: ["AllSD", "FD"],
        kingStep: -1,

        markTypeParameter: "lance"
    };

    mark(type, color){
        let name = type + "_" + color + "_B3";
        if(this.state.clicked !== name) {   //zaklikni
            this.deleteMovement();
            this.setState({
                clicked: name
            });
            this.changeTextField(type); //zmen meno v txt poli

            let movement;
            let rectColor;
            switch (type) {
                case "king":
                    movement = this.state.KPath;
                    rectColor = "royalblue";
                    break;
                case "lance":
                    movement = this.state.LPath;
                    rectColor = "blue";
                    break;
                case "promLance":
                    movement = this.state.promLPath;
                    rectColor = "red";
                    break;
                default:
                    movement = [];
            }
            let cx = this.state.pieces[name].getX();
            let cy = this.state.pieces[name].getY();

            this.possibleMov(movement, color, rectColor, cx, cy);
        } else { //odklikni
            this.setState({
                clicked: ""
            });
            this.deleteMovement();
            this.changeTextField(""); //zmen meno v txt poli
        }
    }

    possibleMov(movement, currentColor, rectColor, cx, cy){
        const svg = document.querySelector(".svgBoard3");

        for (let i = 0; i < movement.length; i++) {
            if(movement[i] === "AllDD"){    //diagonal directions
                if((cx-38) >= 120 && (cy+38) < 347){
                    let bx = cx-38;
                    let by = cy+38;
                    let newRect1 =  this.blueRect({
                        'x':bx, 'y':by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect1);
                }

                if((cx-38) >= 120 && (cy-38) >= 5){
                    let bx = cx-38;
                    let by = cy-38;
                    let newRect2 = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect2);
                }

                if((cx+38) < 462 && (cy-38) >= 5){
                    let bx = cx+38;
                    let by = cy-38;
                    let newRect3 = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect3);
                }

                if((cx+38) < 462 && (cy+38) < 347){
                    let bx = cx+38;
                    let by = cy+38;
                    let newRect4 = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect4);
                }
            } else if (movement[i] === "AllSD"){    //straight directions
                if((cx-38) >= 120){
                    let bx = cx-38;
                    let by = cy;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect);
                }

                if((cy-38) >= 5){
                    let bx = cx;
                    let by = cy-38;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect);
                }

                if((cx+38) < 462){
                    let bx = cx+38;
                    let by = cy;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect);
                }

                if((cy+38) < 347){
                    let bx = cx;
                    let by = cy+38;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
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
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect);
                }
            } else if(movement[i] === "FD"){    //forward diagonal | pre promoted lance tak tu mozme dat cervene stvorceky
                if((cx-38) >= 120 && (cy-38) >= 5){
                    let bx = cx-38;
                    let by = cy-38;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect);
                }

                if((cx+38) < 462 && (cy-38) >= 5){
                    let bx = cx+38;
                    let by = cy-38;
                    let newRect = this.blueRect({
                        'x': bx, 'y': by,
                        'width': 38, 'height': 38,
                        'fill': "none",
                        'stroke-width': 3, 'stroke': rectColor,
                        'pointer-events': "visible",
                    }, bx, by, currentColor);
                    svg.appendChild(newRect);
                }
            }
        }
    }

    blueRect(obj, x,y, currentColor){
        const svgns = "http://www.w3.org/2000/svg";
        let newRect = document.createElementNS(svgns, 'rect');

        for(let prop in obj) {
            newRect.setAttribute(prop, obj[prop]);
        }
        if(currentColor === "white"){
            newRect.addEventListener("click", () => this.newPos(x,y));
        }
        return newRect;
    }

    newPos(nx, ny) {
        this.deleteMovement();
        this.changeTextField(""); //zmen meno v txt poli

        let name = this.state.clicked;
        this.setState({
            clicked: ""
        });  //odklikni

        let canMove = true;
        let markType = this.state.pieces[name];
        if ((markType.getColor() === "white") && markType.getOnBoard() === 0) {
            if(ny < 119){
                canMove = false;

                markType.setX(0);   //stary lance lebo sa to zmeni na novy tak davame tomuto 0 0
                markType.setY(0);
                let p = document.getElementById(name);
                p.setAttribute("x", nx + "px");
                p.setAttribute("y", ny + "px");

                let pLance = this.state.pieces["promLance_white_B3"];
                pLance.setX(nx); //v pieces davame promLance x a y
                pLance.setY(ny);

                //si v cervenej zone vyskoci okno
                setTimeout(() => {
                    this.modalWindows("promote");
                }, 400);
            }
        }

        if(canMove){
            markType.setX(nx);      //pohyb figurky
            markType.setY(ny);
            let p = document.getElementById(name);
            p.setAttribute("x", nx + "px");
            p.setAttribute("y", ny + "px");

            let canKingMove = true;
            let allPieces = this.state.pieces;      //kotrola ci som niekoho nevyhodil
            for(let pieceN in allPieces){
                let pieceClass = allPieces[pieceN];
                if(pieceClass.getX() === nx && pieceClass.getY() === ny){
                    if(pieceClass.getColor() !== markType.getColor()){
                        canKingMove = false;

                        pieceClass.setX(480);
                        pieceClass.setY(230);
                        let enemyN = pieceClass.getName();
                        let enemyP = document.getElementById(pieceN);
                        enemyP.setAttribute("href", "images/normal/"+enemyN+".png");
                        enemyP.setAttribute("x", 480 + "px");
                        enemyP.setAttribute("y", 230 + "px");

                        //zavola sa konecne okno
                        setTimeout(() => {
                            this.modalWindows("goodEnd");
                        }, 400);
                    }
                }
            }
            if(canKingMove){
                setTimeout(() => {
                    this.kingMov();
                }, 400);
            }
        }
    }

    deleteMovement(){
        const svg = document.querySelector(".svgBoard3");
        while (svg.childNodes[26]) { //26 pretoze tam mame nakreslenych 26 veci a potom su uz len tie modre stvorce
            svg.removeChild(svg.childNodes[26]);
        }
    }
    boardClick(){
        this.setState({
            clicked: ""
        });
        this.deleteMovement();
        this.changeTextField(""); //zmen meno v txt poli
    }

    changeTextField(name){
        let field = document.getElementById("textField_B3");
        if(name === "king"){
            field.textContent = "Kráľ";
        } else if(name === "lance") {
            field.textContent = "Oštep";
        } else if(name === "promLance"){
            field.textContent = "^Oštep";
        } else {
            field.textContent = "";
        }
    }

    kingMov(){
        let kingStep = this.state.kingStep;
        let king = this.state.pieces["king_black_B3"];
        let p = document.getElementById("king_black_B3");

        let newY;
        if(kingStep === -1) {
            newY = king.getY() + 38;        //dole sa pohni
            this.setState({
                kingStep: 1
            });
        } else if(kingStep === 1){
            newY = king.getY() - 38;     //hore sa pohni
            this.setState({
                kingStep: -1
            });
        }
        king.setY(newY); //pohyb cieneho krala,tu staci zmenit len y kedze chodi dole, hore
        p.setAttribute("y",  newY + "px"); //aj tu staci menit len y

        let enemy = this.state.pieces["promLance_white_B3"];
        if((enemy.getX() === king.getX()) && (enemy.getY() === king.getY())){
            enemy.setX(8);
            enemy.setY(84);
            let enemyP = document.getElementById("promLance_white_B3");
            enemyP.setAttribute("href", "images/rotate/lance.png"); //strati povysenie tak sa da na lance,
            // ale zatial tu nepremiename id, ani state, ani origin. lanceho
            enemyP.setAttribute("x", 8 + "px");
            enemyP.setAttribute("y", 84 + "px");

            //okno ze to zle dopadlo
            setTimeout(() => {
                this.modalWindows("badEnd");
            }, 400);
        }
    }

    modalWindows(type){
        if(type === "promote"){
            let w = document.getElementById("promoteW");
            w.style.display = "block";
        } else if(type === "goodEnd"){
            let w = document.getElementById("goodEndW_B3");
            w.style.display = "block";
        } else if(type === "badEnd"){
            let w = document.getElementById("badEndW_B3");
            w.style.display = "block";
        }
        let w = document.getElementById("transparent_B3");
        w.style.display = "block";
    }

    promoteP(){
        let w = document.getElementById("promoteW");    //ukry okno
        w.style.display = "none";
        let q = document.getElementById("transparent_B3");    //ukry okno
        q.style.display = "none";

        // tu menime prvy parameter v img(lance) onclick funkcia mark
        this.setState({
            markTypeParameter: "promLance"
        });
        let p = document.getElementById("lance_white_B3");
        p.setAttribute("href", "images/normal/promLance.png");
        p.id = "promLance_white_B3";

        //pohneme kralom
        setTimeout(() => {
            this.kingMov();
        }, 400);
    }

    resetBoard(end){
        this.setState({
            clicked: "",
            kingStep: -1,
            markTypeParameter: "lance"
        });
        this.state.pieces["lance_white_B3"].setX(310);
        this.state.pieces["lance_white_B3"].setY(271);
        this.state.pieces["lance_white_B3"].setOnBoard(0);

        this.state.pieces["promLance_white_B3"].setX(0);
        this.state.pieces["promLance_white_B3"].setY(0);

        this.state.pieces["king_black_B3"].setX(234);
        this.state.pieces["king_black_B3"].setY(5);

        let p = document.getElementById("promLance_white_B3");
        p.setAttribute("href", "images/normal/lance.png");
        p.setAttribute("x", 310 + "px");
        p.setAttribute("y", 271 + "px");
        p.id = "lance_white_B3";

        p = document.getElementById("king_black_B3");
        p.setAttribute("href", "images/rotate/king.png");
        p.setAttribute("x", 234 + "px");
        p.setAttribute("y", 5 + "px");

        if(end === "good"){
            let w = document.getElementById("goodEndW_B3");    //ukry okno
            w.style.display = "none";
        } else if(end === "bad"){
            let w = document.getElementById("badEndW_B3");    //ukry okno
            w.style.display = "none";
        }
        let w = document.getElementById("transparent_B3");    //ukry okno
        w.style.display = "none";
    }

    render() {
        return (
            <div className="tutorialBoard">
                <svg className="svgBoard3" width="582px" height="360px" viewBox="0 0 582 360" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5px" y="5px" width="100px" height="120px" fill="bisque" stroke="black" />
                    <rect id="mainBoard_B3" onClick={() => this.boardClick()} x="120px" y="5px" width="342px" height="342px" fill="wheat" stroke="black" />
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

                    <image id="lance_white_B3" onClick={() => this.mark(this.state.markTypeParameter, "white")} href="images/normal/lance.png" x="310" y="271" height="38px" width="38px" cursor="pointer" />
                    <image id="king_black_B3" onClick={() => this.mark("king", "black")} href="images/rotate/king.png" x="234" y="5" height="38px" width="38px" cursor="pointer" />

                    <text id="textField_B3" x="12" y="240" fontWeight="bold" fontSize="25px" strokeWidth="0.5px" stroke="white"> </text>
                </svg>
                <svg id="transparent_B3" width="582px" height="360px">
                    <rect width="582px" height="360px" fill-opacity="0"/>
                </svg>
                <div id="promoteW">
                    <p>Tvoja figúrka sa teraz môže povýšiť na:</p>
                    <p>Povýšený Oštep</p>
                    <a type="button" className="btn btn-outline-dark" onClick={() => this.promoteP()}>OK</a>
                </div>
                <div id="goodEndW_B3">
                    <p>Dobrá práca, zvládol si to!</p>
                    <a type="button" className="btn btn-outline-dark" onClick={() => this.resetBoard("good")}>Resetovať</a>
                </div>
                <div id="badEndW_B3">
                    <p>Bol si vyhodený!</p>
                    <p>Nepodarilo sa ti splniť úlohu.</p>
                    <a type="button" className="btn btn-outline-dark" onClick={() => this.resetBoard("bad")}>Skús to znova</a>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<Board3 />, document.getElementById('hracia_plocha3'));