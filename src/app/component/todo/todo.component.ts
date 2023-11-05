import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { myTask } from 'src/app/model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: myTask[] = [];
  inProgress: myTask[] = [];
  done: myTask[] = [];
  updateIndex: any;
  isEditEnable: boolean = false;
  taskDate:any
defaultInputVal=''
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  currentTime(){
    this.taskDate= moment().format(' hh:mm:ss ');
  }

  addTask() {
    const taskDescription = this.todoForm.value.item;

    if (taskDescription.trim() !== '') { // Check if the input is not empty after trimming whitespace
      this.tasks.push({
        desc: taskDescription,
        done: false,
      });
      this.todoForm.reset();
      this.currentTime();
    } else {
      // Handle the case when the input is empty, e.g., display an error message.
    }
  }


  deleteTodo(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteProgress(i: number) {
    this.inProgress.splice(i, 1);
  }

  deleteDone(i: number) {
    this.done.splice(i, 1);
  }

  onEdit(item: myTask, i: number) {
    this.todoForm.controls['item'].setValue(item.desc);
    this.updateIndex = i;
    this.isEditEnable = true;
  }

  updateTask() {
    this.tasks[this.updateIndex].desc=this.todoForm.value.item;
    this.tasks[this.updateIndex].done=false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnable=false
  }
  drop(event: CdkDragDrop<myTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

  }
};


