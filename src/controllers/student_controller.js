
const pool=require("../db")
const queries=require("../querys/student_querys")


const getStudents=(req,res)=>{
    pool.query(queries.getStudents,(error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database could not be accessed.' });
        } else {
          res.status(200).json(results.rows);
        }
      });
}


const getStudentsGetbyId=(req,res)=>{
  const id= parseInt(req.params.id);
  pool.query(queries.getStudentsGetbyId,[id],(error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database could not be accessed.' });
      } else {
        res.status(200).json(results.rows);
      }
    });
}

//data ekler
const addStudent=(req,res)=>{
  const {name,surname,tc}=req.body
  pool.query(queries.addStudent,[name,surname,tc],(error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database could not be accessed.' });
      } else {
        res.status(200).json({message: 'User succesfully added.' });
      }
    });
}

//data günceller
const updateStudent=(req,res)=>{
  const id= parseInt(req.params.id);
  const {name,surname,tc}=req.body
//güncellencek data var mı diye kontrol ediyor 
  pool.query(queries.getStudentsGetbyId,[id],(error, results) => {
    const noStudentFound=!results.rows.length
    //sonuç 0 dönerse  (!results.rows.length) ile true olarak alıyor ve aşağıda databasede öyle bir data olmadığını söylüyor,eğer varsa da güncelleme işlemini yapıyor
    if (noStudentFound) {
      res.send("User does not exist in the database.")
    } else {
      pool.query(queries.updateClass,[name,surname,tc,id],(error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database could not be accessed.' });
        } else {
          res.status(200).json({message: 'User succesfully updated.' });
        }
      });
    }
  });
}

//data siler
const deleteStudent=(req,res)=>{
  const id= parseInt(req.params.id);
  //silinecek data var mı diye kontrol ediyor 
  pool.query(queries.getStudentsGetbyId,[id],(error, results) => {
    const noStudentFound=!results.rows.length
      //sonuç 0 dönerse (!results.rows.length) ile  true olarak alıyor ve aşağıda databasede öyle bir data olmadığını söylüyor,eğer varsa da silme işlemini yapıyor
    if (noStudentFound) {
      res.send("User does not exist in the database.")
    } else {
      pool.query(queries.removeStudent,[id],(error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database could not be accessed.' });
        } else {
          res.status(200).json({message: 'User succesfully deleted.'});
        }
      });
    }
  });
}


module.exports = {
    getStudents,
    getStudentsGetbyId,
    addStudent,
    updateStudent,
    deleteStudent

}