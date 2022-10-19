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
import { StatisticService } from 'src/app/services/statistic.service';

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
  selector: 'app-turnover',
  templateUrl: './turnover.component.html',
  styleUrls: ['./turnover.component.css']
})
export class TurnoverComponent implements OnInit {
  displayedColumns: string[] = [ 'turnover', 'cost','profit'];
  allTurnOver:any;
  allCostSalary:any;
  allCostProduct:any;
  listMonth:any=[];
  listTurnOver:any=[];
  listCostSalary:any=[];
  listCostProduct:any=[]
  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.chartTurnOver()
    this.chartCountOrderDelivered()
    this.chartCountOrderCancle()
    this.chartCountOrder()
    this.chartCost()
  }
  
  chartTurnOver() {
    this.statisticService.getTurnOver().subscribe(res=>{
      this.allTurnOver=res
      this.allTurnOver=this.allTurnOver.data
    
      for(let i=0;i<this.allTurnOver.length;i++)
      {
        this.listMonth.push(this.allTurnOver[i].monthyear)
        this.listTurnOver.push(this.allTurnOver[i].total)
      
      }
      this.listMonth=this.listMonth.reverse()
      this.listTurnOver=this.listTurnOver.reverse()
      console.log(this.listMonth)
      console.log(this.listTurnOver)
      const myChartTurnOver = new Chart("myChartTurnOver", {
        type: 'line',
        data: {
          labels:  this.listMonth,
          datasets: [{
            label: 'Doanh thu',
            data: this.listTurnOver,
            fill: false,
            borderColor: '#aaffff',
            tension: 0.05,
          },
          {
            label: 'Lợi nhuận',
            data: [6, 4, 54, 15, 7, 8, 8, 15, 16, 18, 15, 16],
            fill: false,
            borderColor: '#00bf00',
            tension: 0.05,
          },
          {
            label: 'Chi phí phải trả',
            data: [1,2,3,4,5,6,7,8,9,10,11,12],
            fill: false,
            borderColor: '#ff5656',
            tension: 0.05,
          }
         
        ],
        },
        
        options: {
  
          scales: {
            x: {
              title: {
                display: true,
                text: "Doanh thu - chi phí - lợi nhuận qua từng tháng",
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    
  }
  chartCost() {
    this.statisticService.getCostSalary().subscribe(res=>{
      this.allCostSalary=res
      this.allCostSalary=this.allCostSalary.data
      for(let i=0;i<this.allCostSalary.length;i++)
      {
         
        this.listCostSalary.push(this.allCostSalary[i].total)
      
      }
      this.statisticService.getCostProduct().subscribe(res=>{
        this.allCostProduct=res
        this.allCostProduct=this.allCostProduct.data
        for(let i=0;i<this.allCostProduct.length;i++)
        {
           
          this.listCostProduct.push(this.allCostProduct[i].total)
        
        }

        
        this.listCostSalary=this.listCostSalary.reverse()
        this.listCostProduct=this.listCostProduct.reverse()
        const myChartCost = new Chart("myChartCost", {
          type: 'line',
          data: {
            labels: this.listMonth,
            datasets: [{
              label: 'Lương nhân viên',
              data:  this.listCostSalary,
              fill: false,
              borderColor: 'blue',
              tension: 0.05,
              backgroundColor:"blue",
            },
            {
              label: 'Nhập sản phẩm',
              data: this.listCostProduct,
              fill: false,
              borderColor: 'yellow',
              tension: 0.05,
              backgroundColor:"yellow",
            },
             
    
             
           
          ],
          },
          
          options: {
    
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Chi phí từng tháng",
                }
              },
              y: {
                beginAtZero: true
              }
            }
          }
        });
      })
     
     
      
    
    })
    
  }
  chartCountOrderDelivered() {
    const myChartCountOrderDelivered = new Chart("myChartCountOrderDelivered", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Số đơn hàng',
          data: [12, 19, 3, 5, 2, 3, 3, 5, 6, 26, 4, 6, 7, 17],
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
              text: "Số đơn hàng đã giao qua từng tháng",
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  chartCountOrderCancle() {
    const myChartCountOrderCancle = new Chart("myChartCountOrderCancle", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Số đơn hàng',
          data: [12, 19, 3, 5, 2, 3, 3, 5, 6, 26, 4, 6, 7, 17],
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
              text: "Số đơn hàng đã hủy qua từng tháng",
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  chartCountOrder() {
   
    const myChartCountOrder = new Chart("myChartCountOrder", {
      type: 'doughnut',
      data: {
        labels: [
          'Chờ xác nhận',
          'Đang giao',
          'Đã giao',
          'Đã hủy',
          
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
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
