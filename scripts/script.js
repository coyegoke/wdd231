document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');

    if (hamburgerMenu && nav) {
        hamburgerMenu.addEventListener('click', () => {
            nav.classList.toggle('open');
            hamburgerMenu.classList.toggle('active');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    hamburgerMenu.classList.remove('active');
                }
            });
        });
    }

    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById('lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;
    }

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ];

    const coursesContainer = document.querySelector('.courses-container');
    const creditsTotalSpan = document.getElementById('credits-total');
    const filterButtons = document.querySelectorAll('.course-filters button');

    function displayCourses(filteredCourses) {
        coursesContainer.innerHTML = '';
        if (filteredCourses.length === 0) {
            coursesContainer.innerHTML = '<p>No courses to display for this filter.</p>';
            creditsTotalSpan.textContent = 0;
            return;
        }

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed');
            }

            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number}: ${course.title}</h3>
                <p><strong>Certificate:</strong> ${course.certificate}</p>
                <p>${course.description}</p>
                <p class="credits"><strong>Credits:</strong> ${course.credits}</p>
                <p class="technologies"><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
            `;
            coursesContainer.appendChild(courseCard);
        });

        // Calculate and display total credits for the currently displayed courses
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        creditsTotalSpan.textContent = totalCredits;
    }

    // Step 3.7 & 3.8: Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            event.target.classList.add('active');

            const filterType = event.target.id;
            let filteredCourses = [];

            if (filterType === 'filter-all') {
                filteredCourses = courses;
            } else if (filterType === 'filter-cse') {
                filteredCourses = courses.filter(course => course.subject === 'CSE');
            } else if (filterType === 'filter-wdd') {
                filteredCourses = courses.filter(course => course.subject === 'WDD');
            }
            displayCourses(filteredCourses);
        });
    });

    displayCourses(courses);
});