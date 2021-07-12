import './LichSuGD.scss';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react';
import NavbarMenu from '../../../components/Navbar/navbar-top';
import NavbarMenu2 from '../../../components/Navbar/navbar-bot';
import Footer from '../../../components/footer/footer';
import NavbarLogin from '../../../components/HomeLogin/navbarLogin';
import TrangCaNhan from '../../../components/TrangCaNhan/TrangCaNhan';
import axios from 'axios';

function LichSuGD() {  

    const LSDatXe = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const userId = laythongtin.data.auth[0].userId;
            console.log("thong tin: ", userId);

            const LSDatXe = await axios
            .get(`//108.160.134.9:3301/bill/customer/${userId}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("LSDatXe: ", LSDatXe);
            console.log("1: ", LSDatXe.result[0]);

            document.getElementById("LSGD_tr").innerHTML = "";

            if (LSDatXe.result.length === 0){
                document.getElementById("LSDG_title").innerHTML = "Chưa có lịch sử giao dịch đặt xe";
            }
            else{
                document.getElementById("LSDG_title").innerHTML = "Lịch sử đặt xe";
                document.getElementById("LSGD_tr").innerHTML = 
                "<tr>" +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã phiếu đặt</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Địa chỉ</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên xe</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Vị trí</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã người cho thuê</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày bắt đầu</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày kết thúc</td>"  +
                    "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tổng tiền</td>"  +
                "</tr>" ;
                for(let i = 0; i < LSDatXe.result.length; i++)
                {
                    document.getElementById("LSGD_tr").innerHTML +=
                    "<tr>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].id + "</td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].address + "</td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].name + "</td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].quantity + "</td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].id_saler + "</td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].startDate + "</td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].endDate + "</td>" +
                        "<td  style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + LSDatXe.result[i].total + "</td>" +
                    "</tr>";
                }
            }

            // if(LSDatXe.status === "SUCCESS"){ 
                
            // }

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
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const userId = laythongtin.data.auth[0].userId;
            console.log("thong tin: ", userId);

            const BietThu = await axios
            .get(`http://cnpmnc-noiluutru.herokuapp.com/api/data/booking?userId=${userId}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("BietThu: ", BietThu);
            document.getElementById("LSGD_tr").innerHTML = "";

            if (BietThu.length === 0){
                document.getElementById("LSDG_title").innerHTML = "Chưa có lịch sử giao dịch biệt thự";
            }
            else{
                document.getElementById("LSDG_title").innerHTML = "Lịch sử thuê biệt thự";
                document.getElementById("LSGD_tr").innerHTML = 
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Địa điểm</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Loại lưu trữ</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Nơi lưu trữ</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Địa chỉ</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên phòng</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giá phòng</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày đến</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày đi</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tổng tiền</td>" +
                    "</tr>" ;
                for(let i = 0; i < BietThu.length; i++)
                {
                    document.getElementById("LSGD_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ten_diadiem + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ten_loailuutru + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ten_noiluutru + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].diachi_noiluutru + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ten_phong + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].gia_phong + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].ngayden_datphong + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white' >" + BietThu[i].ngaydi_datphong + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + BietThu[i].tongtien_datphong + "</td>" +
                    "</tr>";
                }    
            }
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    const Voucher = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const userName = laythongtin.data.auth[0].email;

            const Voucher = await axios
            .get(`http://52.36.113.238:3000/api/GetVouchersByTaiKhoan?TaiKhoan=${userName}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("Voucher: ", Voucher);
            document.getElementById("LSGD_tr").innerHTML = "";

            if(Voucher.recordset.length === 0){
                document.getElementById("LSDG_title").innerHTML = "Chưa có lịch sử sử dụng voucher";
            }
            else{

            document.getElementById("LSGD_tr").innerHTML = 
                "<tr>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã voucher</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên vouchoer</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Dành cho dịch vụ</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Hạn sử dụng</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tình trạng</td>" +
                "</tr>" ;
                for(let i = 0; i < Voucher.recordset.length; i++)
                {
                    document.getElementById("LSGD_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Voucher.recordset[i].Code + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Voucher.recordset[i].TenVoucher + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Voucher.recordset[i].CatalogID  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Voucher.recordset[i].ExpDate  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Voucher.recordset[i].Status  + "</td>" +
                    "</tr>";
                }           
            }
            
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    const VoucherHotel = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const userId = laythongtin.data.auth[0].userId;

            const VoucherHotel = await axios
            .get(`https://oka2-hv.herokuapp.com/api/lichsu_mua/${userId}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("VoucherHotel: ", VoucherHotel);
            document.getElementById("LSGD_tr").innerHTML = "";

            if(VoucherHotel.length === 0){
                document.getElementById("LSDG_title").innerHTML = "Chưa có lịch sử giao dịch voucher khách sạn";
            }
            else{
                document.getElementById("LSDG_title").innerHTML = "Voucher khách sạn đã mua";

                document.getElementById("LSGD_tr").innerHTML = 
                "<tr>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã voucher</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên voucher</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giá trị sử dụng</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày mua</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày có hiệu lực</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày hết hạn</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Số lượng mua</td>" +
                "</tr>" ;
                for(let i = 0; i < VoucherHotel.length; i++)
                {
                    document.getElementById("LSGD_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VoucherHotel[i].MaVoucher + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VoucherHotel[i].TenVoucher  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VoucherHotel[i].GiaTriSuDung  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VoucherHotel[i].Ngay  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VoucherHotel[i].NgayCoHieuLuc + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VoucherHotel[i].NgayHetHieuLuc + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VoucherHotel[i].SoLuongMua + "</td>" +
                    "</tr>";
                }           
            }           
        }
        catch(error){
            
        }
    }

    const DuaDonSanBay = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const email = laythongtin.data.auth[0].email;
            console.log("thong tin: ", email);

            const DuaDonSanBay = await axios
            .get(`http://13.229.200.21:3000/api/booking/tickets/guest?email=${email}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("DuaDonSanbay: ", DuaDonSanBay);
            // console.log("DuaDonSanbay: ", DuaDonSanBay.ticketsFullInformation[0].ticket.classId);
            
            document.getElementById("LSGD_tr").innerHTML = "";

            if(DuaDonSanBay.ticketsFullInformation.length === 0){
                document.getElementById("LSDG_title").innerHTML = "Chưa có lịch sử giao dịch đưa đón sân bay";
            }
            else{
                document.getElementById("LSDG_title").innerHTML = "Lịch sử sử dụng dịch vụ đưa đón sân bay";
                document.getElementById("LSGD_tr").innerHTML = 
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã phiếu</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày khởi hành</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Họ tên</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Title</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giá vé</td>" +
                    "</tr>" ;
                for(let i = 0; i < DuaDonSanBay.ticketsFullInformation.length; i++)
                {
                    document.getElementById("LSGD_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay.ticketsFullInformation[i].ticket.classId + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay.ticketsFullInformation[i].date + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay.ticketsFullInformation[i].ticket.fullName + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay.ticketsFullInformation[i].ticket.title + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + DuaDonSanBay.ticketsFullInformation[i].ticket.ticketPrice + "</td>" +
                    "</tr>";
                }  
            }  
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    const VeMayBay = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const userId = laythongtin.data.auth[0].userId;

            const VeMayBay = await axios
            .get(`https://oka1mb.herokuapp.com/api/history/${userId}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("VeMayBay: ", VeMayBay);
            document.getElementById("LSGD_tr").innerHTML = "";

            if(VeMayBay.length === 0){
                document.getElementById("LSDG_title").innerHTML = "Chưa có lịch sử giao dịch vé máy bay";
            }
            else{
                document.getElementById("LSDG_title").innerHTML = "Lịch sử mua vé máy bay";

                document.getElementById("LSGD_tr").innerHTML = 
                "<tr>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã vé</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Hãng bay</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày bay</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Điểm khởi hành</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Điểm đến</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Loại vé</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tiền thanh toán</td>" +
                "</tr>" ;
                for(let i = 0; i < VeMayBay.length; i++)
                {
                    document.getElementById("LSGD_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].idVe + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TenHang  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].NgayBay  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].NoiDi  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].NoiDen  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TenLoaiVe  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + VeMayBay[i].TienThanhToan  + "</td>" +
                    "</tr>";
                }           
            }
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    const KhachSan = async(data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);

            const userId = laythongtin.data.auth[0].userId;
            console.log(userId);

            const Hotel = await axios
            .get(`https://traveloka-hotel.herokuapp.com/bookroom/${userId}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("Hotel: ", Hotel);

            document.getElementById("LSGD_tr").innerHTML = "";

            if(Hotel.recordset.length === 0){
                document.getElementById("LSDG_title").innerHTML = "Chưa có lịch sử giao dịch khách sạn";
            }
            else{
                document.getElementById("LSDG_title").innerHTML = "Lịch sử thuê khách sạn";

                document.getElementById("LSGD_tr").innerHTML = 
                "<tr>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã khách sạn</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã phòng</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Ngày thuê</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Số ngày thuê</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Giá</td>" +
                "</tr>" ;
                for(let i = 0; i < Hotel.recordset.length; i++)
                {
                    document.getElementById("LSGD_tr").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Hotel.recordset[i].ID_Hotel + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Hotel.recordset[i].ID_Room  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Hotel.recordset[i].CheckoutDate  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + Hotel.recordset[i].DateofHire  + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" +Hotel.recordset[i].Price + "</td>" +
                    "</tr>";
                }           
            }
            
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    return (
        <div className="Page_TCN"  id="page_tcn">
        {/* -- HEADER-- */}
            <div>
                <NavbarLogin />
                {/* <NavbarMenu /> */}
                <NavbarMenu2 />
            </div>

            {/* -- BODY -- */}
            <div className="Body_TCN">
                {/* LEFT */}
                <div className="Body_TCN_Left">
                    <TrangCaNhan />
                </div>


                {/* RIGHT */}
                <div className="Body_TCN_Right">
                    <div className="transaction">
                        {/* <div className="redirect">
                            <p>Xem tất cả vé máy bay và phiếu thanh toán trong <a className="dcct" href="https://www.traveloka.com/vi-vn/user/mybooking">Đặt chỗ của tôi</a></p>
                        </div> */}
                        <div className="date">
                            <button className="btn" type="button" onClick={LSDatXe}> Đặt xe </button>{" "}
                            <button className="btn" type="button" onClick={BietThu}> Biệt thự </button>{" "}
                            <button className="btn" type="button" onClick={Voucher}> Gift-Voucher </button>{" "}
                            <button className="btn" type="button" onClick={VoucherHotel}> Voucher khách sạn </button>{" "}
                            <button className="btn" type="button" onClick={DuaDonSanBay}> Đưa đón sân bây </button>{" "}
                            <button className="btn" type="button" onClick={KhachSan}> Khách sạn </button>{" "}
                            <button className="btn" type="button" onClick={VeMayBay}> Vé máy bay </button>{" "}

                            {/* <DropdownButton title="Bộ lọc">
                                <form className="form">
                            <a>Hiển thị những giao dịch này</a><br></br>
                            <a className="title">Loại sản phẩm</a><br></br>
                            <hr class="dashed"></hr>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value=""/>Vé máy bay
                                </label>
                                <label class="checkbox-inline" className="cb02">
                                    <input type="checkbox" value=""/>Đưa đón sân bay
                                </label><br></br>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value=""/>Extra Baggage
                                </label>
                                <label class="checkbox-inline" className="cb02">
                                    <input type="checkbox" value=""/>Combo tiết kiệm
                                </label><br></br>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value=""/>Khách sạn
                                </label>
                                <label class="checkbox-inline" className="cb02">
                                    <input type="checkbox" value=""/>Xperience
                                </label><br></br>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value=""/>Cho thuê xe
                                </label>
                                <label class="checkbox-inline" className="cb02">
                                    <input type="checkbox" value=""/>Bảo hiểm du lịch
                                </label><br></br>
                            <a className="title">Phương thức thanh toán</a><br></br>
                            <hr class="dashed"></hr>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value=""/>Thẻ tín dụng
                                </label>
                                <label class="checkbox-inline" className="cb02">
                                    <input type="checkbox" value=""/>Tại cửa hàng
                                </label><br></br>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value=""/>Chuyển khoản ngân hàng
                                </label>
                                <label class="checkbox-inline" className="cb02">
                                    <input type="checkbox" value=""/>Bưu điện
                                </label><br></br>
                                <label class="checkbox-inline">
                                    <input type="checkbox" value=""/>Thẻ ATM nội địa
                                </label></form>
                            </DropdownButton> */}
                            {/* <div className="trans">
                                <p>Tất cả lịch sử giao dịch sẽ được hiển thị tại đây.</p>
                            </div> */}
                        </div>
                    </div>

                    <h2 id="LSDG_title"></h2>
                    <table id="LSGD_tr">

                    </table>
                </div>
            </div>

            {/* -- FOOTER -- */}
            <div>
                <Footer />
            </div>
        </div> 
    );
}

export default LichSuGD;