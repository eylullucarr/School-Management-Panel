const getStudents="SELECT * FROM students"
const getStudentsGetbyId="SELECT * FROM students WHERE id =$1"
const addStudent="INSERT INTO students (name, surname, tc) VALUES ($1, $2, $3)"
const removeStudent="DELETE FROM students WHERE id =$1"
const updateStudent="UPDATE students SET name = $1, surname = $2, tc=$3 WHERE id =$4"

module.exports = {
    getStudents,
    getStudentsGetbyId,
    addStudent,
    removeStudent,
    updateStudent}