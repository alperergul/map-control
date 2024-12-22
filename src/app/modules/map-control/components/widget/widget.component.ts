import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Widget } from '../../models/widget';

@Component({
  selector: 'widget',
  imports: [DatePipe, CommonModule],
  templateUrl: './widget.component.html',
  providers: [],
})
export class WidgetComponent {
  @Input({ required: true }) widget: Widget;
  @Output() onClick: EventEmitter<Widget> = new EventEmitter();
  constructor() {}

  clickedWidget(widget: Widget) {
    this.onClick.emit(widget);
  }
}
