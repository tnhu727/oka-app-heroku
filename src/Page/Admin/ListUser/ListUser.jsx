import React from 'react';
import axios from 'axios';
import HomeAdmin from '../HomeAdmin/HomeAdmin';

function ListUser(){
    window.addEventListener('load', async () => {
        if(JSON.stringify(localStorage.getItem("TOKENADMIN")) === "null"){
            window.location.href = "/admin/login";
        }
        else{
            try{
                const listUser = await axios
                .get("https://oka1kh.azurewebsites.net/api/users")
                .then((res) => res.data)
                .catch((err) => err);
    
                console.log("listUser: ", listUser);
    
                document.getElementById("user_table").innerHTML = "";
    
                document.getElementById("user_table").innerHTML = 
                "<tr>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>STT</td>"  +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mã user</td>"  +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Họ user</td>"  +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Tên user</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Email</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Mật khẩu</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Số điện thoại</td>" +
                    "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>Điểm</td>" +
                "</tr>" ;
                for(let i = 0; i < listUser.Users.length; i++)
                {
                    document.getElementById("user_table").innerHTML +=
                    "<tr>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + (i+1) + ". </td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listUser.Users[i].userId + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listUser.Users[i].lastName + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listUser.Users[i].fristName + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listUser.Users[i].email + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listUser.Users[i].pass + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listUser.Users[i].phone + "</td>" +
                        "<td style='border: 1px solid rgb(205, 208, 209); padding: 10px; background-color: white'>" + listUser.Users[i].value_TotalPoint + "</td>" + 
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
            <h2>Danh sách Users</h2>
            <table id="user_table">

            </table>
            </div>
        </div>
    );
}

export default ListUser;