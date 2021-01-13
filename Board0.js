
class Board0 extends React.Component {
    state = {
        pieces: {
            king_white_B0: new ShogiPiece("king", 1, "white", 272, 195),
            king_black_B0: new ShogiPiece("king", 1, "black", 272, 119)
        },
        clicked: "",
        KPath: ["AllDD", "AllSD"],

        situationNum: 1,
        canMove: false
    };

    mark(type, color){
        let name = type + "_" + color + "_B0";
        if(this.state.clicked !== name) {   //zaklikni
            this.deleteMovement();
            this.setState({
                clicked: name
            });
            this.changeTextField(type); //zmen meno v txt poli

            let rectColor;
            if (color === "white") {
                rectColor = "blue";
            } else if (color === "black") {
                rectColor = "royalblue";
            }

            let movement;
            switch (type) {
                case "king":
                    movement = this.state.KPath;
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
        const svg = document.querySelector(".svgBoard0");

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
            }
        }
    }

    blueRect(obj, x,y, currentColor){
        const svgns = "http://www.w3.org/2000/svg";
        let newRect = document.createElementNS(svgns, 'rect');

        for(let prop in obj) {
            newRect.setAttribute(prop, obj[prop]);
        }
        if(currentColor === "white" && this.state.canMove){
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

        let markType = this.state.pieces[name];

        markType.setX(nx);      //pohyb figurky
        markType.setY(ny);
        let p = document.getElementById(name);
        p.setAttribute("x", nx + "px");
        p.setAttribute("y", ny + "px");

        //kotrola ci som vyhodil superovho krala
        let e = this.state.pieces["king_black_B0"];
        if(e.getX() === nx && e.getY() === ny){

            e.setX(480);
            e.setY(230);
            let enemyP = document.getElementById("king_black_B0");
            enemyP.setAttribute("href", "images/normal/king.png");
            enemyP.setAttribute("x", 480 + "px");
            enemyP.setAttribute("y", 230 + "px");

            //zavola sa konecne okno
            setTimeout(() => {
                this.modalWindows("takeKingEnd");
            }, 400);
        } else {
            setTimeout(() => {
                this.modalWindows("moveEnd");
            }, 400);
        }
    }

    deleteMovement(){
        const svg = document.querySelector(".svgBoard0");
        while (svg.childNodes[28]) { //28 pretoze tam mame nakreslenych 28 veci a potom su uz len tie modre stvorce
            svg.removeChild(svg.childNodes[28]);
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
        let field = document.getElementById("textField_B0");
        if(name === "king"){
            field.textContent = "Kráľ";
        } else {
            field.textContent = "";
        }
    }

    modalWindows(type){
        let iW = document.getElementById("informationW_B0");    //ukryjeme pomocne okno na strane
        iW.style.visibility = "hidden";

        if(type === "takeKingEnd"){
            let w = document.getElementById("goodEndW_B0");
            w.style.display = "block";
        } else if(type === "moveEnd"){
            let w = document.getElementById("badEndW_B0");
            w.style.display = "block";
        }

        let w = document.getElementById("transparent_B0");
        w.style.display = "block";
    }

    nextWindowText(){
        this.deleteMovement();
        this.changeTextField(""); //zmen meno v txt poli

        let situation = this.state.situationNum;
        situation++;

        let wText = document.getElementById("windowText_B0");
        if(situation === 2){
            document.getElementById("green_rect_B0").style.visibility = "visible";
            document.getElementById("king_white_B0").style.visibility = "visible";
            wText.innerHTML = "Predstavenie vašej figúrky,<br/> je to figúrka <b>Kráľa</b>. Hráč<br/> prehráva, ak ju stratí.";
        } else if(situation === 3) {
            document.getElementById("red_rect_B0").style.visibility = "visible";
            document.getElementById("king_black_B0").style.visibility = "visible";
            wText.innerHTML = "Vstup nepriateľskej figúrky<br/> <b>Kráľa</b> - hrot figúrky vždy<br/> smeruje na súpera.";
        } else if(situation === 4) {
            document.getElementById("green_rect_B0").style.visibility = "hidden";
            document.getElementById("red_rect_B0").style.visibility = "hidden";
            wText.innerHTML = "Nepriateľský <b>Kráľ</b> sa pohol<br/> o jedno políčko dopredu.<br/> Tvoj <b>Kráľ</b> je v ohrození.";

            this.state.pieces["king_black_B0"].setY(157);  //staci zmenit len y suradnicu lebo sa posuvame dole
            let p = document.getElementById("king_black_B0");
            p.setAttribute("y", 157 + "px");
        } else if(situation === 5) {
            wText.innerHTML = 
                "<u>Pohyb</u> - klikni na svojho<br/> <b>Kráľa</b> a následne zvoľ<br/> jedno z vyznačených políčok.";
            document.getElementById("infButton_B0").style.display = "none";     //ukry button lebo neni potrebny

            this.setState({
                canMove: true
            });
        }

        this.setState({
            clicked: "",
            situationNum: situation
        });
    }

    resetBoard(end){
        this.setState({
            clicked: "",
            situationNum: 1,
            canMove: false
        });

        this.state.pieces["king_white_B0"].setX(272);
        this.state.pieces["king_white_B0"].setY(195);

        this.state.pieces["king_black_B0"].setX(272);
        this.state.pieces["king_black_B0"].setY(119);

        let p = document.getElementById("king_white_B0");
        p.setAttribute("x", 272 + "px");
        p.setAttribute("y", 195 + "px");
        p.style.visibility = "hidden";

        p = document.getElementById("king_black_B0");
        p.setAttribute("href", "images/rotate/king.png");
        p.setAttribute("x", 272 + "px");
        p.setAttribute("y", 119 + "px");
        p.style.visibility = "hidden";

        if(end === "good"){
            let w = document.getElementById("goodEndW_B0");    //ukry okno
            w.style.display = "none";
        } else if(end === "bad"){
            let w = document.getElementById("badEndW_B0");    //ukry okno
            w.style.display = "none";
        }
        let w = document.getElementById("transparent_B0");    //ukry okno
        w.style.display = "none";

        let wText = document.getElementById("windowText_B0");   //zmen text
        wText.innerHTML = "Predstavenie hernej plochy<br/> s 9x9 políčkami.";
        document.getElementById("infButton_B0").style.display = "block";     //zobraz button lebo uz je potrebny
        let iW = document.getElementById("informationW_B0");    //zobraz pomocne okno na strane
        iW.style.visibility = "visible";
    }

    render() {
        return (
            <div className="tutorialBoard">
                <svg className="svgBoard0" width="582px" height="360px" viewBox="0 0 582 360" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5px" y="5px" width="100px" height="120px" fill="bisque" stroke="black" />
                    <rect id="mainBoard_B0" onClick={() => this.boardClick()} x="120px" y="5px" width="342px" height="342px" fill="wheat" stroke="black" />
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

                    <rect id="green_rect_B0" x="272px" y="195px" width="38px" height="38px" fill="none" strokeWidth="3px" stroke="green" visibility="hidden" />
                    <rect id="red_rect_B0" x="272px" y="119px" width="38px" height="38px" fill="none" strokeWidth="3px" stroke="red" visibility="hidden" />
                    <image id="king_white_B0" onClick={() => this.mark("king", "white")} href="images/normal/king.png" x="272" y="195" height="38px" width="38px" cursor="pointer" visibility="hidden" />
                    <image id="king_black_B0" onClick={() => this.mark("king", "black")} href="images/rotate/king.png" x="272" y="119" height="38px" width="38px" cursor="pointer" visibility="hidden" />

                    <text id="textField_B0" x="12" y="240" fontWeight="bold" fontSize="25px" strokeWidth="0.5px" stroke="white"> </text>
                </svg>
                <svg id="transparent_B0" width="582px" height="360px">
                    <rect width="582px" height="360px" fill-opacity="0"/>
                </svg>
                <div id="informationW_B0">
                    <p id="windowText_B0">Predstavenie hernej plochy<br/> s 9x9 políčkami.</p>
                    <a id="infButton_B0" type="button" className="btn btn-outline-dark" onClick={() => this.nextWindowText()}>Ďalej</a>
                </div>

                <div id="goodEndW_B0">
                    <p>Dobrá práca, vyhral si!</p>
                    <p>Zajal si<br/> súperovho <b>Kráľa</b>.<br/>V skutočnej hre to tak ľahké nebude,<br/>ale si na dobrej ceste.</p>
                    <a type="button" className="btn btn-outline-dark" onClick={() => this.resetBoard("good")}>Resetovať</a>
                </div>
                <div id="badEndW_B0">
                    <p>Pozor, zmeškal si šancu!</p>
                    <p>Mal si šancu zajať kráľa,<br/> no rozhodol si sa ustúpiť.<br/>Keď zmeškáš v Shogi šancu na zajatie figúrky,<br/> ďalšiu už nemusíš dostať.</p>
                    <a type="button" className="btn btn-outline-dark" onClick={() => this.resetBoard("bad")}>Resetovať</a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Board0 />, document.getElementById('hracia_plocha0'));