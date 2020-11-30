
class Board2 extends React.Component {
    state = {
        pieces: {rook_black_B2: new ShogiPiece("rook", 1, "black", 120, 309),
            bishop_black_B2: new ShogiPiece("bishop", 1, "black", 120, 195),
            pawn_black_B2: new ShogiPiece("pawn", 1, "black", 158, 233),
            pawn2_black_B2: new ShogiPiece("pawn2", 1, "black", 196, 195),
            pawn3_black_B2: new ShogiPiece("pawn3", 1, "black", 234, 233),
            lance_black_B2: new ShogiPiece("lance", 1, "black", 272, 195),
            king_white_B2: new ShogiPiece("king", 1, "white", 196, 271)
        },
        squares: [
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("bishop_black_B2","black"), new SQ("",""), new SQ("pawn2_black_B2","black"), new SQ("",""), new SQ("lance_black_B2","black"), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("pawn_black_B2","black"), new SQ("",""), new SQ("pawn3_black_B2","black"), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("",""), new SQ("",""), new SQ("king_white_B2","white"), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")],
            [new SQ("rook_black_B2","black"), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("",""), new SQ("","")]
        ],
        clicked: "",
        PPath: ["F"],
        KPath: ["AllDD", "AllSD"],
        LPath: ["MF"],
        RPath: ["MSD"],
        BPath: ["MDD"]
    };

