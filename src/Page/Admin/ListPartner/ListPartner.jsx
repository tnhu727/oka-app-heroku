import React from 'react';
import axios from 'axios';
import HomeAdmin from '../HomeAdmin/HomeAdmin';

function ListPartner(){
    window.addEventListener('load', async () => {
        if(JSON.stringify(localStorage.getItem("TOKENADMIN")) === "null"){
            window.location.href = "/admin/login";
        }
        else{
            try{
                const listPartner = await axios
                .get("https://oka1kh.azurewebsites.net/api/partners")
                .then((res) => res.data)
                .catch((err) => err);
    
                console.log("list: ", listPartner);
    
                document.getElementById("partner_table").innerHTML = "";
    
                document.getElementById("partner_table").innerHTML = 
                "<tr>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>"  +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã partner</td>"  +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên đăng nhập partner</td>"  +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mật khẩu</td>"  +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Vai trò</td>"  +
                "</tr>" ;
                for(let i = 0; i < listPartner.Partner.length; i++)
                {
                    document.getElementById("partner_table").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listPartner.Partner[i].partnerId + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listPartner.Partner[i].partnerUsername + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listPartner.Partner[i].partnerPass + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listPartner.Partner[i].partnerRole + "</td>" +
                    "</tr>";
                }
            }
            catch(error){
                //console.log("error.response.data.message", error.laythongtin.data.message);
            }
        }
        
    })
    return(
        <div style={{display: "flex"}}>
            <HomeAdmin />
            
            <div>
            <h2>Danh sách partner</h2>
            <table id="partner_table">

            </table>
            </div>
        </div>
    );
}

export default ListPartner;