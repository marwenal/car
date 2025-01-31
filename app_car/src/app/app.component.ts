import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Car, CarService } from './services/car.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CarDialogComponent } from './car-dialog/car-dialog.component';
import { CalculateTimeComponent } from './calculate-time/calculate-time.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-root',
  imports: [MatIconModule, CommonModule, MatChipsModule, MatPaginatorModule, MatTableModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cars: Car[] = [];
  distance: number = 0;
  time?: number;
  displayedColumns: string[] = ['id', 'model', 'kmh', 'characteristic', 'actions'];
  dataSource = new MatTableDataSource<Car>(this.cars);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private carService: CarService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCars();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCars(): void {
    this.carService.getCars().subscribe((data: any) => {
      this.cars = data.member;
    });
  }


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
          this.snackBar.open('Voiture crée avec succès !', 'Fermer', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
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
            this.snackBar.open('Voiture modifiée avec succès !', 'Fermer', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
          });
      }
    });
  }

  calculateTime() {
  this.dialog.open(CalculateTimeComponent);

  }
}
