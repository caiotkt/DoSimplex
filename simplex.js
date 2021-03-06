function Tableau(m,n){
    this.m = Number(m) || 0;
    this.n = Number(n) || 0;
    this.tableau = Array.apply(null, Array(m)).map(Number.prototype.valueOf, 
        Array.apply(null, Array(n)).map(Number.prototype.valueOf,0));
}

function pivot_on(tab, row, col) {
    var i, j, pivot, a;
    pivot = tab.tableau[row][col];
    console.log("Encontrou pivot: " + pivot, " linha: ", row, " coluna: ", col);
    tab.labelColumn[row-1] = tab.labelRow[col-1];

    for (j = 0; j < tab.n; j++)
        tab.tableau[row][j] /= pivot;
    for (i = 0; i < tab.m; i++) {
        let multiplier = tab.tableau[i][col];
        if (i == row) continue;
        for (j = 0; j < tab.n; j++) {
            tab.tableau[i][j] -= multiplier * tab.tableau[row][j];
        }
    }
}
function find_pivot_column(tab) {
    var j, pivot_col = 1;
    var lowest = tab.tableau[0][pivot_col];
    for (j = 1; j < tab.n; j++) {
        if (tab.tableau[0][j] < lowest) {
            lowest = tab.tableau[0][j];
            pivot_col = j;
        }
    } if (lowest >= 0) {
        return -1;
    } return pivot_col;
}
function find_pivot_row(tab, pivot_col) {
    var i, pivot_row = 0;
    var min_ratio = -1;
    for (i = 1; i < tab.m; i++) {
        var ratio = tab.tableau[i][0] / tab.tableau[i][pivot_col];
        if ((ratio > 0 && ratio < min_ratio) || min_ratio < 0) {
            min_ratio = ratio;
            pivot_row = i;
        }
    } 
    return min_ratio == -1 ?  -1 : pivot_row;
}
function add_variaveis_nao_basicas(tab) {
    var i, j;
    tab.labelColumn = []; // Cria a coluna para a label das linhas da tabela, com exceção da linha Z
    for (i = 0; i < tab.m; i++) {
        tab.labelColumn.push("f" + (i + 1));
        for (j = 1; j < tab.m; j++) {
            tab.tableau[i][j + tab.n - 1] = (i == j) ? 1 : 0;
        }
    }
    tab.labelColumn.pop(); // Remove a linha adicionada a mais (não conta a linha Z)
    tab.labelRow = []; // cria a linha cabeçalho da matriz, sendo a primeira coluna b
    for (i = 1; i < tab.n; i++) { // começa a iterar as variáveis básicas
        tab.labelRow.push("x"+i);
    }
    tab.labelRow = tab.labelRow.concat(tab.labelColumn); // concatena as variáveis básicas com as variáveis não básicas
    tab.n += tab.m - 1;
}
function simplex(tab) {
    let loop = 0;
    add_variaveis_nao_basicas(tab);
    while (++loop) {
        var pivot_col, pivot_row;
        pivot_col = find_pivot_column(tab);
        if (pivot_col < 0) {
            break;
        }
        pivot_row = find_pivot_row(tab, pivot_col);
        if (pivot_row < 0) {
            break;
        }
        pivot_on(tab, pivot_row, pivot_col);
        if (loop > 20) break; // Essa linha limita a quantidade de iterações, ou seja, pode ser passada por parâmetro
    }
}

function createCopy(tableau) {
    let m = []
    for (let i = 0; i < tableau.length; i++) {
        let l = [];
        for (let j = 0; j < tableau[i].length; j++) {
            l.push(tableau[i][j]);
        }
        m.push(l);
    }
    return m;
}