const studentLst = [];

let nameIn = document.getElementById("name_input");
let mathIn = document.getElementById("math_input");
let physIn = document.getElementById("phys_input");
let chemIn = document.getElementById("chem_input");
let idIn = document.getElementById("id_input");

let creatNewBtn = document.getElementById("create_new_btn");
let delBtn = document.getElementById("delete_btn");
let changeBtn = document.getElementById("change_btn");
let avgCalBtn = document.getElementById("average_cal_btn");
let showGradeBtn = document.getElementById("show_grade_btn");
let sortBtn = document.getElementById("sort_btn");
let printGradeBtn = document.getElementById("grade_btn");
let studentTable = document.getElementById("student_table_body");
let studentTableFull = document.getElementById("student_table");
let functionRow = document.getElementById("function_row");

studentTableFull.style.display = "none";
functionRow.style.display = "none";

// TẠO MỚI
creatNewBtn.addEventListener("click",function() {
    removeInvalid();
    nameCheck(nameIn);
    scoreCheck(mathIn);
    scoreCheck(physIn);
    scoreCheck(chemIn);
    if (nameCheck(nameIn) && scoreCheck(mathIn) && scoreCheck(physIn) && scoreCheck(chemIn)) {
        studentLst.push(new Student);
        printStudent(studentLst[studentLst.length - 1]);
        studentTableFull.style.display = "block";
        functionRow.style.display = "block";
        removeInput();
        removeInvalid();
    }
});

// XÓA DÒNG
delBtn.addEventListener("click", function () {
    removeInvalid();
    idCheck(idIn);
    if (idCheck(idIn)) {
        studentLst.splice(idIn.value - 1, 1);
        tableUpdate();
        removeInput();
        removeInvalid();
    }
});

// SỬA DÒNG
changeBtn.addEventListener("click", function () {
    removeInvalid();
    idCheck(idIn);
    scoreCheck(mathIn);
    scoreCheck(physIn);
    scoreCheck(chemIn);
    if (idCheck(idIn) && scoreCheck(mathIn) && scoreCheck(physIn) && scoreCheck(chemIn)) {
        studentLst[idIn.value - 1].math = parseFloat(mathIn.value);
        studentLst[idIn.value - 1].phys = parseFloat(physIn.value);
        studentLst[idIn.value - 1].chem = parseFloat(chemIn.value);
        tableUpdate();
        removeInput();
        removeInvalid();
    }
});

// TÍNH ĐIỂM
avgCalBtn.addEventListener("click",printAvg);

// HIỂN THỊ
showGradeBtn.addEventListener("click",showGrade);

// SẮP XẾP
sortBtn.addEventListener("click",function() {
    sortByNum(studentTable, 6);
});

/**
* @description creat new student object with parameters taken from HTML forms
*/
function Student() {
    this.name = document.getElementById("name_input").value;
    this.math = parseFloat(document.getElementById("math_input").value);
    this.phys = parseFloat(document.getElementById("phys_input").value);
    this.chem = parseFloat(document.getElementById("chem_input").value);
    this.avg = function() {
        return ((this.math + this.phys + this.chem) / 3);
    };
}

/**
* @description clear HTML forms values
*/
function removeInput() {
    document.getElementById("name_input").value = null;
    document.getElementById("math_input").value = null;
    document.getElementById("phys_input").value = null;
    document.getElementById("chem_input").value = null;
    document.getElementById("id_input").value = null;
}

/**
* @description clear HTML forms values
*/
function removeInvalid() {
    document.getElementById("name_input").classList.remove("invalid_input");
    document.getElementById("math_input").classList.remove("invalid_input");
    document.getElementById("phys_input").classList.remove("invalid_input");
    document.getElementById("chem_input").classList.remove("invalid_input");
    document.getElementById("id_input").classList.remove("invalid_input");
}

/**
* @description create table row with student infomation
* @param {object} obj - student object
*/
function printStudent(obj) {
    var row = studentTable.insertRow(-1);
    var num = row.insertCell(0);
    var name = row.insertCell(1);
    var math = row.insertCell(2);
    var phys = row.insertCell(3);
    var chem = row.insertCell(4);
    var avg = row.insertCell(5);
    num.innerHTML = studentLst.indexOf(obj) + 1;
    name.innerHTML = obj.name;
    math.innerHTML = (obj.math).toFixed(1);
    phys.innerHTML = (obj.phys).toFixed(1);
    chem.innerHTML = (obj.chem).toFixed(1);
    avg.innerHTML = "?";
}

/**
* @description print all student average scores in studentTable (replace the current value in cell)
*/
function printAvg() {
    for (let i = 0, row; row = studentTable.rows[i]; i++) {
        row.cells[5].innerHTML = (studentLst[parseInt(row.cells[0].innerHTML - 1)].avg()).toFixed(1);
    }
}

/**
* @description change color of rows which have student average score >= 8
*/
function showGrade() {
    for (let i = 0, row; row = studentTable.rows[i]; i++) {
        if (parseFloat(row.cells[5].innerHTML) >= 8) {
            studentTable.rows[i].classList.add("bg-danger");
        }
    }
}

/**
* @description short table column by float value (descending)
* @param {object} table - DOM object table
* @param {number} col - the column to sort
*/
function sortByNum(table, col) {
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[col - 1];
            y = rows[i + 1].getElementsByTagName("TD")[col - 1];
            if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

/**
* @description Check if an input value is integer
* @param {string} input - input value in string
* @return {boolean} true if input is integer, false if input is not integer
*/
function intCheck(input) {
    return (!isNaN(input) && Number.isInteger(parseFloat(input))) ? true : false;
}

/**
* @description Check if an input value is not empty
* @param {string} input - input value in string
* @return {boolean} true if input is integer, false if input is not integer
*/
function requiredCheck(value) {
    return (value !== null && value !== '' && value !== undefined) ? true : false;
}

/**
* @description Check if validity for name input
* @param {string} input - input value in string
* @return {boolean}
*/
function nameCheck(object) {
    let value = object.value;
    if (requiredCheck(value)) {
        object.classList.remove("invalid_input");
        return true;
    } else {
        object.classList.add("invalid_input");
        return false;
    }
}

/**
* @description Check if validity for score input
* @param {string} input - input value in string
* @return {boolean}
*/
function scoreCheck(object) {
    let value = object.value;
    if (requiredCheck(value) && !isNaN(value) && value >= 0 && value <= 10) {
        object.classList.remove("invalid_input");
        return true;
    } else {
        object.classList.add("invalid_input");
        return false;
    }
}

/**
* @description Check if validity for score input
* @param {string} input - input value in string
* @return {boolean}
*/
function idCheck(object) {
    let value = object.value;
    if (requiredCheck(value) && intCheck(value) && value <= studentLst.length && value > 0) {
        object.classList.remove("invalid_input");
        return true;
    } else {
        object.classList.add("invalid_input");
        return false;
    }
}

/**
* @description Update the table
*/
function tableUpdate() {
    studentTable.innerHTML = null;
    studentLst.forEach(element => {
        printStudent(element)
    });
}