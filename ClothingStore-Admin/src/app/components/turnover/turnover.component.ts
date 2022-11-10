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
  allCostVoucher:any;
  allCountDelivered:any
  allCountCancel:any
  allCountOrder:any
  listMonth:any=[];
  listTurnOver:any=[];
  listCostSalary:any=[];
  listCostProduct:any=[]
  listCostVoucher:any=[]
  listCountDelivered:any=[]
  listCountCancel:any=[]
  constructor(private statisticService: StatisticService) { }

  ngOnInit(): void {
    this.chartTurnOver()
  
  
    this.chartCost()
    this.chartVoucher()
    this.chartCountOrderDelivered()
    this.chartCountOrderCancle()
    this.chartCountOrder()
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
   
      const myChartTurnOver = new Chart("myChartTurnOver", {
        type: 'line',
        data: {
          labels:  this.listMonth,
          datasets: [{
            label: 'Doanh thu',
            data: this.listTurnOver,
            fill: false,
            borderColor: '#aaffff',
            tension: 0.03,
          },
          
          
         
        ],
        },
        
        options: {
  
          scales: {
            x: {
              title: {
                display: true,
                text: "Doanh thu qua từng tháng",
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
              tension: 0.03,
              backgroundColor:"blue",
            },
            {
              label: 'Nhập sản phẩm',
              data: this.listCostProduct,
              fill: false,
              borderColor: 'yellow',
              tension: 0.03,
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
  chartVoucher() {
    this.statisticService.getCostVoucher().subscribe(res=>{
      this.allCostVoucher=res
 
      this.allCostVoucher=this.allCostVoucher.data
      for(let i=0;i<this.allCostVoucher.length;i++)
      {
         
        this.listCostVoucher.push(this.allCostVoucher[i].total)
      
      }
     

        
        this.listCostVoucher=this.listCostVoucher.reverse()
    
        const myChartVoucher = new Chart("myChartVoucher", {
          type: 'line',
          data: {
            labels:this.listMonth,
            datasets: [
          
            {
              label: 'Voucher',
              data: this.listCostVoucher,
              fill: false,
              borderColor: '#00bf00',
              tension: 0.05,
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
     
     
      
  
    
  }
  chartCountOrderDelivered() {
    this.statisticService.getCountDelivered().subscribe(res=>{
      this.allCountDelivered=res
      
      this.allCountDelivered=this.allCountDelivered.data
    
      for(let i=0;i<this.allCountDelivered.length;i++)
      {
     
        this.listCountDelivered.push(this.allCountDelivered[i].count)
      
      }
       
      this.listCountDelivered=this.listCountDelivered.reverse()
      const myChartCountOrderDelivered = new Chart("myChartCountOrderDelivered", {
        type: 'bar',
        data: {
          labels: this.listMonth,
          datasets: [{
            label: 'Số đơn hàng',
            data: this.listCountDelivered,
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
    })
 
  }
  chartCountOrderCancle() {
    this.statisticService.getCountCancle().subscribe(res=>{
      this.allCountCancel=res

     
      
      this.allCountCancel=this.allCountCancel.data
 
      for(let i=0;i<this.allCountCancel.length;i++)
      {
     
        this.listCountCancel.push(this.allCountCancel[i].count)
      
      }
 
       
      this.listCountCancel=this.listCountCancel.reverse()
      const myChartCountOrderCancel = new Chart("myChartCountOrderCancel", {
        type: 'bar',
        data: {
          labels: this.listMonth,
          datasets: [{
            label: 'Số đơn hàng',
            data: this.listCountCancel,
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
    })
  }
  chartCountOrder() {
   this.statisticService.getAllCountOrder().subscribe(res=>{
 
    this.allCountOrder=res
    this.allCountOrder=this.allCountOrder.data
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
          data: this.allCountOrder,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(0,128,0)',
            'rgb(255,0,0)'
          ],
          hoverOffset: 4
        }]
      },
     
     
    });
   })
   
  }

}
