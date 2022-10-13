import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaryStaffService } from 'src/app/services/salary-staff.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-salary-staff',
  templateUrl: './salary-staff.component.html',
  styleUrls: ['./salary-staff.component.css']
})
export class SalaryStaffComponent implements OnInit {

  constructor(private salaryStaffService: SalaryStaffService, private route: ActivatedRoute) {

  }
  dateofmonth: any[] = []
  dateoflastmonth: any[] = []
  dateofnextmonth: any[] = []
  dataRes: any;
  listDayWorking: any[] = []
  currentDay = moment().format('L')
  payForToday:boolean=false
  ngOnInit(): void {
    this.getData()
  }
  PayForToday()
  {
    const data={
      id: this.dataRes.id,
      listDayWorking: new Date(this.currentDay).getDate().toString()
    }
    Swal.fire({
      title: 'Bạn có chắc chắn muốn tính?',
      text: "Lương ngày hôm nay sẽ được tính , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tính lương!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryStaffService.PayForToday(data).subscribe(res => {
          Swal.fire(
            'Đã tính!',
            'Lương ngày'+ this.currentDay + ' này đã được tính.',
            'success'
          )
          this.getData()
        })

      }
    })
  

  
  }
  getData() {
    let id = this.route.snapshot.params.id;
    this.salaryStaffService.getSalaryByStaffId(id).subscribe(res => {

      this.dataRes = res
      this.dataRes = this.dataRes.data[0]
       this.listDayWorking = this.dataRes.listDayWorking.split(',')
      for (let i = 1; i < this.listDayWorking.length; i++) {
        if(this.listDayWorking[i]==new Date(this.currentDay).getDate().toString()) 
        {
          this.payForToday=true
          break;
        }
      }
      let year = new Date().getFullYear()
      let month = new Date().getMonth()
      let endDate = new Date(moment().endOf('month').format()).getDate()
      var startDay = new Date(moment().startOf('month').format()).getUTCDay()
      var endDay = new Date(moment().endOf('month').format()).getUTCDay()

      for (let i = 1; i <= endDate; i++) {
        var obj = { class: "", value: i.toString() }
        this.dateofmonth.push(obj)
      }

      if (startDay > 0) {
        var dateofLastMonth = new Date(moment([year, month - 1]).endOf('month').format()).getDate();

        if (this.dateoflastmonth.length < 7) {
          var start = 1
          for (let i = startDay; i < 7; i++) {
            var obj = { class: "", value: start.toString() }
            this.dateoflastmonth.push(obj)
            start = start + 1
          }
          for (let i = 0; i < this.listDayWorking.length; i++) {
            for (let j = 0; j < this.dateoflastmonth.length; j++) {
              if (this.listDayWorking[i] == this.dateoflastmonth[j].value) this.dateoflastmonth[j].class = "text-danger bold "
            }
          }
        }
        for (let i = 0; i < startDay; i++) {
          var obj = { class: "prev-month", value: dateofLastMonth.toString() }
          this.dateoflastmonth.unshift(obj)
          dateofLastMonth = dateofLastMonth - 1
        }






      }

      if (endDay < 7) {
        for (let i = 1; i <= 7 - endDay; i++) {
          var obj = { class: "next-month", value: i.toString() }
          this.dateofnextmonth.push(obj)

        }
        var end = endDate
        for (let i = 1; i <= endDay; i++) {
          var obj = { class: "", value: end.toString() }

          this.dateofnextmonth.unshift(obj)
          end--
        }
        for (let i = 0; i < this.listDayWorking.length; i++) {
          for (let j = 0; j < this.dateofnextmonth.length; j++) {
            if (this.listDayWorking[i] == this.dateofnextmonth[j].value && this.dateofnextmonth[j].class == "") this.dateofnextmonth[j].class = "text-danger bold"
          }
        }

      }
      this.dateofmonth = this.dateofmonth.slice(7 - startDay, endDate - endDay)
      for (let i = 0; i < this.listDayWorking.length; i++) {
        for (let j = 0; j < this.dateofmonth.length; j++) {
          if (this.listDayWorking[i] == this.dateofmonth[j].value) this.dateofmonth[j].class = "text-danger bold "
        }
      }



    })

  }
  PayForMonth()
  {
    const data={
      id: this.dataRes.id,
      
    }
     
    Swal.fire({
      title: 'Bạn có chắc chắn muốn tính?',
      text: "Lương tháng này sẽ được tính , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tính lương!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryStaffService.PayForMonth(data).subscribe(res => {

          Swal.fire(
            'Đã tính!',
            'Lương tháng'+ new Date().getMonth+1 + ' này đã được tính.',
            'success'
          )
          this.getData()
        })

      }
    })
  

  
  }

}
