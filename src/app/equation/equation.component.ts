import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondesParSolution = 0;
  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(500),
        scan(
          (acc) => {
            return {
              numberSolved: acc.numberSolved + 1,
              startTime: acc.startTime,
            };
          },
          { startTime: new Date(), numberSolved: 0 }
        )
      )
      .subscribe(({numberSolved,startTime}) => {
        this.secondesParSolution =
          (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );
  get a() {
    return this.mathForm.value.a;
  }
  get b() {
    return this.mathForm.value.b;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
