import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent implements OnInit {
    tasks:Array<any>;
    task: string;
    isValid: Boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router
    ) {
    
   }

  ngOnInit() {
    //initially bringing all the task
    this.authService.getToDos().subscribe(tasks => {
      this.tasks = tasks;
      if(this.tasks.length !== 0)
        this.isValid = true;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  //Adding new task
  addTask(event){
        event.preventDefault();
        var newTask = {
            task: this.task,
            isDone: false
        }
        
        this.authService.addTask(newTask)
            .subscribe(task => {
                this.tasks.push(task);
                this.task = '';

                this.isValid = true;

            });
    }

    //deleting an existing task    
    deleteTask(id){
        var tasks = this.tasks;
        
        this.authService.deleteTask(id).subscribe(data => {
            if(data.n == 1){
                for(var i = 0;i < tasks.length;i++){
                    if(tasks[i]._id == id){
                        tasks.splice(i, 1);
                    }
                }
            }
            if(tasks.length === 0)
                this.isValid = false;
            else
                this.isValid = true;
        });
    }
    //updating and existing task
    updateStatus(task){
        var _task = {
            _id:task._id,
            task: task.task,
            isDone: !task.isDone
        };
        
        this.authService.updateStatus(_task).subscribe(data => {
            task.isDone = !task.isDone;
        });
    }

}
