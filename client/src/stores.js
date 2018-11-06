// @flow
import { sharedComponentData } from 'react-simplified';
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Student {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
}

class StudentStore {
  students = [];
  currentStudent = new Student();

  getStudents() {
    return axios.get('/students').then((students: Student[]) => (this.students = students));
  }

  getStudent(id: number) {
    return axios.get('/students/' + id).then((student: Student) => {
      // Update students-array in case the information has changed
      for (let e of this.students) {
        if (e.id == student.id) {
          e.firstName = student.firstName;
          e.lastName = student.lastName;
          e.email = student.email;
            break;
        }
      }
      this.currentStudent = student;
    });
  }

  updateStudent() {
    return axios.put('/students', this.currentStudent).then(() => {
      // Update the students-array
      for (let e of this.students) {
        if (e.id == this.currentStudent.id) {
          e.firstName = this.currentStudent.firstName;
          e.lastName = this.currentStudent.lastName;
          e.email = this.currentStudent.email;
          break;
        }
      }
    });
  }
}
export let studentStore = sharedComponentData(new StudentStore());
