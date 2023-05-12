const today = new Date();

const formStudend = document.querySelector(".form-student");

const inputName = document.querySelector("#form-student__input-name");
const inputSurname = document.querySelector("#form-student__input-surname");
const inputMiddlename = document.querySelector("#form-student__input-middlename");
const inputBirthday = document.querySelector("#form-student__input-birthday");
const inputStartLearning = document.querySelector("#form-student__input-start-learning");
const inputFaculty = document.querySelector("#form-student__input-faculty");


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
    const student = transformData({
        name,
        surname,
        middlename,
        birthday,
        startLearning,
        faculty
    });
    
    return studentsArr.push(student)
}

formStudend.addEventListener("submit", () => {
    validate = true;

    const inputs = [inputName, inputSurname, inputMiddlename, inputBirthday, inputStartLearning, inputFaculty];

    // if (inputsIsEmpty(inputs)) validate = false;

    // if (!validateBirthday(inputBirthday)) validate = false;

    // if (!validateStartLearning(inputStartLearning)) validate = false;

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
    const startLearningYear = input.value;
    
    const criteria = startLearningYear == today.getFullYear() || startLearningYear > 2000 && startLearningYear < today.getFullYear();

    return validateInput(criteria, input);
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

function transformData(studentData) {
    //birthday
    const birthday = new Date(`${studentData.birthday}T00:00:00`);

    let StudentAge = today.getFullYear() - birthday.getFullYear();

    const nextBirthday = birthday.setFullYear(`${birthday.getFullYear() + StudentAge}`);
    
    if (nextBirthday > today) {
        StudentAge -= 1;
    }
    
    studentData.birthday = studentData.birthday
                            .split("-")
                            .join(".")
                            + ` (${StudentAge} лет)`;                      
    // years of study (learning years)
    const endLearningYear = Number(studentData.startLearning) + 4;
    const endLearningDate = new Date(`${endLearningYear}-09-01T00:00:00`);
    let currentCourse = today.getFullYear() - studentData.startLearning;

    if (today > new Date(`${today.getFullYear()}-09-01T00:00:00`)) {
        currentCourse += 1
    }

    if (today > endLearningDate) {
        studentData.startLearning = `${studentData.startLearning}-${endLearningYear} (закончил)`;
    } else if (currentCourse == 0) {
        studentData.startLearning = `${studentData.startLearning}-${endLearningYear} (поступает в этом году)`;
    } else {
        studentData.startLearning = `${studentData.startLearning}-${endLearningYear} (${currentCourse} курс)`;
    }
    
    return studentData
}

function updateStudentList() {
    while (document.querySelector(".student")) {
        document.querySelector(".student").remove();
    };

    const studentListNode = document.querySelector(".student-list");
    
    studentsArr.forEach(student => {
        const studentNode = document.createElement("li");
        studentNode.classList.add("student", "student-list__item")

        // fullname
        const studentFullnameNode = document.createElement("span");
        studentFullnameNode.classList.add("student__fullname", "student__info");
        studentFullnameNode.textContent = [student.name, student.surname, student.middlename].join(" ");
        studentNode.append(studentFullnameNode);
        // faculty
        const studentFacultyNode = document.createElement("span");
        studentFacultyNode.classList.add("student__faculty", "student__info");
        studentFacultyNode.textContent = student.faculty;
        studentNode.append(studentFacultyNode);
        // birthday
        const studentBirthdayNode = document.createElement("span");
        studentBirthdayNode.classList.add("student__birthday", "student__info")
        studentBirthdayNode.textContent = student.birthday;
        // learning years
        studentNode.append(studentBirthdayNode);
        const studentStartLearningNode = document.createElement("span");
        studentStartLearningNode.classList.add("student__learning-years", "student__info");
        studentStartLearningNode.textContent = student.startLearning;
        studentNode.append(studentStartLearningNode);
        // add student to list
        studentListNode.append(studentNode);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    updateStudentList();
})