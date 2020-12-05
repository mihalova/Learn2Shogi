
class Board4 extends React.Component {
    state = {
        //onBoard znamena ze ci sme na ploche alebo ci sme vyhodeny
        pieces: {
            king_black_B4: new ShogiPiece("king", 1, "black", 424, 157),
            rook_black_B4: new ShogiPiece("rook", 1, "black", 348, 195),
            rook_white_B4: new ShogiPiece("rook", 0, "white", 0, 0),
            pawn_white_B4: new ShogiPiece("pawn", 1, "white", 348, 233)
        },
        squares: [
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("king_black_B4","black")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("rook_black_B4","black"), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("pawn_white_B4","white"), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")]
        ],
        clicked: "",
        PPath: ["F"],
        KPath: ["AllDD", "AllSD"],
        RPath: ["MSD"],
        kingStep: -1,

        markTypeParameter: "black"
    };

    mark(type, color){
        let name = type + "_" + color + "_B4";
        if(this.state.clicked !== name) {   //zaklikni
            this.deleteMovement();
            this.setState({
                clicked: name
            });
            this.changeTextField(type); //zmen meno v txt poli

            //ak je vyradeny
            if(this.state.pieces[name].getOnBoard() === 0){
                this.possiblePlaces(color);  //sprav plochu na vyber polozenia figurky
            } else {        //ak sa to rovna 1

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

                this.possibleMov(movement, color, rectColor, cx, cy);
            }
        } else { //odklikni
            this.setState({
                clicked: ""
            });
            this.deleteMovement();
            this.changeTextField(""); //zmen meno v txt poli
        }
    }

