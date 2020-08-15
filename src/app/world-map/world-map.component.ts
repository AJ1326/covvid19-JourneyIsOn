import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare const myTest: any;
declare const updateCountryName: any;
import { environment } from '@env/environment';
import { NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {
  version: string | null = environment.version;
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.openWorldMap();
  }

  public openWorldMap() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    myTest();
  }
}
