import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatDividerModule, MatExpansionModule, MatPaginatorModule, MatProgressSpinnerModule, MatSidenavModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule
  ]
})
export class MaterialModule { }
