import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AdminInstitucionService } from '../admin-institucion.service';
import { Profesor } from '../models/profesor';
import { Institucion } from '../models/institucion';

@Component({
  selector: 'app-admin-institucion',
  templateUrl: './admin-institucion.component.html',
  styleUrls: ['./admin-institucion.component.css'],
  providers: [AdminInstitucionService]
})
export class AdminInstitucionComponent implements OnInit {

  constructor(private adminService: AdminInstitucionService, private route: ActivatedRoute, private router: Router) { }

  private profesor: Profesor;
  private instituciones: Array<Institucion>;
  private isavailable: boolean = false;
  private selectedInstitucion: Institucion;

  ngOnInit() {
      let usr = this.route.snapshot.parent.paramMap.get('usr');
      this.adminService.getProfesor(usr).subscribe( data => this.profesor = data );
      this.adminService.getInstituciones().subscribe( data => this.instituciones = data);
  }

  onSelectInstitucion(i){
      this.isavailable = true;
      console.log(i);
      this.selectedInstitucion = i;
  }
}
