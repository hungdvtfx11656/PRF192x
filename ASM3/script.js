const studentLst = [];

$(document).ready(function () {
    $('#below').hide();
});

// TẠO MỚI
$(document).ready(function () {
    $('#create_new_btn').click(function (e) {
        e.preventDefault();
        removeInvalid();
        let firstNameIn = nameCheck($('#first_name_input'));
        let lastNameIn = nameCheck($('#last_name_input'));
        let mathIn = scoreCheck($('#math_input'));
        let physIn = scoreCheck($('#phys_input'));
        let chemIn = scoreCheck($('#chem_input'));
        if (firstNameIn && lastNameIn && mathIn && physIn && chemIn) {
            // validating process
            const newStudent = new Student();
            studentLst.push(newStudent);
            // writeTableRow(studentLst.length - 1);
            updateTable();
            emptyInput();
            removeInvalid();
            $('#below').show();
        }
    });
});

// SỬA
$(document).ready(function () {
    $('#change_btn').click(function (e) {
        e.preventDefault();
        removeInvalid();
        let idIn = idCheck($('#id_input'));
        let mathIn = scoreCheck($('#math_input'));
        let physIn = scoreCheck($('#phys_input'));
        let chemIn = scoreCheck($('#chem_input'));
        if (idIn && mathIn && physIn && chemIn) {
            let index = parseInt($('#id_input').val()) - 1;
            const student = new Student;
            studentLst[index].math = student.math;
            studentLst[index].phys = student.phys;
            studentLst[index].chem = student.chem;
            updateTable();
            emptyInput();
            removeInvalid();
        }
    });
});

// XÓA
$(document).ready(function () {
    $('#delete_btn').click(function (e) {
        e.preventDefault();
        removeInvalid();
        let idIn = idCheck($('#id_input'));
        if (idIn) {
            studentLst.splice(parseInt($('#id_input').val()) - 1, 1);
            updateTable();
            emptyInput();
            removeInvalid();
        }
        if (!studentLst.length) {
            $('#below').hide();
        }
    });
});

// ĐIỂM TRUNG BÌNH
$(document).ready(function () {
    $('#average_cal_btn').click(function (e) {
        e.preventDefault();
        $('#student_table tbody tr').each(function (index, element) {
            let studentId = parseInt($($(this).children()[0]).text()) - 1;
            $($(this).children()[5]).text(
                studentLst[studentId].avg().toFixed(1)
            );
            // $(studentLst[parseInt($($($(this).children()[0]).text())) - 1)].avg().toFixed(1)
            // $($(this).children()[5]).text(
            //     ((parseFloat($($(this).children()[4]).text()) +
            //     parseFloat($($(this).children()[3]).text()) +
            //     parseFloat($($(this).children()[2]).text())) / 3).toFixed(1)
            // );
        });
    });
});

// HỌC SINH GIỎI
$(document).ready(function () {
    $('#show_grade_btn').click(function (e) {
        e.preventDefault();
        // $('#student_table tbody tr').each(function (index, element) {
        //     if (parseFloat($($(this).children()[5]).text()) >= 8) {
        //         $(this).addClass('bg-danger');
        //     }
        // });
        // $('#student_table tbody tr td:last-child').each(function (index, element) {
        //     if (parseFloat($(this).text()) >= 8) {
        //         $(this).parent().addClass('bg-danger');
        //     }
        // });
        $('#student_table tbody tr td:first-child').each(function (index, element) {
            if (studentLst[parseInt($(this).text()) - 1].avg() >= 8) {
                $(this).parent().toggleClass('bg-danger');
                $(this).parent().toggleClass('text-white');
            }
        });
    });
});

// XẾP HẠNG
$(document).ready(function () {
    $('#sort_btn').click(function (e) {
        e.preventDefault();
        $('#student_table tbody').find('tr').sort(function(a,b){
            var tda = parseFloat($(a).find('td:eq(5)').text());
            var tdb = parseFloat($(b).find('td:eq(5)').text());
            return tda < tdb ? 1 : tda > tdb ? -1 : 0;
        }).appendTo($('#student_table tbody'));
    })
});

// IN
$(document).ready(function () {
    $('#print_btn').click(function (e) {
        e.preventDefault();
        print();
    });
});

/**
* @description Create new student object
*/
function Student() {
    this.firstName = $('#first_name_input').val();
    this.lastName = $('#last_name_input').val();
    this.math = parseFloat($('#math_input').val());
    this.phys = parseFloat($('#phys_input').val());
    this.chem = parseFloat($('#chem_input').val());
    this.avg = function() {
        return ((this.math + this.phys + this.chem) / 3);
    }
    this.fullName = function() {
        return (this.firstName + ' ' + this.lastName);
    }
}

