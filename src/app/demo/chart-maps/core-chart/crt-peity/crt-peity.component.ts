// angular import
import { Component, OnInit } from '@angular/core';

// third party
// eslint-disable-next-line
declare let $: any;
import 'peity';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-crt-peity',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './crt-peity.component.html',
  styleUrls: ['./crt-peity.component.scss']
})
export default class CrtPeityComponent implements OnInit {
  // life cycle event
  ngOnInit() {
    setTimeout(() => {
      $('.bar-colours-1').peity('bar', {
        fill: ['rgba(79, 195, 247, 0.65)', 'rgba(51, 219, 158, 0.65)'],
        width: '100%',
        height: '150px'
      });
      $('.bar-colours-2').peity('bar', {
        fill: ['rgba(79, 195, 247, 0.65)', 'rgba(240, 70, 107, 0.65)'],
        width: '100%',
        height: '150px'
      });

      const updatingChart = $('.updating-chart').peity('line', {
        fill: 'rgba(240, 70, 107, 0.4)',
        stroke: 'rgb(240, 70, 107)',
        width: '100%',
        height: '150px'
      });
      $('.updating-chart1').peity('line', {
        fill: 'rgba(51, 219, 158, 0.32)',
        stroke: 'rgba(51, 219, 158, 0.90)',
        width: '100%',
        height: '150px'
      });
      $('.updating-chart2').peity('line', {
        fill: 'rgba(79, 195, 247, 0.45)',
        stroke: 'rgba(79, 195, 247, 0.91)',
        width: '100%',
        height: '150px'
      });
      $('.updating-chart3').peity('line', {
        fill: 'rgba(255, 138, 101, 0.39)',
        stroke: 'rgba(255, 138, 101, 0.94)',
        width: '100%',
        height: '150px'
      });

      setInterval(() => {
        const random = Math.round(Math.random() * 10);
        const values = updatingChart.text().split(',');
        values.shift();
        values.push(random);

        updatingChart.text(values.join(',')).change();
      }, 1000);

      $('.data-attributes span').peity('donut');

      $('span.pie_1').peity('pie', {
        fill: ['#f0466b', '#4fc3f7'],
        width: '16px',
        height: '16px'
      });
      $('span.pie_2').peity('pie', {
        fill: ['#ff8a65', '#33db9e'],
        width: '16px',
        height: '16px'
      });
      $('span.pie_3').peity('pie', {
        fill: ['#4fc3f7', '#536dfe'],
        width: '16px',
        height: '16px'
      });
      $('span.pie_4').peity('pie', {
        fill: ['#33db9e', '#f0466b'],
        width: '16px',
        height: '16px'
      });
      $('span.pie_5').peity('pie', {
        fill: ['#ff8a65', '#4fc3f7'],
        width: '16px',
        height: '16px'
      });
      $('span.pie_6').peity('pie', {
        fill: ['#f0466b', '#536dfe'],
        width: '16px',
        height: '16px'
      });
      $('span.pie_7').peity('pie', {
        fill: ['#33db9e', '#ff8a65'],
        width: '16px',
        height: '16px'
      });
    });
  }
}
