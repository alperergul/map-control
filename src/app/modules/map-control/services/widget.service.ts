import { Injectable } from '@angular/core';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetNames = [
    'Yatak Odası',
    'Salon',
    'Çalışma Odası',
    'Giriş',
    'Mutfak',
    '1 Nolu Kapı',
    '2 Nolu Kapı',
    'Balkon',
  ];

  private widgets: Widget[] = [];
  private historyWidgets: Widget[] = [];

  constructor() {}

  get names() {
    return this.widgetNames;
  }

  public generateWidgets(coordinates: L.LatLng[]) {
    for (let i = 0; i < 8; i++) {
      let widget: Widget = {
        id: i,
        isActive: false,
        coordinate: coordinates[i],
        name: this.widgetNames[i],
        temp: Math.floor(Math.random() * (30 - -5 + 1)) + -5,
        humidity: Math.floor(Math.random() * 100),
        date: this.randomDate(),
        battery: Math.floor(Math.random() * 3),
      };

      this.widgets.push(widget);
      this.historyWidgets.push(widget);
    }

    return [this.widgets, this.historyWidgets];
  }

  public saveTemp(widgetId: number, temp: number) {
    this.widgets.filter((widget) => widget.id === widgetId)[0].temp = temp;
  }

  public saveHumidity(widgetId: number, humidity: number) {
    this.widgets.filter((widget) => widget.id === widgetId)[0].humidity =
      humidity;
  }

  private randomDate() {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const randomTime =
      Math.random() * (now.getTime() - yesterday.getTime()) +
      yesterday.getTime();
    return new Date(randomTime);
  }
}