/**
* @description Empty input after submittion
*/
function emptyInput() {
    $('#first_name_input').val(null);
    $('#last_name_input').val(null);
    $('#math_input').val(null);
    $('#phys_input').val(null);
    $('#chem_input').val(null);
    $('#id_input').val(null);
}

/**
* @description Create html row by index of studentLst array
* @param {number} id - index of studentLst array
*/
function htmlTableRow(id) {
    let cell0 = '<td>' + (id + 1) + '</td>';
    let cell1 = '<td>' + studentLst[id].fullName() + '</td>';
    let cell2 = '<td>' + (studentLst[id].math).toFixed(1) + '</td>';
    let cell3 = '<td>' + (studentLst[id].phys).toFixed(1) + '</td>';
    let cell4 = '<td>' + (studentLst[id].chem).toFixed(1) + '</td>';
    let cell5 = '<td>?</td>';
    return ('<tr>' + cell0 + cell1 + cell2 + cell3 + cell4 + cell5 + '</tr>');
}

/**
* @description Add html row to #student_table tbody
*/
function writeTableRow(id) {
    $('#student_table tbody').append(htmlTableRow(id));
}

/**
* @description Write full table
* @param {studentArr} arr - array of student to print
*/
function updateTable() {
    clearRows();
    $.each(studentLst, function (indexInArray, valueOfElement) {
        writeTableRow(indexInArray);
    });
}

/**
* @description Delete table
*/
function clearRows() {
    $('#student_table tbody tr').each(function (index, tr) {
        $(this).remove();
    });
}

// VADILATIONS GO HERE
// VADILATIONS GO HERE
// VADILATIONS GO HERE
// VADILATIONS GO HERE
// VADILATIONS GO HERE
// VADILATIONS GO HERE

/**
* @description Check if validity for score input
* @param {string} input - input value in string
* @return {boolean}
*/
function idCheck(object) {
    let value = object.val();
    if (requiredCheck(value) && intCheck(value) && value <= studentLst.length && value > 0) {
        object.removeClass('invalid_input');
        object.addClass('valid_input');
        object.parent().next().text('Đã nhập đúng');
        object.parent().next().removeClass('invalid_feedback');
        object.parent().next().addClass('valid_feedback');
        return true;
    } else {
        object.removeClass('valid_input');
        object.addClass('invalid_input');
        object.parent().next().text('Nhập đúng số thứ tự');
        object.parent().next().removeClass('valid_feedback');
        object.parent().next().addClass('invalid_feedback');
        return false;
    }
}

/**
* @description Check if validity for score input
* @param {string} input - input value in string
* @return {boolean}
*/
function scoreCheck(object) {
    let value = object.val();
    if (requiredCheck(value) && !isNaN(value) && value >= 0 && value <= 10) {
        object.removeClass('invalid_input');
        object.addClass('valid_input');
        object.next().text('Đã nhập đúng');
        object.next().removeClass('invalid_feedback');
        object.next().addClass('valid_feedback');
        return true;
    } else {
        object.removeClass('valid_input');
        object.addClass('invalid_input');
        object.next().text('Điểm từ 0 đến 10');
        object.next().removeClass('valid_feedback');
        object.next().addClass('invalid_feedback');
        return false;
    }
}

/**
* @description Check if validity for name input
* @param {string} input - input value in string
* @return {boolean}
*/
function nameCheck(object) {
    let value = object.val();
    if (requiredCheck(value)) {
        object.removeClass('invalid_input');
        object.addClass('valid_input');
        object.parent().next().text('Họ và tên đã nhập đủ');
        object.parent().next().removeClass('invalid_feedback');
        object.parent().next().addClass('valid_feedback');
        return true;
    } else {
        object.removeClass('valid_input');
        object.addClass('invalid_input');
        object.parent().next().text('Họ và tên không được bỏ trống');
        object.parent().next().removeClass('valid_feedback');
        object.parent().next().addClass('invalid_feedback');
        return false;
    }
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
* @description Check if an input value is integer
* @param {string} input - input value in string
* @return {boolean} true if input is integer, false if input is not integer
*/
function intCheck(input) {
    return (!isNaN(input) && Number.isInteger(parseFloat(input))) ? true : false;
}

/**
* @description Remove invalid input
*/
function removeInvalid() {
    $('form .form-control').each(function (index, element) {
        $(this).removeClass('invalid_input');
        $(this).removeClass('valid_input');
    });
    $('form .feedback').each(function (index, element) {
        $(this).removeClass('invalid_feedback');
        $(this).removeClass('valid_feedback');
        $(this).text('');
    });
}