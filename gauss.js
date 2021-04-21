document.querySelector("select").addEventListener('change', () => {
    var opt = document.querySelector("select").options.selectedIndex + 2;
    n = opt;
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    table.className = "table table-borderless";

    for (var i = 0; i < opt; i++) {
        var row = document.createElement('tr');
        for (var j = 0; j <= opt; j++) {
            var cell = document.createElement('td');

            var data = document.createElement('input');
            data.className = "border rounded";
            data.style = "width: 100%;";
            data.type = "text";
            data.value = Math.floor(Math.random() * 100);

            cell.appendChild(data);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);

    var update = document.getElementById('update');
    var existingTable = update.querySelector('table');
    if (existingTable != null)
        existingTable.replaceWith(table);
    else
        update.appendChild(table);
})

const eps = Number.EPSILON;
var i, j, k, divide, s;
var n = document.querySelector("select").value;
var X = [];
var AB = [[]];

function parse() {
    AB = [[]];
    var val = document.querySelectorAll('td input');
    for(i = 0; i < n; i++){
        AB.push( [] );
    }
    var index = 0;
    for(i = 0; i < n; i++){
        for (j = 0; j <= n; j++)
        {
            AB[i].push(parseInt(val[index++].value));
        }
    }
}

function gauss() {
    parse();

    for (i = 0; i < n - 1; i++) {
        for (j = i + 1; j < n; j++) {
            if (Math.abs(AB[i][i]) < eps) return false;
            divide = -AB[j][i] / AB[i][i];
            for (k = i + 1; k <= n; k++) {
                AB[j][k] += divide * AB[i][k];
            }
        }
    }

    for (i = n - 1; i >= 0; i--) {
        s = AB[i][n];
        for (j = n - 1; j >= i + 1; j--)
            s -= AB[i][j] * X[j];
        if (Math.abs(AB[i][i]) < eps) return false;
        X[i] = s / AB[i][i];
    }

    display();

    return true;
}

function display() {
    var result = '';
    for (i = 0; i < n; i++) {
        result += "x" + i + " = " + X[i] + '\n';
    }
    document.getElementById('result').textContent = result;
}
