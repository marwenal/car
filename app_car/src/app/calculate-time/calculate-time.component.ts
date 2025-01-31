import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calculate-time',
  imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      ReactiveFormsModule
    ],
  templateUrl: './calculate-time.component.html',
  styleUrls: ['./calculate-time.component.css']
})
export class CalculateTimeComponent implements OnInit {
  timeForm!: FormGroup;
  calculatedTime: number | null = null;
  errorMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CalculateTimeComponent>,
    private fb: FormBuilder,
    private carService: CarService // Votre service qui appelle l'API
  ) {}

  ngOnInit() {
    this.timeForm = this.fb.group({
      distance: ['', [Validators.required, Validators.min(0)]],
      model: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.timeForm.valid) {
      const { distance, model } = this.timeForm.value;
      this.carService.calculateTime(distance, model).subscribe(
        {
          next: (v:any) => {
          this.calculatedTime = v.estimated_time_hours;
          this.errorMessage = null;
          },
          error: (e) => {
          this.calculatedTime = null;
          this.errorMessage = 'Une erreur est survenue lors du calcul du temps. Veuillez réessayer.';
          }
      }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
