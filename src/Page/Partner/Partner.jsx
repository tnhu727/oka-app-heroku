import React from 'react';
import './Partner.scss';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Partner(){

    const LSDatXe = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKENPARTNER")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const partnerId = laythongtin.data.rolePartner[0].partnerId;
            console.log("partner id: ", partnerId);

            const LSDatXe = await axios
            .get(`http://108.160.134.9:3301/bill/saler/${partnerId}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("LSDatXe: ", LSDatXe);
            console.log("1: ", LSDatXe.result[0]);

            document.getElementById("LSGD_Partner_tr").innerHTML = "";
            document.getElementById("formSelect").style.display = "none";
            if(LSDatXe.result.length === 0){
                document.getElementById("LSDG_Partner_title").innerHTML = "Chưa có dữ liệu partner đặt xe cho tài khoản này";
            }
            else{
                if(LSDatXe.status === "SUCCESS"){ 
                    document.getElementById("LSDG_Partner_title").innerHTML = "Partner đặt xe";
                    document.getElementById("LSGD_Partner_tr").innerHTML = 
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã phiếu đặt</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Địa chỉ</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên xe</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Vị trí</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã người cho thuê</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã người dùng</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày bắt đầu</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày kết thúc</td>"  +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tổng tiền</td>"  +
                    "</tr>" ;
                    for(let i = 0; i < LSDatXe.result.length; i++)
                    {
                        document.getElementById("LSGD_Partner_tr").innerHTML +=
                        "<tr>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].idBill + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].address + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].name + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].quantity + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].id_saler + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].idUser + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].startDate + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].endDate + "</td>" +
                            "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].total + "</td>" +
                        "</tr>";
                    }
                }
           
            }
            
            // LSDatXe.result.forEach(element => {
            //     document.getElementById("LSDG_tr").innerHTML +=
            //     "<tr>" +
            //     "<td>" + element.id + "</td>" +
            //     "<td>" + element.idUser + "</td>" +
            //     "<td>" + element.id_saler + "</td>" +
            //     "<td>" + element.status + "</td>" +
            //     "<td>" + element.total + "</td>" +
            //     "</tr>";
            // });
    
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    const BietThu = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKENPARTNER")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const partnerId = laythongtin.data.rolePartner[0].partnerId;
            console.log("partner id: ", partnerId);

            const BietThu = await axios
            .get(`https://cnpmnc-noiluutru.herokuapp.com/api/export/partner/bookInfo?id=${partnerId}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("BietThu: ", BietThu);
            document.getElementById("LSGD_Partner_tr").innerHTML = "";
            document.getElementById("formSelect").style.display = "none";

            if(BietThu.length === 0){
                document.getElementById("LSDG_Partner_title").innerHTML = "Chưa có dữ liệu partner biệt thự cho tài khoản này";
            }
            else{
                document.getElementById("LSDG_Partner_title").innerHTML = "Partner biệt thự";
                document.getElementById("LSGD_Partner_tr").innerHTML = 
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã phiếu</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã khách hàng</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên nơi lưu trữ</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Địa chỉ</td>" +                    
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Số lượng phòng</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày thuê</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày trả</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giá thuê</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã voucher</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tổng tiền</td>" +
                    "</tr>" ;
                for(let i = 0; i < BietThu.length; i++)
                {
                    document.getElementById("LSGD_Partner_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].order_id + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].khach_id + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ten_noiluutru + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].diachi_noiluutru + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].soluong_phong + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ngayden_datphong + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ngaydi_datphong + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].gia_phong + "</td>" +   
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].voucher_id + "</td>" +                
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].tongtien_datphong + "</td>" +
                    "</tr>";
                }  
            }  
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    const DuaDonSanBay = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKENPARTNER")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const partnerId = laythongtin.data.rolePartner[0].partnerId;
            console.log("partner id: ", partnerId);

            const Month = document.getElementById("selectMonth").value;
            const Year = document.getElementById("selectYear").value; 
            
            const DuaDonSanBay = await axios
            .get(`http://13.229.200.21:3000/api/booking/admin/report?month=${Month}&year=${Year}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("DuaDonSanBay: ", DuaDonSanBay);
            document.getElementById("LSGD_Partner_tr").innerHTML = "";

            if(DuaDonSanBay.length === 0){
                document.getElementById("LSDG_Partner_title").innerHTML = "Chưa có dữ liệu partner đưa đón sân bay cho tài khoản này";
            }
            else{
                document.getElementById("LSDG_Partner_title").innerHTML = "Partner đưa đón sân bay";
                document.getElementById("LSGD_Partner_tr").innerHTML = 
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã vé</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên khách hàng</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Hành trình</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày khởi hành</td>" +                    
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Phương tiện</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Kế hoạch</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giá vé</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Lợi nhuận</td>" +
                    "</tr>" ;
                for(let i = 0; i < DuaDonSanBay.length; i++)
                {
                    document.getElementById("LSGD_Partner_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].ticketId + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].customerName + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].journey + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].date + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].vehicleType + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].schedule + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].ticketPrice + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay[i].profit + "</td>" +
                    "</tr>";
                }     
            }
          
        }
        catch(error){
            
        }
    }

    const KhachSan = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKENPARTNER")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const partnerId = laythongtin.data.rolePartner[0].partnerId;
            console.log("partner id: ", partnerId);

            document.getElementById("formSelect").style.display = "none";

            document.getElementById("LSGD_Partner_tr").innerHTML = "";

            document.getElementById("LSDG_Partner_title").innerHTML = "Partner khách sạn";
            if(laythongtin.data.rolePartner[0].partnerRole === "KS" || laythongtin.data.rolePartner[0].partnerRole === "Hotel"){
                const KhachSan = await axios
                .get(`https://traveloka-hotel.herokuapp.com/admin/bill/`)
                .then((res) => res.data)
                .catch((err) => err);

                console.log("KhachSan: ", KhachSan);
                    
                document.getElementById("LSGD_Partner_tr").innerHTML = 
                "<tr>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã phiếu</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã khách hàng</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên khách hàng</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên khách sạn</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tổng tiền</td>" +
                "</tr>" ;
                for(let i = 0; i < KhachSan.recordset.length; i++)
                {
                    document.getElementById("LSGD_Partner_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + KhachSan.recordset[i].ID + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + KhachSan.recordset[i].ID_User + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + KhachSan.recordset[i].Name_User + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + KhachSan.recordset[i].Name_Hotel + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + KhachSan.recordset[i].Price + "</td>" +
                    "</tr>";
                } 
            }
            else{
                document.getElementById("LSDG_Partner_title").innerHTML = "Chưa có dữ liệu partner khách sạn cho tài khoản này";
            }   
        }
        catch(error){         
        }
    }

    const VeMayBay = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKENPARTNER")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const username = laythongtin.data.rolePartner[0].partnerUsername;
            console.log("thông tin: ", username);

            const VeMayBay = await axios
            .get(`https://oka1mb.herokuapp.com/api/partner/history/${username}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("Vé máy bay: ", VeMayBay);
            document.getElementById("LSGD_Partner_tr").innerHTML = "";
            document.getElementById("formSelect").style.display = "none";
            if(VeMayBay.length === 0){
                document.getElementById("LSDG_Partner_title").innerHTML = "Chưa có dữ liệu partner vé máy bay cho tài khoản này";
            }
            else{
                document.getElementById("LSDG_Partner_title").innerHTML = "Partner vé máy bay";
                document.getElementById("LSGD_Partner_tr").innerHTML = 
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã vé</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Hãng bay</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên máy bay</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày đặt</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày bay</td>" +                   
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Nơi đi</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giờ bay</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Nơi đến</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giờ đến</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Loại vé</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giá vé</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tiền trả thêm</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tiền thanh toán</td>" +
                    "</tr>" ;
                for(let i = 0; i < VeMayBay.length; i++)
                {
                    document.getElementById("LSGD_Partner_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].idVe + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TenHang + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TenMayBay + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].NgayDat + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].NgayBay + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].NoiDi + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].GioBay + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].NoiDen + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].GioDen + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TenLoaiVe + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].GiaVe + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TienTraThem + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TienThanhToan + "</td>" +
                    "</tr>";
                }    
            }

        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    function LogOut(){
        localStorage.removeItem("TOKENPARTNER");
        window.location.href = "/Partner";
    }

    window.addEventListener('load', () => {
        if(JSON.stringify(localStorage.getItem("TOKENPARTNER")) === "null"){
            window.location.href = "/Partner";
        }
    })

    async function Choose(){
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKENPARTNER")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            if(laythongtin.data.rolePartner[0].partnerRole === "DDSB"){
                document.getElementById("formSelect").style.display = "block";
            }       
        }
        catch{
        }   
    }

    return(
        <div class="wrapper">
      
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Partner Page</h3>
            </div>

            <ul class="list-unstyled components txt-color">
                <p className="text-decor txt-color">Danh sách Partner</p>
                
                <li >      
                    <a href="#" id="txt-color-1"  onClick={LSDatXe}>Partner Đặt Xe</a>
                </li> 

                <li >
                    <a href="#" id="txt-color-1"  onClick={BietThu}>Partner Biệt Thự</a>
                </li>

                <li >
                     <a href="#" id="txt-color-1"  onClick={Choose}>Partner Đưa Đón Sân Bay</a>
                </li>

                <li>
                    <a href="#" id="txt-color-1" onClick={KhachSan}>Partner Khách Sạn</a>
                </li>

                <li>
                    <a href="#" id="txt-color-1"  onClick={VeMayBay}>Partner Vé Máy Bay</a>
                </li>   
            </ul>

            <input type="button" class="btn btn-danger" value="Đăng xuất" id="LogOutPartner" onClick={LogOut} to="/Partner"/>
            
        </nav>

       
        <div id="content">
            <div class="container-fluid">
                <div id="formSelect" style={{display: 'none'}}>
                    <label for="selectMonth">Chọn tháng: </label> {" "}
                    <select to="selectMonth"  id="selectMonth">
                        <option selected>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>

                    <label for="selectYear">Chọn năm: </label> {" "}
                    <select to="selectYear" id="selectYear">
                        <option selected>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                    </select>
                    <input type="submit" value="Chọn" onClick={DuaDonSanBay}/>
                </div>

                <h2 id="LSDG_Partner_title"></h2>
                
                <table id="LSGD_Partner_tr">

                </table>                    
            </div>
        </div>
    </div>
    );
}

export default Partner;