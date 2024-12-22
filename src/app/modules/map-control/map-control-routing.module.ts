import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapControlComponent } from './page/map-control.component';

const routes: Routes = [
  { path: '', redirectTo: '/map-control', pathMatch: 'full' },
  { path: 'map-control', component: MapControlComponent },
  { path: '**', redirectTo: '/map-control', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapControlRoutingModule {}
