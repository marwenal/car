import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-car-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './car-dialog.component.html',
  styleUrl: './car-dialog.component.css'
})
export class CarDialogComponent {

  carForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.characteristic)
      data.characteristic = Object.keys(data?.characteristic).map(key => ({
        key,
        value: data?.characteristic[key]
      }));
    this.carForm = this.fb.group({
      model: [data?.model, Validators.required],
      kmh: [data?.kmh, Validators.required],
      characteristic: this.fb.array(data?.characteristic ? data?.characteristic.map((entry: any) => 
        this.fb.group({
        key: [entry.key, Validators.required],
        value: [entry.value, Validators.required]
      })
    ):[])
    });
  }

  onSave(): void {
    if (this.carForm.valid) {
      this.dialogRef.close(this.carForm.value); // Fermer le modal et renvoyer les données
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  get characteristic() {
    return this.carForm.get('characteristic') as FormArray;
  }

  // Ajouter une nouvelle paire clé-valeur à characteristic
  addCharacteristicField() {
    const characteristicGroup = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.characteristic.push(characteristicGroup);
  }

  // Supprimer une paire clé-valeur de characteristic
  removeCharacteristicField(index: number) {
    this.characteristic.removeAt(index);
  }
}
