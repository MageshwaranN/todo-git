const express = require('express');
const router = express.Router();
const config = require('../config/db');
const Task = require('../models/tasks');

//Save Task
router.post('/task', (req, res, next)=>{
    let newTask = new Task();
		newTask.task = req.body.task;
		newTask.email = req.body.email;
        newTask.isDone = req.body.isDone;

    if(!newTask.task || !(newTask.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        newTask.save((err, task)=>{
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

//Retrieve tasks Task
router.get('/task', (req, res, next)=>{

    const query = {email: req.query.email};

    Task.find(query, (err, tasks)=>{
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// Delete Task
router.delete('/task', (req, res, next)=>{
    Task.remove({_id: req.query.id}, (err, task)=>{
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Update Task
router.put('/task', (req, res, next)=>{
    Task.findById(req.query.id, (err, updatedTask)=>{
        if(err)
            res.send(err);

        else{
            updatedTask.task = req.body.task;
            updatedTask.isDone = req.body.isDone;

            updatedTask.save((err, task)=>{
                if(err)
                    res.send(err);

                res.json(task);
                });
            }
        });
});

module.exports = router;