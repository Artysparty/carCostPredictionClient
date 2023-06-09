import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PredictionService } from './services/prediction-service.service';

type ISelect = {
  numericValue: string;
  stringValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  form: FormGroup;

  sub$ = new Subscription();

  selectForCarName: ISelect[] = [
    {
      numericValue: '1',
      stringValue: 'Aston Martin'
    },
    {
      numericValue: '2',
      stringValue: 'Lamborghini Gollardo'
    },
    {
      numericValue: '3',
      stringValue: 'Hummer H1'
    }
  ]

  selectForEngineLocation: ISelect[] = [
    {
      numericValue: '1',
      stringValue: 'Переднее'
    },
    {
      numericValue: '2',
      stringValue: 'Заднее'
    }
  ]

  selectForFuelsystem: ISelect[] = [
    {
      numericValue: '1',
      stringValue: 'mpfi'
    },
    {
      numericValue: '2',
      stringValue: 'idi'
    },
    {
      numericValue: '3',
      stringValue: '2bbl'
    },
    {
      numericValue: '4',
      stringValue: 'spdi'
    },
  ]

  selectForDriveWheel: ISelect[] = [
    {
      numericValue: "1",
      stringValue: 'Передний'
    },
    {
      numericValue: '2',
      stringValue: 'Задний'
    },
    {
      numericValue: '3',
      stringValue: 'Полный'
    },
  ]

  dataForPredict = null;

  response = null;
  accuracy = null;

  constructor(private fb: FormBuilder, private ps: PredictionService) {
    this.form = this.fb.group({
      highwaympg: [null],
      citympg: [null],
      carName: [null],
      enginelocation: [null],
      fuelsystem: [null],
      boreratio: [null],
      wheelbase: [null],
      drivewheel: [null],
      carlength: [null],
      carwidth: [null],
      horsepower: [null],
      curbweight: [null],
      enginesize: [null],
    })
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.dataForPredict = value;
      }
    })
  }

  sendData(): void {
    this.ps.predict(this.dataForPredict).subscribe((response) => {
      this.response = response[0];
      this.accuracy = response[1];
    })
  }
}
