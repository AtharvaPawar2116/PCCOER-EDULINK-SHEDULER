  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
        import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

        const firebaseConfig = {
            apiKey: "AIzaSyA3l_u9bo3mcur-zPW0ldb3ISaMyS-vo3U",
            authDomain: "student-teachers-booking.firebaseapp.com",
            projectId: "student-teachers-booking",
            storageBucket: "student-teachers-booking.firebasestorage.app",
            messagingSenderId: "987803054744",
            appId: "1:987803054744:web:fd12e500d0d8aa5c1296ed",
            measurementId: "G-PTHZ04LCTK"
        };

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        // Fetch teachers from Firebase
        const teacherList = ref(db, 'teachers');
        const teacherUl = document.getElementById('teacher-ul');

        const fetchTeachers = () => {
            onValue(teacherList, (snapshot) => {
                const data = snapshot.val();
                teacherUl.innerHTML = ''; // Clear the list
                for (const key in data) {
                    const li = document.createElement('li');
                    li.textContent = `${data[key].name} - ${data[key].subject} - ${data[key].department}`;
                    teacherUl.appendChild(li);
                }
            });
        };

        document.getElementById('fetch-data-button').addEventListener('click', fetchTeachers);

        // Filter teachers
        document.getElementById('filter-button').addEventListener('click', () => {
            const subjectFilter = document.getElementById('subject-filter').value.toLowerCase();
            const departmentFilter = document.getElementById('department-filter').value.toLowerCase();
            
            onValue(teacherList, (snapshot) => {
                const data = snapshot.val();
                teacherUl.innerHTML = '';
                for (const key in data) {
                    const teacher = data[key];
                    if (
                        (subjectFilter === '' || teacher.subject.toLowerCase().includes(subjectFilter)) &&
                        (departmentFilter === '' || teacher.department.toLowerCase().includes(departmentFilter))
                    ) {
                        const li = document.createElement('li');
                        li.textContent = `${teacher.name} - ${teacher.subject} - ${teacher.department}`;
                        teacherUl.appendChild(li);
                    }
                }
            });
        });

        // Handle appointment form submission
        const appointmentForm = document.getElementById('appointment-form');
        appointmentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const teacherName = document.getElementById('teacher-name').value;
            const studentName = document.getElementById('student-name').value;
            const subject = document.getElementById('subject').value;
            const department = document.getElementById('department').value;
            const reason = document.getElementById('reason').value;

            const appointmentRef = ref(db, 'appointments');
            push(appointmentRef, {
                teacherName,
                studentName,
                subject,
                department,
                reason
            }).then(() => {
                alert('Appointment request submitted!');
                appointmentForm.reset();
            }).catch((error) => {
                console.error('Error submitting appointment:', error);
            });
        });
