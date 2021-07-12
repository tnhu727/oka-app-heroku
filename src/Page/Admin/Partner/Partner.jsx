import React from 'react';
import './Partner.scss';
import axios from 'axios';

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

            if(LSDatXe.status === "SUCCESS"){ 
                document.getElementById("LSDG_Partner_title").innerHTML = "Partner đặt xe";
                document.getElementById("LSGD_Partner_tr").innerHTML = 
                "<tr>" +
                    "<td>STT</td>"  +
                    "<td>Mã phiếu đặt</td>"  +
                    "<td>Địa chỉ</td>"  +
                    "<td>Tên xe</td>"  +
                    "<td>Vị trí</td>"  +
                    "<td>Mã người cho thuê</td>"  +
                    "<td>Mã người dùng</td>"  +
                    "<td>Ngày bắt đầu</td>"  +
                    "<td>Ngày kết thúc</td>"  +
                    "<td>Tổng tiền</td>"  +
                "</tr>" ;
                for(let i = 0; i < LSDatXe.result.length; i++)
                {
                    document.getElementById("LSGD_Partner_tr").innerHTML +=
                    "<tr>" +
                        "<td>" + (i+1) + ". </td>" +
                        "<td>" + LSDatXe.result[i].idBill + "</td>" +
                        "<td>" + LSDatXe.result[i].address + "</td>" +
                        "<td>" + LSDatXe.result[i].name + "</td>" +
                        "<td>" + LSDatXe.result[i].quantity + "</td>" +
                        "<td>" + LSDatXe.result[i].id_saler + "</td>" +
                        "<td>" + LSDatXe.result[i].idUser + "</td>" +
                        "<td>" + LSDatXe.result[i].startDate + "</td>" +
                        "<td>" + LSDatXe.result[i].endDate + "</td>" +
                        "<td>" + LSDatXe.result[i].total + "</td>" +
                    "</tr>";
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

            document.getElementById("LSDG_Partner_title").innerHTML = "Partner biệt thự";
            document.getElementById("LSGD_Partner_tr").innerHTML = 
                "<tr>" +
                    "<td>STT</td>" +
                    "<td>Mã phiếu</td>" +
                    "<td>Mã khách hàng</td>" +
                    "<td>Tên nơi lưu trữ</td>" +
                    "<td>Địa chỉ</td>" +                    
                    "<td>Số lượng phòng</td>" +
                    "<td>Ngày thuê</td>" +
                    "<td>Ngày trả</td>" +
                    "<td>Giá thuê</td>" +
                    "<td>Mã voucher</td>" +
                    "<td>Tổng tiền</td>" +
                "</tr>" ;
            for(let i = 0; i < BietThu.length; i++)
            {
                document.getElementById("LSGD_Partner_tr").innerHTML +=
                "<tr>" +
                    "<td>" + (i+1) + ". </td>" +
                    "<td>" + BietThu[i].order_id + "</td>" +
                    "<td>" + BietThu[i].khach_id + "</td>" +
                    "<td>" + BietThu[i].ten_noiluutru + "</td>" +
                    "<td>" + BietThu[i].diachi_noiluutru + "</td>" +
                    "<td>" + BietThu[i].soluong_phong + "</td>" +
                    "<td>" + BietThu[i].ngayden_datphong + "</td>" +
                    "<td>" + BietThu[i].ngaydi_datphong + "</td>" +
                    "<td>" + BietThu[i].gia_phong + "</td>" +   
                    "<td>" + BietThu[i].voucher_id + "</td>" +                
                    "<td>" + BietThu[i].tongtien_datphong + "</td>" +
                "</tr>";
            }    
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    const DuaDonSanBay = async(data) => {
        try{
            // const laythongtin = await axios
            // .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
            //     authorization: localStorage.getItem("TOKENPARTNER")
            // }})
            // .then((res) => res.data)
            // .catch((err) => err);

            // const partnerId = laythongtin.data.rolePartner[0].partnerId;
            // console.log("partner id: ", partnerId);

            const DuaDonSanBay = await axios
            .get(`http://13.229.200.21:3000/api/booking/admin/report?month=6&year=2021`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("DuaDonSanBay: ", DuaDonSanBay);
            document.getElementById("LSGD_Partner_tr").innerHTML = "";

            document.getElementById("LSDG_Partner_title").innerHTML = "Đưa đón sân bay";

            document.getElementById("LSGD_Partner_tr").innerHTML = 
                "<tr>" +
                    "<td>STT</td>" +
                    "<td>Mã vé</td>" +
                    "<td>Tên khách hàng</td>" +
                    "<td>Hành trình</td>" +
                    "<td>Ngày khởi hành</td>" +                    
                    "<td>Phương tiện</td>" +
                    "<td>Kế hoạch</td>" +
                    "<td>Giá vé</td>" +
                    "<td>Lợi nhuận</td>" +
                "</tr>" ;
            for(let i = 0; i < DuaDonSanBay.length; i++)
            {
                document.getElementById("LSGD_Partner_tr").innerHTML +=
                "<tr>" +
                    "<td>" + (i+1) + ". </td>" +
                    "<td>" + DuaDonSanBay[i].ticketId + "</td>" +
                    "<td>" + DuaDonSanBay[i].customerName + "</td>" +
                    "<td>" + DuaDonSanBay[i].journey + "</td>" +
                    "<td>" + DuaDonSanBay[i].date + "</td>" +
                    "<td>" + DuaDonSanBay[i].vehicleType + "</td>" +
                    "<td>" + DuaDonSanBay[i].schedule + "</td>" +
                    "<td>" + DuaDonSanBay[i].ticketPrice + "</td>" +
                    "<td>" + DuaDonSanBay[i].profit + "</td>" +
                "</tr>";
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
                    "<td>STT</td>" +
                    "<td>Mã phiếu</td>" +
                    "<td>Mã khách hàng</td>" +
                    "<td>Tên khách hàng</td>" +
                    "<td>Tên khách sạn</td>" +
                    "<td>Tổng tiền</td>" +
                "</tr>" ;
                for(let i = 0; i < KhachSan.recordset.length; i++)
                {
                    document.getElementById("LSGD_Partner_tr").innerHTML +=
                    "<tr>" +
                        "<td>" + (i+1) + ". </td>" +
                        "<td>" + KhachSan.recordset[i].ID + "</td>" +
                        "<td>" + KhachSan.recordset[i].ID_User + "</td>" +
                        "<td>" + KhachSan.recordset[i].Name_User + "</td>" +
                        "<td>" + KhachSan.recordset[i].Name_Hotel + "</td>" +
                        "<td>" + KhachSan.recordset[i].Price + "</td>" +
                    "</tr>";
                }    
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
            // const username = laythongtin.data.auth[0];
            console.log("thông tin: ", username);

            const VeMayBay = await axios
            .get(`https://oka1mb.herokuapp.com/api/partner/history/${username}`)
            .then((res) => res.data)
            .catch((err) => err);

            console.log("Vé máy bay: ", VeMayBay);
            document.getElementById("LSGD_Partner_tr").innerHTML = "";

            document.getElementById("LSDG_Partner_title").innerHTML = "Partner vé máy bay";
            document.getElementById("LSGD_Partner_tr").innerHTML = 
                "<tr>" +
                    "<td>STT</td>" +
                    "<td>Mã vé</td>" +
                    "<td>Hãng bay</td>" +
                    "<td>Tên máy bay</td>" +
                    "<td>Ngày đặt</td>" +
                    "<td>Ngày bay</td>" +                   
                    "<td>Nơi đi</td>" +
                    "<td>Giờ bay</td>" +
                    "<td>Nơi đến</td>" +
                    "<td>Giờ đến</td>" +
                    "<td>Loại vé</td>" +
                    "<td>Giá vé</td>" +
                    "<td>Tiền trả thêm</td>" +
                    "<td>Tiền thanh toán</td>" +
                "</tr>" ;
            for(let i = 0; i < VeMayBay.length; i++)
            {
                document.getElementById("LSGD_Partner_tr").innerHTML +=
                "<tr>" +
                    "<td>" + (i+1) + ". </td>" +
                    "<td>" + VeMayBay[i].idVe + "</td>" +
                    "<td>" + VeMayBay[i].TenHang + "</td>" +
                    "<td>" + VeMayBay[i].TenMayBay + "</td>" +
                    "<td>" + VeMayBay[i].NgayDat + "</td>" +
                    "<td>" + VeMayBay[i].NgayBay + "</td>" +
                    "<td>" + VeMayBay[i].NoiDi + "</td>" +
                    "<td>" + VeMayBay[i].GioBay + "</td>" +
                    "<td>" + VeMayBay[i].NoiDen + "</td>" +
                    "<td>" + VeMayBay[i].GioDen + "</td>" +
                    "<td>" + VeMayBay[i].TenLoaiVe + "</td>" +
                    "<td>" + VeMayBay[i].GiaVe + "</td>" +
                    "<td>" + VeMayBay[i].TienTraThem + "</td>" +
                    "<td>" + VeMayBay[i].TienThanhToan + "</td>" +
                "</tr>";
            }    
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    return(
        <div>
            <div style={{height: '115px', backgroundColor: 'rgb(41, 119, 223)'}}>
                <div style={{textAlign: 'center'}}>
                    <h1 style={{color: 'white'}}>Oka - Tera</h1>
                </div>
                <div>
                    <input type="button" value="Partner Đặt Xe" id="partnerDatXe" onClick={LSDatXe}/>
                    <input type="button" value="Partner Biệt Thự" id="partnerBietThu" onClick={BietThu}/>                   
                    <input type="button" value="Partner Đưa Đón Sân Bay" id="partnerDuaDonSanBay" onClick={DuaDonSanBay}/>
                    <input type="button" value="Partner Khách Sạn" id="partnerKhachSan" onClick={KhachSan}/>
                    <input type="button" value="Partner Vé Máy Bay" id="partnerVeMayBay" onClick={VeMayBay}/>
                    {/* <input type="button" value="Partner Voucher Khách Sạn" id="partnerVoucherKhachSan" onClick={VoucherKhachSan}/> */}
                </div>
                
            </div>

            <div style={{margin: '20px'}}>
                <h2 id="LSDG_Partner_title"></h2>
                <table id="LSGD_Partner_tr">

                </table>
            </div>
        </div>
    );
}

export default Partner;