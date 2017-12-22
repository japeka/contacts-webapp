import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  statusCode: number;
  statusMessage: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.statusCode = Number(this.route.snapshot.paramMap.get('status'));
    switch (this.statusCode) {
      case 0: {
        this.statusMessage = 'Service at backend not running';
        break;
      }
      case 400: {
        this.statusMessage = 'Bad request';
        break;
      }
      case 403: {
        this.statusMessage = 'Forbidden resource';
        break;
      }
      case 404: {
        this.statusMessage = 'Resource not found';
        break;
      }
      case 500: {
        this.statusMessage = 'Internal server error';
        break;
      }
    }
  }

}
