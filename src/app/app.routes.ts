import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/map-control/map-control.module').then(
        (m) => m.MapControlModule
      ),
  },
];
