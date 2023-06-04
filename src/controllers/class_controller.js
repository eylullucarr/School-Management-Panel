
const pool=require("../db")
const queries=require("../querys/class_querys")


const getClass=(req,res)=>{
    pool.query(queries.getClass,(error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database could not be accessed.' });
        } else {
          res.status(200).json(results.rows);
        }
      });
}


const getClassGetbyId=(req,res)=>{
  const id= parseInt(req.params.id);
  pool.query(queries.getClassGetbyId,[id],(error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database could not be accessed.' });
      } else {
        res.status(200).json(results.rows);
      }
    });
}

//data ekler
const addClass=(req,res)=>{
  const {name,capacity}=req.body
  pool.query(queries.addClass,[name,capacity],(error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database could not be accessed.' });
      } else {
        res.status(200).json({message: 'User succesfully added.' });
      }
    });
}

//data günceller
const updateClass=(req,res)=>{
  const id= parseInt(req.params.id);
  const {name,capacity}=req.body
//güncellencek data var mı diye kontrol ediyor 
  pool.query(queries.getClassGetbyId,[id],(error, results) => {
    const noClassFound=!results.rows.length
    //sonuç 0 dönerse  (!results.rows.length) ile true olarak alıyor ve aşağıda databasede öyle bir data olmadığını söylüyor,eğer varsa da güncelleme işlemini yapıyor
    if (noClassFound) {
      res.send("User does not exist in the database.")
    } else {
      pool.query(queries.updateClass,[name,capacity,id],(error, results) => {
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
const deleteClass=(req,res)=>{
  const id= parseInt(req.params.id);
  //silinecek data var mı diye kontrol ediyor 
  pool.query(queries.getClassGetbyId,[id],(error, results) => {
    const noClassFound=!results.rows.length
      //sonuç 0 dönerse (!results.rows.length) ile  true olarak alıyor ve aşağıda databasede öyle bir data olmadığını söylüyor,eğer varsa da silme işlemini yapıyor
    if (noClassFound) {
      res.send("User does not exist in the database.")
    } else {
      pool.query(queries.removeClass,[id],(error, results) => {
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
    getClass,
    getClassGetbyId,
    addClass,
    updateClass,
    deleteClass
}