    mark(type, color){
        let name = type + "_" + color + "_B2";
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
                    rectColor = "blue";
                    break;
                case "lance":
                    movement = this.state.LPath;
                    rectColor = "royalblue";
                    break;
                case "bishop":
                    movement = this.state.BPath;
                    rectColor = "royalblue";
                    break;
                case "rook":
                    movement = this.state.RPath;
                    rectColor = "royalblue";
                    break;
                case "pawn":
                    movement = this.state.PPath;
                    rectColor = "royalblue";
                    break;
                case "pawn2":
                    movement = this.state.PPath;
                    rectColor = "royalblue";
                    break;
                case "pawn3":
                    movement = this.state.PPath;
                    rectColor = "royalblue";
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
        const svg = document.querySelector(".svgBoard2");

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
            } else if (movement[i] === "F"){    // 1 forward pre black hraca
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
            } else if (movement[i] === "MF"){    //many forward pre black hraca
                let n = (347-38-cy)/38;      //kolko ma pred sebou policok
                let k, bx, by, i1, i2;
                for (let i = 1; i <= n; i++) {
                    k = 38*i;
                    bx = cx;
                    by = cy+k;
                    i1 = (by-5)/38;
                    i2 = (bx-120)/38;
                    if(this.state.squares[i1][i2].getColor() !== currentColor) {
                        let newRect = this.blueRect({
                            'x': bx, 'y': by,
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
            } else if (movement[i] === "MDD"){    //many diagonal directions
                let n1 = this.diagSquaresNumber("topLeft", cx, cy);   //kolko ma na lavo hore policok
                let n2 = this.diagSquaresNumber("topRight", cx, cy);  //kolko ma na pravo hore policok
                let n3 = this.diagSquaresNumber("botRight", cx, cy);  //kolko ma na pravo dole policok
                let n4 = this.diagSquaresNumber("botLeft", cx, cy);   //kolko ma na lavo dole policok
                let k, bx, by, i1, i2;
                for (let i = 1; i <= n1; i++) {
                    k = 38*i;
                    bx = cx-k;
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
                for (let i = 1; i <= n3; i++) {
                    k = 38*i;
                    bx = cx+k;
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

        let name = this.state.clicked;
        this.setState({
            clicked: ""
        });
        this.changeTextField(""); //zmenime meno txt fieldu

        if((nx===158 && ny===309) || (nx===196 && ny===309) || (nx===234 && ny===309)){
            this.scriptMov(name, nx, ny, "rook");
        } else if(nx===158 && ny===271){
            this.scriptMov(name, nx, ny, "pawn");
        } else if(nx===158 && ny===233){
            this.scriptMov(name, nx, ny, "bishop");
        } else if(nx===196 && ny===233){
            this.scriptMov(name, nx, ny, "pawn2");
        } else if(nx===234 && ny===233){
            this.scriptMov(name, nx, ny, "");
        } else if(nx===234 && ny===271){
            this.scriptMov(name, nx, ny, "pawn3");
        }
    }

    scriptMov(name, nx, ny, enemy){   //tu nam netreba nic robit so squares pretoze aj tak hned to skonci, a ani nic s pieces
        let p = document.getElementById(name);
        p.setAttribute("x", nx + "px");
        p.setAttribute("y", ny + "px");

        let conclusion;
        if(enemy === "rook"){
            setTimeout(() => {
                let e = document.getElementById("rook_black_B2");
                e.setAttribute("x", nx + "px");
                e.setAttribute("y", ny + "px");

                p.setAttribute("href", "images/rotate/king.png");
                p.setAttribute("x", 8 + "px");
                p.setAttribute("y", 84 + "px");
            }, 500);

            conclusion = "badEnd";
        } else if(enemy === "pawn"){
            setTimeout(() => {
                let e = document.getElementById("pawn_black_B2");
                e.setAttribute("x", nx + "px");
                e.setAttribute("y", ny + "px");

                p.setAttribute("href", "images/rotate/king.png");
                p.setAttribute("x", 8 + "px");
                p.setAttribute("y", 84 + "px");
            }, 500);

            conclusion = "badEnd";
        } else if(enemy === "bishop"){
            let e = document.getElementById("pawn_black_B2");
            e.setAttribute("href", "images/normal/pawn.png");
            e.setAttribute("x", 480 + "px");
            e.setAttribute("y", 230 + "px");

            setTimeout(() => {
                e = document.getElementById("bishop_black_B2");
                e.setAttribute("x", nx + "px");
                e.setAttribute("y", ny + "px");

                p.setAttribute("href", "images/rotate/king.png");
                p.setAttribute("x", 8 + "px");
                p.setAttribute("y", 84 + "px");
            }, 500);

            conclusion = "badEnd";
        } else if(enemy === "pawn2"){
            setTimeout(() => {
                let e = document.getElementById("pawn2_black_B2");
                e.setAttribute("x", nx + "px");
                e.setAttribute("y", ny + "px");

                p.setAttribute("href", "images/rotate/king.png");
                p.setAttribute("x", 8 + "px");
                p.setAttribute("y", 84 + "px");
            }, 500);

            conclusion = "badEnd";
        } else if(enemy === ""){
            let e = document.getElementById("pawn3_black_B2");
            e.setAttribute("href", "images/normal/pawn.png");
            e.setAttribute("x", 480 + "px");
            e.setAttribute("y", 230 + "px");

            conclusion = "goodEnd";
        } else if(enemy === "pawn3"){
            setTimeout(() => {
                let e = document.getElementById("pawn3_black_B2");
                e.setAttribute("x", nx + "px");
                e.setAttribute("y", ny + "px");

                p.setAttribute("href", "images/rotate/king.png");
                p.setAttribute("x", 8 + "px");
                p.setAttribute("y", 84 + "px");
            }, 500);

            conclusion = "badEnd";
        }
        //vyhod okno
        setTimeout(() => {
            this.modalWindows(conclusion);
        }, 900);
    }

    deleteMovement(){
        const svg = document.querySelector(".svgBoard2");
        while (svg.childNodes[31]) { //31 pretoze tam mame nakreslenych 31 veci a potom su uz len tie modre stvorce
            svg.removeChild(svg.childNodes[31]);
        }
    }
    boardClick(){
        this.setState({
            clicked: ""
        });
        this.deleteMovement();
        this.changeTextField(""); //zmen meno v txt poli
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

    changeTextField(name){
        let field = document.getElementById("textField_B2");
        if(name === "king"){
            field.textContent = "Kráľ";
        } else if(name === "rook") {
            field.textContent = "Veža";
        } else if(name === "bishop") {
            field.textContent = "Strelec";
        } else if((name === "pawn") || (name === "pawn2") || (name === "pawn3")) {
            field.textContent = "Pešiak";
        } else if(name === "lance") {
            field.textContent = "Oštep";
        } else {
            field.textContent = "";
        }
    }

    modalWindows(type){
        if(type === "goodEnd"){
            let w = document.getElementById("goodEndW");
            w.style.display = "block";
        } else if(type === "badEnd"){
            let w = document.getElementById("badEndW");
            w.style.display = "block";
        }
    }

    resetBoard(end){
        this.setState({
            clicked: ""
        });

        let p = document.getElementById("rook_black_B2");
        p.setAttribute("x", 120 + "px");
        p.setAttribute("y", 309 + "px");

        p = document.getElementById("bishop_black_B2");
        p.setAttribute("x", 120 + "px");
        p.setAttribute("y", 195 + "px");

        p = document.getElementById("pawn_black_B2");
        p.setAttribute("href", "images/rotate/pawn.png");
        p.setAttribute("x", 158 + "px");
        p.setAttribute("y", 233 + "px");

        p = document.getElementById("pawn2_black_B2");
        p.setAttribute("x", 196 + "px");
        p.setAttribute("y", 195 + "px");

        p = document.getElementById("pawn3_black_B2");
        p.setAttribute("href", "images/rotate/pawn3.png");
        p.setAttribute("x", 234 + "px");
        p.setAttribute("y", 233 + "px");

        p = document.getElementById("king_white_B2");
        p.setAttribute("href", "images/normal/king.png");
        p.setAttribute("x", 196 + "px");
        p.setAttribute("y", 271 + "px");

        if(end === "good"){
            let w = document.getElementById("goodEndW");    //ukry okno
            w.style.display = "none";
        } else if(end === "bad"){
            let w = document.getElementById("badEndW");    //ukry okno
            w.style.display = "none";
        }
    }

    render() {
        return (
            <div className="tutorialBoard">
                <svg className="svgBoard2" width="582px" height="360px" viewBox="0 0 582 360" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5px" y="5px" width="100px" height="120px" fill="bisque" stroke="black" />
                    <rect id="mainBoard_B2" onClick={() => this.boardClick()} x="120px" y="5px" width="342px" height="342px" fill="wheat" stroke="black" />
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

                    <image id="rook_black_B2" onClick={() => this.mark("rook", "black")} href="images/rotate/rook.png" x="120" y="309" height="38px" width="38px" cursor="pointer" />
                    <image id="bishop_black_B2" onClick={() => this.mark("bishop", "black")} href="images/rotate/bishop.png" x="120" y="195" height="38px" width="38px" cursor="pointer" />
                    <image id="pawn_black_B2" onClick={() => this.mark("pawn", "black")} href="images/rotate/pawn.png" x="158" y="233" height="38px" width="38px" cursor="pointer" />
                    <image id="pawn2_black_B2" onClick={() => this.mark("pawn2", "black")} href="images/rotate/pawn2.png" x="196" y="195" height="38px" width="38px" cursor="pointer" />
                    <image id="pawn3_black_B2" onClick={() => this.mark("pawn3", "black")} href="images/rotate/pawn3.png" x="234" y="233" height="38px" width="38px" cursor="pointer" />
                    <image id="lance_black_B2" onClick={() => this.mark("lance", "black")} href="images/rotate/lance.png" x="272" y="195" height="38px" width="38px" cursor="pointer" />
                    <image id="king_white_B2" onClick={() => this.mark("king", "white")} href="images/normal/king.png" x="196" y="271" height="38px" width="38px" cursor="pointer" />

                    <text id="textField_B2" x="12" y="240" fontWeight="bold" fontSize="25px"> </text>
                </svg>
                <div id="goodEndW">
                    <p>Dobrá práca, zvládli ste to!</p>
                    <button onClick={() => this.resetBoard("good")}>Resetovať</button>
                </div>
                <div id="badEndW">
                    <p>Zlý ťah, boli ste vyhodený!</p>
                    <p>Nepodarilo sa Vám splniť úlohu.</p>
                    <button onClick={() => this.resetBoard("bad")}>Skúste znova</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Board2 />, document.getElementById('hracia_plocha2'));