    possibleMov(movement, currentColor, rectColor, cx, cy){
        const svg = document.querySelector(".svgBoard4");

        for (let i = 0; i < movement.length; i++) {
            if(movement[i] === "AllDD"){    //diagonal directions
                if((cx-38) >= 120 && (cy+38) < 347){
                    let bx = cx-38;
                    let by = cy+38;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor){
                        let newRect1 =  this.blueRect({
                            'x':bx, 'y':by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect1);
                    }
                }

                if((cx-38) >= 120 && (cy-38) >= 5){
                    let bx = cx-38;
                    let by = cy-38;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect2 = this.blueRect({
                            'x': bx, 'y': by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect2);
                    }
                }

                if((cx+38) < 462 && (cy-38) >= 5){
                    let bx = cx+38;
                    let by = cy-38;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect3 = this.blueRect({
                            'x': bx, 'y': by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect3);
                    }
                }

                if((cx+38) < 462 && (cy+38) < 347){
                    let bx = cx+38;
                    let by = cy+38;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect4 = this.blueRect({
                            'x': bx, 'y': by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect4);
                    }
                }
            } else if (movement[i] === "F"){
                if((cy-38) >= 5){
                    let bx = cx;
                    let by = cy-38;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
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
            } else if (movement[i] === "AllSD"){    //straight directions
                if((cx-38) >= 120){
                    let bx = cx-38;
                    let by = cy;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
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

                if((cy-38) >= 5){
                    let bx = cx;
                    let by = cy-38;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
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

                if((cx+38) < 462){
                    let bx = cx+38;
                    let by = cy;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
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

                if((cy+38) < 347){
                    let bx = cx;
                    let by = cy+38;
                    let i1 = (by-5)/38;
                    let i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
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
            } else if (movement[i] === "MSD"){    //many straight directions
                let n1 = (cy-5)/38;      //kolko ma pred sebou policok
                let n2 = (462-38-cx)/38;      //kolko ma na pravo policok
                let n3 = (347-38-cy)/38;      //kolko ma pod sebou policok
                let n4 = (cx-120)/38;      //kolko ma na lavo policok
                let k, bx, by, i1, i2;
                for (let i = 1; i <= n1; i++) {
                    k = 38*i;
                    bx = cx;
                    by = cy-k;
                    i1 = (by-5)/38;
                    i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect =  this.blueRect({
                            'x':bx, 'y':by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect);

                        if(this.state.squares[i1][i2].getColor() !== ""){
                            break;
                        }
                    } else {
                        break;  //je niekto tam mojej farby
                    }
                }
                for (let i = 1; i <= n2; i++) {
                    k = 38*i;
                    bx = cx+k;
                    by = cy;
                    i1 = (by-5)/38;
                    i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect =  this.blueRect({
                            'x':bx, 'y':by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect);

                        if(this.state.squares[i1][i2].getColor() !== ""){
                            break;
                        }
                    } else {
                        break;  //je niekto tam mojej farby
                    }
                }
                for (let i = 1; i <= n3; i++) {
                    k = 38*i;
                    bx = cx;
                    by = cy+k;
                    i1 = (by-5)/38;
                    i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect =  this.blueRect({
                            'x':bx, 'y':by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect);

                        if(this.state.squares[i1][i2].getColor() !== ""){
                            break;
                        }
                    } else {
                        break;  //je niekto tam mojej farby
                    }
                }
                for (let i = 1; i <= n4; i++) {
                    k = 38*i;
                    bx = cx-k;
                    by = cy;
                    i1 = (by-5)/38;
                    i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect =  this.blueRect({
                            'x':bx, 'y':by,
                            'width': 38, 'height': 38,
                            'fill': "none",
                            'stroke-width': 3, 'stroke': rectColor,
                            'pointer-events': "visible",
                        }, bx, by, currentColor);
                        svg.appendChild(newRect);

                        if(this.state.squares[i1][i2].getColor() !== ""){
                            break;
                        }
                    } else {
                        break;  //je niekto tam mojej farby
                    }
                }
            }
        }
    }

    possiblePlaces(currentColor){
        const svg = document.querySelector(".svgBoard4");

        let squares = this.state.squares;
        let gx;
        let gy = 5;

        for (let i = 0; i < 9; i++) {
            gx = 120;   //vrat sa na zaciatok
            for (let j = 0; j < 9; j++) {
                if(squares[i][j].getName() === ""){
                    let newRect =  this.blueRect({
                        'x':gx, 'y':gy,
                        'width': 38, 'height': 38,
                        'fill': "green", 'fill-opacity': 0.4,
                        'stroke-width': 3, 'stroke': "green",
                        'pointer-events': "visible",
                    }, gx, gy, currentColor);
                    svg.appendChild(newRect);
                }
                gx = gx + 38; //posun doprava
            }
            gy = gy + 38; //posun sa nizsie
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

        let name = this.state.clicked;
        this.setState({
            clicked: ""
        });
        this.changeTextField(""); //zmenime meno txt fieldu

        let squares = this.state.squares;
        let markType = this.state.pieces[name];

        //-------------------------------------------
        if(markType.getOnBoard() === 1) {   //ak sa pokladame na plochu tak toto nechceme lebo sme mimo plochy
            let i1_Old = (markType.getY() - 5) / 38; //pohyb figurky
            let i2_Old = (markType.getX() - 120) / 38;
            squares[i1_Old][i2_Old].setName("");
            squares[i1_Old][i2_Old].setColor("");
        }

        let i1_New = (ny-5)/38; //pohyb figurky
        let i2_New = (nx-120)/38;
        squares[i1_New][i2_New].setName(markType.getName());
        squares[i1_New][i2_New].setColor(markType.getColor());

        markType.setX(nx);      //pohyb figurky
        markType.setY(ny);
        markType.setOnBoard(1); //moze sa dostat figurka na hraciu plochu ked bola vyhodena
        let p = document.getElementById(name);
        p.setAttribute("x", nx + "px");
        p.setAttribute("y", ny + "px");
        //--------------------------------------------

        let canKingMove = true;
        let allPieces = this.state.pieces;      //kotrola ci som niekoho nevyhodil
        for(let pieceN in allPieces){
            let pieceClass = allPieces[pieceN];
            if(pieceClass.getX() === nx && pieceClass.getY() === ny){
                if(pieceClass.getColor() !== markType.getColor()){
                    let enemyN = pieceClass.getName();
                    let enemyP = document.getElementById(pieceN);

                    if(enemyN === "king"){
                        canKingMove = false;

                        enemyP.setAttribute("href", "images/normal/king.png");
                        enemyP.setAttribute("x", 480 + "px");
                        enemyP.setAttribute("y", 230 + "px");

                        //zavola sa konecne okno
                        setTimeout(() => {
                            this.modalWindows("goodEnd");
                        }, 400);
                    } else {
                        pieceClass.setX(0);
                        pieceClass.setY(0);

                        this.setState({
                            markTypeParameter: "white"
                        });
                        this.state.pieces["rook_white_B4"].setX(480);
                        this.state.pieces["rook_white_B4"].setY(230);
                        enemyP.setAttribute("href", "images/normal/rook.png");
                        enemyP.setAttribute("x", 480 + "px");
                        enemyP.setAttribute("y", 230 + "px");
                        enemyP.id = "rook_white_B4";
                    }
                }
            }
        }
        if(canKingMove){
            setTimeout(() => {
                this.kingMov();
            }, 400);
        }
    }

    deleteMovement(){
        const svg = document.querySelector(".svgBoard4");
        while (svg.childNodes[27]) { //27 pretoze tam mame nakreslenych 27 veci a potom su uz len tie modre alebo zelene stvorce
            svg.removeChild(svg.childNodes[27]);
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
        let field = document.getElementById("textField_B4");
        if(name === "king"){
            field.textContent = "Kráľ";
        } else if(name === "rook") {
            field.textContent = "Veža";
        } else if(name === "pawn") {
            field.textContent = "Pešiak";
        } else {
            field.textContent = "";
        }
    }

    kingMov(){
        let kingStep = this.state.kingStep;
        let king = this.state.pieces["king_black_B4"];
        let p = document.getElementById("king_black_B4");
        let squares = this.state.squares;
        let canMove = true;

        let enemy = this.state.pieces["rook_white_B4"];

        if(kingStep === -1){
            if((enemy.getX() >= 386 && enemy.getX() < 462) && (enemy.getY() >= 119 && enemy.getY() <= 195)){
                canMove = false;
                p.setAttribute("x",  enemy.getX() + "px");
                p.setAttribute("y",  enemy.getY() + "px");

                let enemyP = document.getElementById("rook_white_B4");
                enemyP.setAttribute("href", "images/rotate/rook.png");
                enemyP.setAttribute("x", 8 + "px");
                enemyP.setAttribute("y", 84 + "px");

                setTimeout(() => {
                    this.modalWindows("badEnd");
                }, 400);
            }
        } else if(kingStep === 1){
            if((enemy.getX() >= 386 && enemy.getX() < 462) && (enemy.getY() >= 157 && enemy.getY() <= 233)){
                canMove = false;
                p.setAttribute("x",  enemy.getX() + "px");
                p.setAttribute("y",  enemy.getY() + "px");

                let enemyP = document.getElementById("rook_white_B4");
                enemyP.setAttribute("href", "images/rotate/rook.png");
                enemyP.setAttribute("x", 8 + "px");
                enemyP.setAttribute("y", 84 + "px");

                setTimeout(() => {
                    this.modalWindows("badEnd");
                }, 400);
            }
        }

        if(canMove) {
            let newY;
            if (kingStep === -1) {
                newY = king.getY() + 38;        //dole sa pohni
                squares[4][8].setName("");
                squares[4][8].setColor("");
                squares[5][8].setName(king.getName());
                squares[5][8].setColor(king.getColor());
                this.setState({
                    kingStep: 1
                });
            } else if (kingStep === 1) {
                newY = king.getY() - 38;     //hore sa pohni
                squares[5][8].setName("");
                squares[5][8].setColor("");
                squares[4][8].setName(king.getName());
                squares[4][8].setColor(king.getColor());
                this.setState({
                    kingStep: -1
                });
            }
            king.setY(newY); //pohyb cierneho krala,tu staci zmenit len y kedze chodi dole, hore
            p.setAttribute("y", newY + "px"); //aj tu staci menit len y
        }
    }

    modalWindows(type){
        if(type === "goodEnd"){
            let w = document.getElementById("goodEndW_B4");
            w.style.display = "block";
        } else if(type === "badEnd"){
            let w = document.getElementById("badEndW_B4");
            w.style.display = "block";
        }
        let w = document.getElementById("transparent_B4");
        w.style.display = "block";
    }

    resetBoard(end){
        this.setState({
            clicked: "",
            kingStep: -1,
            markTypeParameter: "black"
        });
        let squares = this.state.squares;
        let i, j;

        i = (this.state.pieces["king_black_B4"].getY() - 5) / 38;
        j = (this.state.pieces["king_black_B4"].getX() - 120) / 38;
        squares[i][j].setName("");
        squares[i][j].setColor("");

        i = (this.state.pieces["rook_white_B4"].getY() - 5) / 38;
        j = (this.state.pieces["rook_white_B4"].getX() - 120) / 38;
        squares[i][j].setName("");
        squares[i][j].setColor("");

        i = (this.state.pieces["pawn_white_B4"].getY() - 5) / 38;
        j = (this.state.pieces["pawn_white_B4"].getX() - 120) / 38;
        squares[i][j].setName("");
        squares[i][j].setColor("");

        squares[4][8].setName("king_black_B4");
        squares[4][8].setColor("black");
        squares[5][6].setName("rook_black_B4");
        squares[5][6].setColor("black");
        squares[6][6].setName("pawn_white_B4");
        squares[6][6].setColor("white");

        this.state.pieces["king_black_B4"].setX(424);
        this.state.pieces["king_black_B4"].setY(157);

        this.state.pieces["rook_black_B4"].setX(348);
        this.state.pieces["rook_black_B4"].setY(195);

        this.state.pieces["rook_white_B4"].setX(0);
        this.state.pieces["rook_white_B4"].setY(0);
        this.state.pieces["rook_white_B4"].setOnBoard(0);

        this.state.pieces["pawn_white_B4"].setX(348);
        this.state.pieces["pawn_white_B4"].setY(233);


        let p = document.getElementById("king_black_B4");
        p.setAttribute("href", "images/rotate/king.png");
        p.setAttribute("x", 424 + "px");
        p.setAttribute("y", 157 + "px");

        p = document.getElementById("rook_white_B4");
        p.setAttribute("href", "images/rotate/rook.png");
        p.setAttribute("x", 348 + "px");
        p.setAttribute("y", 195 + "px");
        p.id = "rook_black_B4";

        p = document.getElementById("pawn_white_B4");
        p.setAttribute("x", 348 + "px");
        p.setAttribute("y", 233 + "px");

        if(end === "good"){
            let w = document.getElementById("goodEndW_B4");    //ukry okno
            w.style.display = "none";
        } else if(end === "bad"){
            let w = document.getElementById("badEndW_B4");    //ukry okno
            w.style.display = "none";
        }
        let w = document.getElementById("transparent_B4");    //ukry okno
        w.style.display = "none";
    }

    render() {
        return (
            <div className="tutorialBoard">
                <svg className="svgBoard4" width="582px" height="360px" viewBox="0 0 582 360" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5px" y="5px" width="100px" height="120px" fill="bisque" stroke="black" />
                    <rect id="mainBoard_B4" onClick={() => this.boardClick()} x="120px" y="5px" width="342px" height="342px" fill="wheat" stroke="black" />
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

                    <image id="king_black_B4" onClick={() => this.mark("king", "black")} href="images/rotate/king.png" x="424" y="157" height="38px" width="38px" cursor="pointer" />
                    <image id="rook_black_B4" onClick={() => this.mark("rook", this.state.markTypeParameter)} href="images/rotate/rook.png" x="348" y="195" height="38px" width="38px" cursor="pointer" />
                    <image id="pawn_white_B4" onClick={() => this.mark("pawn", "white")} href="images/normal/pawn.png" x="348" y="233" height="38px" width="38px" cursor="pointer" />

                    <text id="textField_B4" x="12" y="240" fontWeight="bold" fontSize="25px" strokeWidth="0.5px" stroke="white"> </text>
                </svg>
                <svg id="transparent_B4" width="582px" height="360px">
                    <rect width="582px" height="360px" fill-opacity="0"/>
                </svg>
                <div id="goodEndW_B4">
                    <p>Dobrá práca, zvládol si to!</p>
                    <a type="button" className="btn btn-outline-dark" onClick={() => this.resetBoard("good")}>Resetovať</a>
                </div>
                <div id="badEndW_B4">
                    <p>Bol si vyhodený!</p>
                    <p>Nepodarilo sa ti splniť úlohu.</p>
                    <a type="button" className="btn btn-outline-dark" onClick={() => this.resetBoard("bad")}>Skús to znova</a>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Board4 />, document.getElementById('hracia_plocha4'));