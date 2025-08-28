import express from 'express';
import { loginStudent, getStudent, registerStudent } from '../Controller/userController.js'; // Include .js
import authMiddleware from '../middleware/auth.js';
import { AdminLogin, CreateStudent, DeleteStudent, GetForAdmin, UpdateStudent } from '../Controller/adminController.js';
const router = express.Router();
// userroutes
router.post('/api/login', loginStudent);
router.get('/api/login',authMiddleware, getStudent);
router.post('/api/register', registerStudent);



// adminroutes
router.get('/api/getStudent',GetForAdmin)
router.post('/api/adminlogin',AdminLogin)
router.put('/api/updateStudent/:id',UpdateStudent)
router.delete('/api/deleteStudent/:id',DeleteStudent)
router.post('/api/Createstudent',CreateStudent)

export default router;