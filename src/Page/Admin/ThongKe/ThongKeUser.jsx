import React from 'react'
import Highcharts from 'highcharts'
import axios from 'axios'
import HomeAdmin from '../HomeAdmin/HomeAdmin';

export default function ThongKeUser() {
    if(JSON.stringify(localStorage.getItem("TOKENADMIN")) === "null"){
        window.location.href = "/admin/login";
    }
    else{
        async function getAPI() {
            const x = [];
            const y = [];
            try{
                const thongke = await axios
                .get(`https://oka1kh.azurewebsites.net/api/countalluser`)
                .then((res) => res.data)
                .catch((err) => err);
    
                
                console.log("Thống kê: ", thongke);
                for(var i = 0; i < thongke.count.length; i++){
                    x.push(thongke.count[i].dateCreate);
                    y.push(thongke.count[i].NumberOfUser);
                }
    
                console.log("x: ", x);
                console.log("y: ", y);
            }
            catch{
            }
    
            const chart = Highcharts.chart('container', {
                chart: {
                    type: 'line',
                },
                title: {
                    text: 'Thống kê số lượng người dùng đăng ký tài khoản mỗi ngày'
                },
                xAxis: {
                    categories: x
                },
                yAxis: {
                    title: {
                        text: 'Số lượng'
                    }
                },
                series: [{
                    name: "Số lượng",
                    data: y
                }]
            });        
        }
        document.addEventListener('DOMContentLoaded', function () { 
             getAPI();              
        });
    }  

    return (
        <div style={{display: "flex"}}>
            <HomeAdmin />
            <div id="container" style={{width:"1000px", height:"400px"}}></div>
            
            
        </div>
        
    )
}