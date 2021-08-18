const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const projectModel = require('./model/requestModel');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:abcd.12345@eldoradocluster.saznp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { UseNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/statisticalCalculation', (req, res) => {
    console.log('statisticalCalculation');
    let request = new projectModel(req.body);
    request.save((err, data) => {
        if (err) {
            res.send(err);
        }
        console.log("Data: " + data.list);
        //loop thorugh the data.list numbers, and find the average
        let sum = 0;
        for (let i = 0; i < data.list.length; i++) {
            sum += data.list[i];
        }
        let average = sum / data.list.length;
        console.log("Average: " + average);
        let sumOfSquares = 0;
        for (let i = 0; i < data.list.length; i++) {
            sumOfSquares += Math.pow(data.list[i] - average, 2);
        }
        let standardDeviation = Math.sqrt(sumOfSquares / data.list.length);
        console.log("Standard Deviation: " + standardDeviation);
        let sortedList = data.list.sort((a, b) => a - b);
        let median = (sortedList.length % 2 === 0) ? (sortedList[sortedList.length / 2] + sortedList[sortedList.length / 2 - 1]) / 2 : sortedList[sortedList.length / 2];
        console.log("Median: " + median);
        //send the average, median and standard deviation to the client
        res.status(200).json({
            average: average,
            median: median,
            standardDeviation: standardDeviation
        });
    });

})

//get all of the lists, and send them to the client
app.get('/getAll', (req, res) => {
    projectModel.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

//put, get the id from the path, and update the projectModel
app.put('/update/:id', (req, res) => {
    projectModel.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send(err);
        }
        data.list = req.body.list;
        data.save((err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    });
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})