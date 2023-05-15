const today = new Date();


const formStudent = document.querySelector(".form-student");

const inputName = document.querySelector("#form-student__input-name");
const inputSurname = document.querySelector("#form-student__input-surname");
const inputMiddlename = document.querySelector("#form-student__input-middlename");
const inputBirthday = document.querySelector("#form-student__input-birthday");
const inputStartLearning = document.querySelector("#form-student__input-start-learning");
const inputFaculty = document.querySelector("#form-student__input-faculty");

const formSearch = document.querySelector(".form-search")

const inputSearchFullname = document.querySelector("#form-search__input-fullname");
const inputSearchFaculty = document.querySelector("#form-search__input-faculty");
const inputSearchStartLearningYear = document.querySelector("#form-search__input-start-learning-year");
const inputSearchEndLearningYear = document.querySelector("#form-search__input-end-learning-year");

const studentsArr = [ 
    {
        fullname: "Fedorov Alexey Ivanovich",
        faculty: "1042-DVA",
        birthday: "1999.10.21 (23 лет)",
        learningYears: "2013-2017 (закончил)",
    }, 
    {
        fullname: "Kovalenko Anastasia Vladimirovna",
        faculty: "1042-FFR",
        birthday: "2001.10.21 (21 лет)",
        learningYears: "2015-2019 (закончил)",
    }, 
    {
        fullname: "Kuznetcov Petr Yaroslavovich",
        faculty: "1025-DVA",
        birthday: "1997.04.14 (26 лет)",
        learningYears: "2006-2010 (закончил)"
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

    return validateInput(minDate < birthday && birthday < today, input);
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
    

    return {
        fullname: [studentData.name, studentData.surname, studentData.middlename].join(" "),
        faculty: studentData.faculty,
        birthday: studentData.birthday,
        learningYears: studentData.startLearning
    }
}

function searchStudent(fullname, faculty, startLearningYear, endLearningYear) {
    studentFiltered = [];

    fullname = fullname.trim().split(" ");
    faculty = faculty.trim();
    startLearningYear = startLearningYear.trim();
    endLearningYear = endLearningYear.trim();

    studentsArr.forEach(elem => {
        // search of name, surname, middlename
        if (fullname != "") {
            let include = false;

            elem.fullname.split(" ").forEach(e => {
                if (include) return

                for (let i = 0; i < fullname.length; i++) {
    
                    if (e.toLowerCase().includes(fullname[i].toLowerCase())) {
                        include = true
                        return
                    }
                }
            })

            if (!include) {
                return
            }
        }
        // search of faculty
        if (faculty != "") {
            
            if (elem.faculty.toLowerCase().includes(faculty.toLowerCase())) {
                console.log("faculty true");
            } else {
                return
            }
        }
        // search of start learning year
        if (startLearningYear != "") {

            if (elem.learningYears.split("-")[0] == startLearningYear) {
                console.log("startLearningYear true");
            } else {
                return
            }
        }
        // search of end learning year
        if (endLearningYear != "") {

            if (elem.learningYears.split("-")[1] == endLearningYear) {
                console.log("endLearningYear true");
            } else {
                return
            }
        }
        
        studentFiltered.push(elem);
    })

    return studentFiltered
}


function updateStudentList(studentArray) {
    while (document.querySelector(".student")) {
        document.querySelector(".student").remove();
    };

    const studentListNode = document.querySelector(".student-list");
    
    studentArray.forEach(student => {
        const studentNode = document.createElement("li");
        studentNode.classList.add("student", "student-list__item")

        // fullname
        const studentFullnameNode = document.createElement("span");
        studentFullnameNode.classList.add("student__fullname", "student__info");
        studentFullnameNode.textContent = student.fullname;
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
        studentStartLearningNode.textContent = student.learningYears;
        studentNode.append(studentStartLearningNode);
        // add student to list
        studentListNode.append(studentNode);
    })
}

formStudent.addEventListener("submit", () => {
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
        updateStudentList(studentsArr);
    }
})

formSearch.addEventListener("submit", () => {
    const fullname = inputSearchFullname.value;
    const faculty = inputSearchFaculty.value;
    const startLearningYear = inputSearchStartLearningYear.value;
    const endLearningYear = inputSearchEndLearningYear.value;

    studentFiltered = searchStudent(fullname, faculty, startLearningYear, endLearningYear);

    updateStudentList(studentFiltered);
})

// sort fullname
document.querySelector(".sort-panel__fullname").addEventListener("click", () => {
    const arrSort = studentsArr.map(element => element).sort((a, b) => {
        if (a.fullname > b.fullname) {
            return 1;
        }

        if (a.fullname < b.fullname) {
            return -1;
        }
        
        return 0;
    });

    updateStudentList(arrSort)
})
// sort faculty
document.querySelector(".sort-panel__faculty").addEventListener("click", () => {
    const arrSort = studentsArr.map(element => element).sort((a, b) => {
        if (a.faculty > b.faculty) {
            return 1;
        }

        if (a.faculty < b.faculty) {
            return -1;
        }
        
        return 0;
    });

    updateStudentList(arrSort)
})
// sort birthday
document.querySelector(".sort-panel__birthday").addEventListener("click", () => {
    const arrSort = studentsArr.map(element => element).sort((a, b) => {
        a = new Date(a.birthday.slice(0, 10).split("."));
        b = new Date(b.birthday.slice(0, 10).split("."));
        
        return b - a;
    });

    updateStudentList(arrSort)
})
// sort learning years
document.querySelector(".sort-panel__learning-years").addEventListener("click", () => {
    const arrSort = studentsArr.map(element => element).sort((a, b) => {
        a = new Date(a.learningYears.slice(0, 5));
        b = new Date(b.learningYears.slice(0, 5));
        
        return b - a;
    });

    updateStudentList(arrSort)
})

document.addEventListener("DOMContentLoaded", () => {
    updateStudentList(studentsArr);
})