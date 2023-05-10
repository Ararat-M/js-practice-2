const formStudend = document.querySelector(".form-student");

const inputName = document.querySelector("#input-name");
const inputSurname = document.querySelector("#input-surname");
const inputMiddlename = document.querySelector("#input-middlename");
const inputBirthday = document.querySelector("#input-birthday");
const inputStartLearning = document.querySelector("#input-start-learning");
const inputFaculty = document.querySelector("#input-faculty");


const studentsArr = [];

function addStudent(name, surname, middlename, birthday, startLearning, faculty) {
    const student = {
        name,
        surname,
        middlename,
        birthday,
        startLearning,
        faculty
    };
    
    return studentsArr.push(student)
}

formStudend.addEventListener("submit", () => {
    if (inputsIsEmpty([inputName, inputSurname, inputMiddlename, inputBirthday, inputStartLearning, inputFaculty])) return

    // if (validateBirthday(inputBirthday)) return

    if (validateStartLearning(inputStartLearning)) return

    const studentName = inputName.value;
    const studentSurname = inputSurname.value;
    const studentMiddlename = inputMiddlename.value;
    const studentBirthday = inputBirthday.value;
    const studentStartLearning = inputStartLearning.value;
    const studentFaculty = inputFaculty.value;

    addStudent(studentName, studentSurname, studentMiddlename, studentBirthday, studentStartLearning, studentFaculty);
})

function inputsIsEmpty(inputs) {
    let result = false;

    inputs.forEach(element => {
        if (element.value.trim() == 0 ) {
            element.classList.add("input_error");
            result = true;
        } else {
            element.classList.remove("input_error");
        }
    });

    return result
}

function validateStartLearning(input) {
    const date = input.value;
    const [year, month, day] = date.split("-");

    if ( year > 2000 && year < new Date().getFullYear() ) {
        input.classList.remove("input_error");
        return true
    }

    input.classList.add("input_error");
    return false
}