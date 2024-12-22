import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { CustomPopupComponent } from '../components/custom-popup/custom-popup.component';
import { WidgetComponent } from '../components/widget/widget.component';
import { Bonds } from '../models/bounds';
import { Widget } from '../models/widget';
import { WidgetService } from '../services/widget.service';

@Component({
  selector: 'map-control',
  imports: [WidgetComponent, FormsModule],
  templateUrl: './map-control.component.html',
})
export class MapControlComponent implements OnInit {
  map: any;
  turkeyBounds: Bonds = {
    minLat: 35.808,
    maxLat: 42.107,
    minLng: 26.055,
    maxLng: 44.794,
  };
  coordinates: L.LatLng[] = [];
  icon: L.Icon = L.icon({
    iconUrl: '/img/marker.png',
    iconSize: [81, 101],
    iconAnchor: [40.5, 101],
  });

  widgets: Widget[] = [];
  historyWidgets: Widget[] = [];
  searchText: string = '';

  constructor(
    private widgetService: WidgetService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    this.initializeMap();
    this.getCoordinates(this.turkeyBounds);
    this.renderCoordinates();
    [this.widgets, this.historyWidgets] = this.widgetService.generateWidgets(
      this.coordinates
    );
  }

  search(searchText: string) {
    if (searchText && searchText !== '') {
      this.widgets = this.historyWidgets.filter((widget: Widget) =>
        widget.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      this.widgets = this.historyWidgets;
    }
  }

  onClick(clickedWidget: Widget) {
    if (clickedWidget.isActive) {
      clickedWidget.isActive = !clickedWidget.isActive;
      const popup = L.popup()
        .setLatLng(clickedWidget.coordinate)
        .setContent('Bu bir popup')
        .openOn(this.map);

      popup.close();
    } else {
      this.historyWidgets.forEach((widget) => {
        widget.isActive = false;

        const popup = L.popup()
          .setLatLng(widget.coordinate)
          .setContent('Bu bir popup')
          .openOn(this.map);

        popup.close();
      });
      this.map.closePopup();
      clickedWidget.isActive = !clickedWidget.isActive;
      this.openPopup(clickedWidget.coordinate);
    }
  }

  private initializeMap(): void {
    const mapCenter: L.LatLngExpression = [39.92077, 32.85411];
    const zoomLevel = 6;

    this.map = L.map('map').setView(mapCenter, zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
  }

  private getCoordinates(bonds: Bonds) {
    for (let i = 0; i < 8; i++) {
      this.coordinates.push(this.createCoordinate(bonds));
    }
  }

  private createCoordinate(bounds: Bonds): L.LatLng {
    return {
      lat: Math.random() * (bounds.maxLat - bounds.minLat) + bounds.minLat,
      lng: Math.random() * (bounds.maxLng - bounds.minLng) + bounds.minLng,
    } as L.LatLng;
  }

  private renderCoordinates() {
    this.coordinates.forEach((coordinate) => {
      L.marker(coordinate, {
        icon: this.icon,
        zIndexOffset: 2147483647,
      })
        .on('click', (event) => this.openPopup(event.latlng))
        .addTo(this.map);
    });
  }

  private openPopup(coordinate: L.LatLng) {
    const factory = this.resolver.resolveComponentFactory(CustomPopupComponent);
    const componentRef = factory.create(this.injector);

    componentRef.instance.widget = this.historyWidgets.find(
      (widget) => widget.coordinate.lat === coordinate.lat
    )!;

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    this.historyWidgets.forEach((widget) => {
      if (
        widget.coordinate.lat === coordinate.lat &&
        widget.coordinate.lng === coordinate.lng
      ) {
        widget.isActive = true;
      }
    });

    const popup = L.popup()
      .setLatLng(coordinate)
      .setContent(domElem)
      .openOn(this.map);

    popup.on('remove', () => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      this.historyWidgets.forEach((widget) => {
        widget.isActive = false;
      });
    });
  }
}
