import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-profesor',
  templateUrl: './main-profesor.component.html',
  styleUrls: ['./main-profesor.component.css'],
})
export class MainProfesorComponent implements OnInit {

  ngOnInit() {
  }  
  constructor() { }

  w3_open() {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }
  w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  }

}
