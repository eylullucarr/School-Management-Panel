const express = require('express');
const app = express();
const cors = require('cors');
const port = 1800;
const studentroutes=require('./routes/student_routes')
const classroutes=require('./routes/class_routes')



// CORS ayarlarını etkinleştir
app.use(cors());

app.use(express.json());


app.use('/api/student',studentroutes)
app.use('/api/class',classroutes)


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });