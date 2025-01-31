import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Car, CarService } from './services/car.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { CalculateTimeComponent } from './calculate-time/calculate-time.component';

@Component({
  selector: 'app-root',
  imports: [MatIconModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cars: Car[] = [];
  distance: number = 0;
  time?: number;

  constructor(private carService: CarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCars();
  }

  // Charger la liste des voitures
  loadCars(): void {
    this.carService.getCars().subscribe((data: any) => {
      this.cars = data.member;
    });
  }


  // Supprimer une voiture
  deleteCar(id: any): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.loadCars();
    });
  }


  objectKeys(obj: any) {
    return Object.keys(obj);
  }

  addCar() {
    const dialogRef = this.dialog.open(CarDialogComponent);

    dialogRef.afterClosed().subscribe(car => {
      if (car) {
        if(car.characteristic)
        car.characteristic = Object.fromEntries(car.characteristic.map((entry:any) => [entry.key, entry.value]))
        this.carService.addCar(car).subscribe(() => {
          this.loadCars();
        });
      }
    });
  }
  editCar(car:any) {
    const dialogRef = this.dialog.open(CarDialogComponent,{
      data: car
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result) {
        result['@id']=car['@id'];
        if(result.characteristic)
          result.characteristic = Object.fromEntries(result.characteristic.map((entry:any) => [entry.key, entry.value]))
          this.carService.editCar(car.id, result).subscribe(() => {
            this.loadCars();
          });
      }
    });
  }

  calculateTime() {
  this.dialog.open(CalculateTimeComponent);

  }
}
