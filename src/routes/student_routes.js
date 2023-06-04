const {Router} =require('express')
const router = Router()
const controller = require('../controllers/student_controller')


router.get("/",controller.getStudents)
router.get("/:id",controller.getStudentsGetbyId)
router.post("/",controller.addStudent)
router.delete("/:id",controller.deleteStudent)
router.put("/:id",controller.updateStudent)

module.exports=router