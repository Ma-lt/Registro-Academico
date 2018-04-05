import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminEscuelaService } from '../admin-escuela.service';
import { Profesor } from '../models/profesor';
import { Escuela } from '../models/escuela';

@Component({
  selector: 'app-admin-escuela',
  templateUrl: './admin-escuela.component.html',
  styleUrls: ['./admin-escuela.component.css']
})
export class AdminEscuelaComponent implements OnInit {

  constructor(private adminService: AdminEscuelaService, 
    private route: ActivatedRoute, private router: Router) { }


  private profesor: Profesor;
  private instituciones: Array<Escuela>;

  ngOnInit() {
  	  let usr = this.route.snapshot.parent.paramMap.get('usr');
      this.adminService.getProfesor(usr).subscribe( data => this.profesor = data );
      this.adminService.getEscuelas();
  }

}
