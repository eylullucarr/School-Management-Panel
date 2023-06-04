const {Router} =require('express')
const router= Router()
const controller= require('../controllers/class_controller')


router.get("/",controller.getClass)
router.get("/:id",controller.getClassGetbyId)
router.post("/",controller.addClass)
router.delete("/:id",controller.deleteClass)
router.put("/:id",controller.updateClass)

module.exports=router