import { Component, OnInit } from '@angular/core';
 
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);
@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
   this.chartCategory()
   this.chartCustomer()
   this.chartProduct()
  
  }
  chartCustomer()
  {
    const myChartCustomer = new Chart("myChartCustomer", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange','Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange' ],
        datasets: [{
          label: 'Số lượng khách hàng',
          data: [12, 19, 3, 5, 2, 3,3,5,6,26,4,6,7,17],
          backgroundColor: [
            "#aaffff"
          ],
          borderColor: [
            "#1890ff",
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Số khách hàng mới qua từng tháng",
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  chartCategory() {
   
    const myChartCategory= new Chart("myChartCategory", {
      type: 'pie',
      data: {
        labels: [
          'a',
          'b',
          'c',
          'd',
          
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100, 200],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 195, 56)'
          ],
          hoverOffset: 4
        }]
      },
     
     
    });
  }
  chartProduct() {
   
    const myChartProduct= new Chart("myChartProduct", {
      type: 'doughnut',
      data: {
        labels: [
          'a',
          'b',
          'c',
          'd',
          
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100, 200],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 195, 56)'
          ],
          hoverOffset: 4
        }]
      },
     
     
    });
  }

}
