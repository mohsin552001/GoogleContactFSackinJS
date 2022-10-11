let express = require('express')
let app = express()
let cors = require('cors');
let dotenv = require('dotenv');
let { DBService, DBserviceDivs } = require('./dbservice');
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))



app.post('/insert', (req, res) => {
    let { Name, email, phoneNumber, jobTitleAndComp } = req.body;
    let db = DBService.getdbservicinstance();

    let result = db.insertNewName(Name, email, phoneNumber, jobTitleAndComp);
    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err))
})




app.get('/getAll', (req, res) => {
    let db = DBService.getdbservicinstance();
    let result = db.getAlldata()

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err))
})




app.patch('/update', (req, res) => {
    let db = DBService.getdbservicinstance();
    let { id, Name, email, phoneNumber, jobTitleAndComp } = req.body;

    let result = db.updateNameById(id, Name, email, phoneNumber, jobTitleAndComp)
    // console.log(result)
    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err))

})

app.delete('/delete/:id', (req, res) => {
    let db = DBService.getdbservicinstance();
    let { id } = req.params;
    let result = db.deleteRowbyId(id)

    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err))

})



app.get('/search/:Name', (req, res) => {
    let { Name } = req.params;
    let db = DBService.getdbservicinstance();


    console.log(req.params);
    let result = db.searchByName(Name)

    result
        .then(data => res.json({ data: data }))
        .catch(err => console.log(err))
})

////secondParDivsStart;;;;;;

app.post('/insertDivsdata', (req, res) => {
    let { name } = req.body

    let db = DBserviceDivs.secondDBServiceinstance();
    let result = db.insertDivName(name)


    result
        .then(data => { })
        .catch(err => console.log(err))
})

app.get('/getAllDivsdata', (req, res) => {
    let db = DBserviceDivs.secondDBServiceinstance();


    let result = db.getwholedata();

    result
        .then(data => res.json({ data: data }))
})






app.delete('/deleteDivs/:id', (req, res) => {
    let { id } = req.params
    let db = DBserviceDivs.secondDBServiceinstance();


    let result = db.deleteRowByIdDivs(id);

    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err))
})


app.patch('/updateDivsdata', (req, res) => {
    console.log(req.body)
    let { id, name } = req.body;
    let db = DBserviceDivs.secondDBServiceinstance();


    let result = db.updataNameByIdDivs(id, name);

    result
        .then(data => res.json({ success: data }))
        .catch(err => console.log(err))
})








app.listen(process.env.PORT, () => console.log('hello worldand and this is my first thinking'))