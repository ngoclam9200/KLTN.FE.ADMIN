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
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.css']
})
export class GeneralStatisticsComponent implements OnInit {

  constructor(private statisticService: StatisticService) { }
  allCountNewCustomer:any
  allCountProductByCategory:any
  allCountProductSoldByCategory:any
  listMonth:any=[];
  backgroundColor:any=[]
  listCategoryName:any=[];
  listCountProductByCategory:any=[]
  listCountProductSoldByCategory:any=[]
  listCountNewCustomer:any=[];
  ngOnInit(): void {
 
   this.chartCategory()
   this.chartCustomer()
   this.chartProduct()
  
  }
  chartCustomer()
  {
    this.statisticService.getCountNewCustomer().subscribe(res=>{
      this.allCountNewCustomer=res
 
      this.allCountNewCustomer=this.allCountNewCustomer.data
      for(let i=0;i<this.allCountNewCustomer.length;i++)
      {
        this.listMonth.push(this.allCountNewCustomer[i].monthyear)
        this.listCountNewCustomer.push(this.allCountNewCustomer[i].total)
      
      }
      this.listMonth=this.listMonth.reverse()
      this.listCountNewCustomer=this.listCountNewCustomer.reverse()
      const myChartCustomer = new Chart("myChartCustomer", {
        type: 'bar',
        data: {
          labels: this.listMonth,
          datasets: [{
            label: 'Số lượng khách hàng',
            data:this.listCountNewCustomer,
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
                font : {size:18}
                
              },
              
            },
            
            y: {
              beginAtZero: true,
              ticks :{
                stepSize: 1
              }
            }
          }
        }
      });
    })
   
  }
  chartCategory() {
   this.statisticService.getCountProdByCategory().subscribe(res=>{
 
    this.allCountProductByCategory=res
    this.allCountProductByCategory=this.allCountProductByCategory.data
    for(let i=0;i<this.allCountProductByCategory.length;i++)
    {
      this.listCategoryName.push(this.allCountProductByCategory[i].categoryName)
      this.listCountProductByCategory.push(this.allCountProductByCategory[i].count)
      this.backgroundColor.push("rgb"+ "("+ (Math.floor(Math.random() * 256).toString())+"," + (Math.floor(Math.random() * 256).toString())+"," +(Math.floor(Math.random() * 256).toString())+")")
    }
 
    
    this.listCategoryName=this.listCategoryName.reverse()
    this.listCountProductByCategory=this.listCountProductByCategory.reverse()
    const myChartCategory= new Chart("myChartCategory", {
      type: 'pie',
      data: {
        labels:  this.listCategoryName,
        datasets: [{
          label: 'My First Dataset',
          data: this.listCountProductByCategory,
          backgroundColor: this.backgroundColor,
          hoverOffset: 4
        }]
      },
     
     
    });
   })
  
  }
  chartProduct() {
   this.statisticService.getCountProdSoldByCategory().subscribe(res=>{
    this.allCountProductSoldByCategory=res
 
    
    this.allCountProductSoldByCategory=this.allCountProductSoldByCategory.data
    for(let i=0;i<this.allCountProductSoldByCategory.length;i++)
    {
    
      this.listCountProductSoldByCategory.push(this.allCountProductSoldByCategory[i].count)
     }
  
    
     
    this.listCountProductSoldByCategory=this.listCountProductSoldByCategory.reverse()
    const myChartProduct= new Chart("myChartProduct", {
      type: 'doughnut',
      data: {
        labels:  this.listCategoryName,
        datasets: [{
          label: 'My First Dataset',
          data: this.listCountProductSoldByCategory,
          backgroundColor: this.backgroundColor,
          hoverOffset: 4
        }]
      },
     
     
    });
   })
    
  }

}
