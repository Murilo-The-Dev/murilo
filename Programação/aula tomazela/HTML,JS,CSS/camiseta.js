
    console.log('Nerdzinhos');
    console.log('Java aqui não');
    console.log('Tomazella é o cara');
    console.log('Python é modinha');
    console.log('Bolo de Chocolate');

    function displayCourseInfo() {
        const course = "Análise e Desenvolvimento de Sistemas";
        const institution = "Faculdade Claretiano";
        console.log(course);
        console.log(institution);
    }

    function favoriteLanguages() {
        const languages = ["JavaScript", "Python", "C#", "Java"];
        languages.forEach((lang) => {
            if (lang === "Java") {
                console.log("Java aqui não");
            } else {
                console.log(`${lang} é legal`);
            }
        });
    }

    function praiseProfessor() {
        const professor = "Tomazella";
        console.log(`${professor} é o cara`);
    }

    displayCourseInfo();
    favoriteLanguages();
    praiseProfessor();

