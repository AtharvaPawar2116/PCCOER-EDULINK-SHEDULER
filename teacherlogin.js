
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
        import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

        // Fetch appointments from Firebase
        const appointmentsList = ref(db, 'appointments');
        const appointmentsTbody = document.getElementById('appointments-tbody');

        const fetchAppointments = () => {
            onValue(appointmentsList, (snapshot) => {
                const data = snapshot.val();
                appointmentsTbody.innerHTML = ''; // Clear the table body
                for (const key in data) {
                    const row = document.createElement('tr');
                    
                    const teacherName = document.createElement('td');
                    teacherName.textContent = data[key].teacherName;
                    row.appendChild(teacherName);
                    
                    const subject = document.createElement('td');
                    subject.textContent = data[key].subject;
                    row.appendChild(subject);
                    
                    const department = document.createElement('td');
                    department.textContent = data[key].department;
                    row.appendChild(department);
                    
                    const reason = document.createElement('td');
                    reason.textContent = data[key].reason;
                    row.appendChild(reason);

                    const actionCell = document.createElement('td');
                    const approveButton = document.createElement('button');
                    approveButton.textContent = 'Approve';
                    approveButton.addEventListener('click', () => approveAppointment(key));
                    
                    const rejectButton = document.createElement('button');
                    rejectButton.textContent = 'Reject';
                    rejectButton.addEventListener('click', () => rejectAppointment(key));

                    actionCell.appendChild(approveButton);
                    actionCell.appendChild(rejectButton);
                    row.appendChild(actionCell);

                    appointmentsTbody.appendChild(row);
                }
            });
        };

        // Approve appointment
        const approveAppointment = (key) => {
            const appointmentRef = ref(db, `appointments/${key}`);
            update(appointmentRef, { status: 'Approved' }).then(() => {
                alert('Appointment approved!');
            }).catch((error) => {
                console.error('Error approving appointment:', error);
            });
        };

        // Reject appointment
        const rejectAppointment = (key) => {
            const appointmentRef = ref(db, `appointments/${key}`);
            update(appointmentRef, { status: 'Rejected' }).then(() => {
                alert('Appointment rejected!');
            }).catch((error) => {
                console.error('Error rejecting appointment:', error);
            });
        };

        document.getElementById('fetch-appointments-button').addEventListener('click', fetchAppointments);
