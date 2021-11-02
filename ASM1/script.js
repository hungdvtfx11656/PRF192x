const currentYear = new Date().getFullYear();
const userInfo = [];

let userCard = document.getElementById('user_card');
let tryItBtn = document.getElementById('try_it_btn');
let nextStepBtn = document.getElementById('next_step_btn');
let endForm = document.getElementById('end_form');

userCard.style.display = 'none'
tryItBtn.style.display = 'block';
nextStepBtn.style.display = 'none';
endForm.style.display = 'none';

/**
* @description try_it button
*/
function try_it() {
    tryItBtn.style.display = 'none';
    alert('Chào mừng đến với ứng dụng Javascript đầu tiên');
    requiredInput(userInfo,'Tên','user_name');
    requiredInput(userInfo,'Thành phố','user_city');
    requiredInput(userInfo,'Số di dộng','user_mobile');
    birthYearInput(userInfo);
    printIfDefined(userInfo,'user_card', 'user_name');
    printIfDefined(userInfo,'user_card', 'user_city');
    printIfDefined(userInfo,'user_card', 'user_mobile');
    printAge(userInfo, 'user_card');
    nextStepBtn.style.display = 'block';
    userCard.style.display = 'block';
}

/**
* @description next_step button
*/
function next_step() {
    alert('Nhập thêm các dữ liệu tùy chọn');
    optionalInput(userInfo,'Email','user_email');
    optionalInput(userInfo,'Nghề nghiệp','user_job');
    optionalInput(userInfo,'Sở thích','user_hobbit');
    printIfDefined(userInfo,'user_card', 'user_email');
    printIfDefined(userInfo,'user_card', 'user_job');
    printIfDefined(userInfo,'user_card', 'user_hobbit');
    nextStepBtn.style.display = 'none';
    endForm.style.display = 'block';
}

/**
* @description Add user infomation to array (not required infomation)
* @param {array} arr - array contain user's infomation
* @param {string} str - string in short to describe the infomation
* @param {string} id - The id attribute to query in arr and HTML in further steps
*/
function requiredInput(arr, str, id) {
    let input = prompt('Nhập vào ' + str + ': ');
    while (!nullCheck(input)) {
        input = prompt('Hãy nhập lại ' + str + ': ');
    }
    arr.push({description: str, info: input, elementId: id});
}

/**
* @description Add user infomation to array (not required infomation)
* @param {array} arr - array contain user's infomation
* @param {string} str - string in short to describe the infomation
* @param {string} id - The id attribute to query in arr and HTML in further steps
*/
function optionalInput(arr, str, id) {
    let input = prompt('Nhập vào ' + str + ': ');
    arr.push({description: str, info: input, elementId: id});
}

/**
* @description Add user birth year to selected array
* @param {array} arr - array contain user's infomation
*/
function birthYearInput(arr) {
    let input = prompt('Nhập vào Năm sinh: ');
    if (!intCheck(input) || input > currentYear) {
        do {
            input = prompt('Hãy nhập lại Năm sinh: ');
        } while (!intCheck(input) || input > currentYear);
    }
    arr.push({description: 'Năm sinh', info: input, elementId: 'user_birth_year'});
}

/**
* @description Add tag <p> to HTML element if infomation is defined
* @param {array} arr - array contain user's infomation
* @param {string} cardId - id attribute of HTML element to add
* @param {string} id - id attribute to query in arr
*/
function printIfDefined(arr, cardId, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].elementId == id && nullCheck(arr[i].info)) {
            document.getElementById(cardId).innerHTML += '<p id="' + id + '">' + arr[i].description + ' của bạn: ' + arr[i].info + '</p>';
        }
    }
}

/**
* @description Add tag <p> to HTML element which describes user age
* @param {array} arr - array contain user's infomation
* @param {string} cardId - id attribute of HTML element to add
*/
function printAge(arr, cardId) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].elementId == 'user_birth_year') {
            document.getElementById(cardId).innerHTML += '<p id="' + 'user_age' + '">' + 'Tuổi của bạn: ' + (currentYear - arr[i].info) + '</p>';
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
* @description Check if an input value is defined
* @param {string} input - input value in string
* @return {boolean} true if input is defined, false if input is not defined
*/
function nullCheck(input) {
    return (input !== null && input !== '' && input !== undefined) ? true : false;
}
