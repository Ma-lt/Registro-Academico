import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin-institucion',
  templateUrl: './admin-institucion.component.html',
  styleUrls: ['./admin-institucion.component.css'],
})
export class AdminInstitucionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      let id = this.route.snapshot.parent.paramMap.get('id');
      console.log(id);
  }

}
