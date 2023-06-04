const getClass="SELECT * FROM class"
const getClassGetbyId="SELECT * FROM class WHERE id =$1"
const addClass="INSERT INTO class (name, capacity) VALUES ($1, $2)"
const removeClass="DELETE FROM students WHERE id =$1"
const updateClass="UPDATE class SET name = $1, capacity = $2 WHERE id =$3"

module.exports = {
getClass,
getClassGetbyId,
addClass,
removeClass,
updateClass}

