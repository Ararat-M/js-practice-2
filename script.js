const formStudend = document.querySelector(".form-student");

const inputName = document.querySelector("#input-name");
const inputSurname = document.querySelector("#input-surname");
const inputMiddlename = document.querySelector("#input-middlename");
const inputBirthday = document.querySelector("#input-birthday");
const inputStartLearning = document.querySelector("#input-start-learning");
const inputFaculty = document.querySelector("#input-faculty");


const studentsArr = [ 
    {
    name: "Alex",
    surname: "Ivanov",
    middlename: "Ivanovich",
    birthday: "2001-10-21",
    startLearning: "2013",
    faculty: "1042-DVA"
    }, 
    {
        name: "Petr",
        surname: "Kuznetcov",
        middlename: "Yaroslavovich",
        birthday: "1997-04-14",
        startLearning: "2006",
        faculty: "1025-DVA"
    }
];

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
    validate = true;

    const inputs = [inputName, inputSurname, inputMiddlename, inputBirthday, inputStartLearning, inputFaculty];

    if (inputsIsEmpty(inputs)) validate = false;

    if (!validateBirthday(inputBirthday)) validate = false;

    if (!validateStartLearning(inputStartLearning)) validate = false;

    if (validate) {
        const studentName = inputName.value;
        const studentSurname = inputSurname.value;
        const studentMiddlename = inputMiddlename.value;
        const studentBirthday = inputBirthday.value;
        const studentStartLearning = inputStartLearning.value;
        const studentFaculty = inputFaculty.value;

        inputs.forEach(element => {
            element.value = "";
        }) 
    
        addStudent(studentName, studentSurname, studentMiddlename, studentBirthday, studentStartLearning, studentFaculty);
        updateStudentList();
    }

    console.log(studentsArr);
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

    return validateInput(year > 2000 && year < new Date().getFullYear(), input);
}

function validateBirthday(input) {
    const minDate = new Date('1900-01-01T00:00:00');
    const birthday = new Date(`${input.value}T00:00:00`);

    return validateInput(minDate < birthday, input);
}

function validateInput(criteria, input) {
    if (criteria) {
        input.classList.remove("input_error");
        
        return true
    }

    input.classList.add("input_error");

    return false
}

function updateStudentList() {
    while (document.querySelector(".student")) {
        document.querySelector(".student").remove();
    };

    const studentListNode = document.querySelector(".student-list");
    
    studentsArr.forEach(student => {
        const studentNode = document.createElement("li");
        studentNode.classList.add("student", "student-list__item")

        // name
        const studentNameNode = document.createElement("span");
        studentNameNode.classList.add("student__name", "student__info");
        studentNameNode.textContent = student.name;
        studentNode.append(studentNameNode);
        // surname
        const studentSurnameNode = document.createElement("span");
        studentSurnameNode.classList.add("student__surname", "student__info")
        studentSurnameNode.textContent = student.surname;
        studentNode.append(studentSurnameNode);
        // middlename
        const studentMiddlenameNode = document.createElement("span");
        studentMiddlenameNode.classList.add("student__middlename", "student__info")
        studentMiddlenameNode.textContent = student.middlename;
        studentNode.append(studentMiddlenameNode);
        // birthday
        const studentBirthdayNode = document.createElement("span");
        studentBirthdayNode.classList.add("student__birthday", "student__info")
        studentBirthdayNode.textContent = student.birthday;
        studentNode.append(studentBirthdayNode);
        // start learning
        const studentStartLearningNode = document.createElement("span");
        studentStartLearningNode.classList.add("student__start-learning", "student__info");
        studentStartLearningNode.textContent = student.startLearning;
        studentNode.append(studentStartLearningNode);
        // faculty
        const studentFacultyNode = document.createElement("span");
        studentFacultyNode.classList.add("student__faculty", "student__info");
        studentFacultyNode.textContent = student.faculty;
        studentNode.append(studentFacultyNode);
        // add student to list
        studentListNode.append(studentNode);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    updateStudentList();
})