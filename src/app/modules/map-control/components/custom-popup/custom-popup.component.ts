import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Widget } from '../../models/widget';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'app-custom-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-popup.component.html',
})
export class CustomPopupComponent {
  @Input() widget: Widget;

  editableTemp: boolean = false;
  editableHumidity: boolean = false;
  newTemp: number = 0;
  newHumidity: number = 0;

  constructor(private widgetService: WidgetService) {}

  changeTemp() {
    this.editableTemp = true;
  }

  saveTemp() {
    this.widgetService.saveTemp(this.widget.id, this.newTemp);
    this.editableTemp = false;
    this.newTemp = 0;
  }

  changeHumidity() {
    this.editableHumidity = true;
  }

  saveHumidity() {
    this.widgetService.saveHumidity(this.widget.id, this.newHumidity);
    this.editableTemp = false;
    this.newTemp = 0;
  }

  cancel() {
    this.editableTemp = false;
    this.editableHumidity = false;
    this.newTemp = 0;
    this.newHumidity = 0;
  }
}
