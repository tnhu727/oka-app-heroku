import React from 'react';
import {Link} from 'react-router-dom';
import './UserProfile.scss';
import NavbarMenu from '../../../components/Navbar/navbar-top';
import NavbarMenu2 from '../../../components/Navbar/navbar-bot';
import Footer from '../../../components/footer/footer';
import {UserOutlined} from '@ant-design/icons';
import {EditTwoTone} from '@ant-design/icons';
import {SettingOutlined} from '@ant-design/icons';
import {PhoneOutlined} from '@ant-design/icons';
import {PlusCircleOutlined} from '@ant-design/icons';
import {MailOutlined} from '@ant-design/icons';
import NavbarLogin from '../../../components/HomeLogin/navbarLogin';
import TrangCaNhan from '../../../components/TrangCaNhan/TrangCaNhan';
import axios from "axios";
import { useForm } from "react-hook-form";

function TrangKhachHang(){
    // Form Edit Name
    function turnOnFormEditName(){
        document.getElementById("edit_name").style.display = "block";     
    }
    function turnOffFormEditName(){
        document.getElementById("edit_name").style.display = "none";          
    }

    // Form Edit Pass
    function turnOnFormEditPass(){
        document.getElementById("edit_pass").style.display = "block";     
    }
    function turnOffFormEditPass(){
        document.getElementById("edit_pass").style.display = "none";          
    }

    // Form Confirm Pass
    function showFormConfirmPass(){
        document.getElementById("confirm_pass").style.display = "block";    
        document.getElementById("add_number_phone").style.display = "none";      
        document.getElementById("add_email").style.display = "none";        
    }
    function hideFormConfirmPass(){
        document.getElementById("confirm_pass").style.display = "none";          
    }

    // Form Add Number Phone
    function showFormAddNumberPhone(){
        document.getElementById("add_number_phone").style.display = "block";          
    }
    function hideFormAddNumberPhone(){
        document.getElementById("add_number_phone").style.display = "none";          
    }

    // Form Add Email
    function showFormAddEmail(){
        document.getElementById("add_email").style.display = "block";          
    }
    function hideFormAddEmail(){
        document.getElementById("add_email").style.display = "none";          
    }

    // const {
    //     update,
    //     formState: { errors },
    //     handleSubmit,
    //   } = useForm();
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
    

    // Hi???n th??? h??? t??n
    window.addEventListener('load', async () => {
        try {
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
                authorization: localStorage.getItem("TOKEN")
            }})
            .then((res) => res.data)
            .catch((err) => err);
            console.log(laythongtin.data.auth[0].fristName);
            console.log(laythongtin.data.auth[0].lastName);
        document.getElementById("_userFullName").innerHTML = laythongtin.data.auth[0].fristName + " " + laythongtin.data.auth[0].lastName;
            if(JSON.stringify(localStorage.getItem("TOKEN")) !== "null" || JSON.stringify(localStorage.getItem("TOKEN")) !== "undefined"){
                document.getElementById("_userFullName").innerHTML = laythongtin.data.auth[0].fristName + " " + laythongtin.data.auth[0].lastName;
                document.getElementById("showUserEmail").innerHTML = laythongtin.data.auth[0].email;
                document.getElementById("showUserNumberPhone").innerHTML = laythongtin.data.auth[0].phone;
            }
            console.log("token: " , JSON.stringify(localStorage.getItem("TOKEN")));
        } catch (error) {
            console.log("error");
        }
    });

    // ?????i s??? ??i???n tho???i
    const updateNumberPhone = async (data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
            authorization: localStorage.getItem("TOKEN")
        }})
            .then((res) => res.data)
            .catch((err) => err);

        //     const response = await axios
        //     .post("https://oka1kh.azurewebsites.net/api/user/login", data)
        //     .then((res) => res.data)
        //     .catch((err) => err);
        //   const token = response?.data?.refreshToken;
        //   console.log("refresh token: ", token);
            
            const userId = laythongtin.data.auth[0].userId;

            const updateNumberPhone = await axios
            .patch(`https://oka1kh.azurewebsites.net/api/user/change_phone/${userId}`, {phone: document.getElementById("txtNumberPhone").value})
            .then((res) => res.data)
            .catch((err) => err);

            if(document.getElementById("txtConfirmPass").value === laythongtin.data.auth[0].pass){
                console.log("Update s??? ??i???n tho???i th??nh c??ng");
                console.log("S??T: ", document.getElementById("txtNumberPhone").value);
                console.log("S??T: ", laythongtin.data.auth[0].phone);
                // localStorage.clear();
                // localStorage.setItem("TOKEN", token);
                console.log("S??T: ", laythongtin.data.auth[0].phone);
                alert("???? thay ?????i s??? ??i???n tho???i th??nh c??ng");
                document.getElementById("txtNumberPhone").value = "";
                document.getElementById("txtConfirmPass").value = "";
                document.getElementById("showUserNumberPhone").value = document.getElementById("txtNumberPhone").value;               
            }else{
                console.log("Sai m???t kh???u");
                window.alert("Sai m???t kh???u");
            }
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    // ?????i t??n
    const updateName = async (data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
            authorization: localStorage.getItem("TOKEN")
        }})
            .then((res) => res.data)
            .catch((err) => err);
            
            const userId = laythongtin.data.auth[0].userId;

            const updateName = await axios
            .patch(`https://oka1kh.azurewebsites.net/api/user/change_name/${userId}`, {lastName: document.getElementById("txtLastName").value, fristName: document.getElementById("txtFirstName").value})
            .then((res) => res.data)
            .catch((err) => err);

            document.getElementById("_userFullName").innerHTML = document.getElementById("txtFirstName").value + " " + document.getElementById("txtLastName").value;

            if(document.getElementById("txtConfirmPass").value === laythongtin.data.auth[0].pass){
                document.getElementById("_userFullName").innerHTML = document.getElementById("txtFirstName").value + " " + document.getElementById("txtLastName").value;
                alert("Thay ?????i t??n th??nh c??ng!");
                document.getElementById("txtLastName").value = "";
                document.getElementById("txtFirstName").value = "";
                document.getElementById("txtConfirmPass").value = "";
                
            }else{
                console.log("Sai m???t kh???u");
                window.alert("Sai m???t kh???u");
            }
        }
        catch(error){
        }
    }

    // ?????i password
    const changePass = async (data) => {
        try{
            const laythongtin = await axios
            .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
            authorization: localStorage.getItem("TOKEN")
        }})
            .then((res) => res.data)
            .catch((err) => err);
            
            const userId = laythongtin.data.auth[0].userId;
            
            // So s??nh m???t kh???u c??
            if(document.getElementById("txtOldPass").value === laythongtin.data.auth[0].pass){

                // So s??nh m???t kh???u c?? v???i m???t kh???u m???i
                if(document.getElementById("txtNewPass").value === laythongtin.data.auth[0].pass){
                    alert("Kh??ng ???????c d??ng m???t kh???u c?? ????? ?????t cho m???t kh???u m???i");
                }
                else{

                    // So s??nh m???t kh???u m???i v?? m???t kh???u nh???p l???i
                    if(document.getElementById("txtNewPass").value === document.getElementById("txtConfirmNewPass").value){

                        const updatePass = await axios
                            .patch(`https://oka1kh.azurewebsites.net/api/user/change_pass/${userId}`, {pass: document.getElementById("txtNewPass").value, repass: document.getElementById("txtConfirmNewPass").value})
                            .then((res) => res.data)
                            .catch((err) => err); 
    
                        console.log("new pass: ", document.getElementById("txtNewPass").value);
                        alert("Thay ?????i m???t kh???u th??nh c??ng!");
                        document.getElementById("txtOldPass").value = "";
                        document.getElementById("txtNewPass").value = "";
                        document.getElementById("txtConfirmNewPass").value = "";
                    }
                    else{
                        alert("M???t kh???u nh???p l???i kh??ng tr??ng kh???p");
                    }               
                } 
            }
            else{
                console.log("Sai m???t kh???u ????ng nh???p");
                window.alert("Sai m???t kh???u ????ng nh???p");
            }
        }
        catch(error){
            //console.log("error.response.data.message", error.laythongtin.data.message);
        }
    }

    function btnSubmit(){
        if(document.getElementById("txtLastName").value !== "" && document.getElementById("txtFirstName").value !== ""){
            updateName();
        }
        else if (document.getElementById("txtNumberPhone").value !== ""){
            updateNumberPhone();
        }
        else{
            alert("Kh??ng th??? l??u!");
        }
    }

    return(    
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
                    {/* BOX_NAME */}
                    <div className="box_name">
                        <div className="box_name_title">
                            <div className="box_name_title_icon"><UserOutlined id="fix_layout" /></div>
                            <div  id="_userFullName">
                               
                            </div>
                            <div>
                                <button id="editName" onClick={turnOnFormEditName}><EditTwoTone id="fix_layout-1" />&nbsp;C???p nh???t h??? s??</button>
                                <button id="editPass" onClick={turnOnFormEditPass}>Thay ?????i m???t kh???u</button>
                            </div>
                        </div>
                        {/* EDIT NAME */}
                        <div className="box_name_editName" id="edit_name" style={{display: 'none'}}>
                            <hr />
                            <div className="box_name_editName_boxName">
                                <div>H???</div>
                                <input type="text" id="txtLastName"/>
                                <div>T??n</div>
                                <input type="text" id="txtFirstName"/>
                            </div>
                            <div className="box_name_editName_btn">
                                <input type="button" value="H???y" id="cancelEditName" onClick={turnOffFormEditName}/>
                                <input type="submit" value="L??u" id="saveEditName" onClick={showFormConfirmPass}/>
                            </div>
                        </div>                        
                        {/* EDIT PASSWORD */}
                        <div className="box_name_editPass" id="edit_pass" style={{display: 'none'}}>
                            <hr />
                            <div>M???t kh???u c??</div>
                            <input type="password" id="txtOldPass"/>
                            <div>M???t kh???u m???i</div>
                            <input type="password" id="txtNewPass"/>
                            <div>X??c nh???n m???t kh???u m???i</div>
                            <input type="password" id="txtConfirmNewPass"/>
                            <div className="box_name_editPass_lbnote">Vui l??ng nh???p m???t m???t kh???u b???n ch??a t???ng s??? d???ng ??? b???t k??? trang web n??o</div>
                            <div className="box_name_editPass_btn">
                                <input type="button" value="H???y" id="cancelEditPass" onClick={turnOffFormEditPass}/>
                                <input type="submit" value="L??u" id="saveEditPass" onClick={changePass}/>
                            </div>
                        </div>
                    </div>

                    {/* BOX_ENABLE */}
                    {/* <div className="box_enable">
                        <div className="box_enable_title">
                            <div className="box_enable_title_icon"><SettingOutlined id="fix_layout" /></div>
                            <div>K??ch ho???t m?? x??c th???c khi ????ng nh???p</div>
                        </div>
                        <hr />
                        <div className="box_enable_bottom">
                            <input type="checkbox" id="checkBoxEnable"/>
                            <label>G???i m?? x??c th???c m???i khi t??i ????ng nh???p tr??n thi???t b??? m???i</label>
                        </div>
                    </div> */}

                    {/* BOX_PHONE */}
                    <div className="box_phone">
                        <div className="box_phone_title">
                            <div className="box_phone_title_icon"><PhoneOutlined id="fix_layout" /></div>
                            <div>??i???n tho???i</div>
                            <div>
                                <button id="addNumberPhone" onClick={showFormAddNumberPhone}><PlusCircleOutlined id="fix_layout-1" />&nbsp;??i???n tho???i</button>
                            </div>
                        </div>
                        <p>S??? di ?????ng ????? nh???n tin b??o li??n quan ?????n t??i kho???n.</p>      
                        <label>S??? ??i???n tho???i c???a b???n:</label> {" "} 
                        <label id="showUserNumberPhone"></label>            
                    </div>

                    {/* BOX_EMAIL */}
                    <div className="box_email">
                        <div className="box_email_title">
                            <div className="box_email_title_icon"><MailOutlined id="fix_layout" /></div>
                            <div>Email</div>
                            {/* <div>
                                <button id="addNumberPhone" onClick={showFormAddEmail}><PlusCircleOutlined id="fix_layout-1" />&nbsp;Email</button>
                            </div> */}
                        </div>
                        <p>?????a ch??? email ????? nh???n tin b??o li??n quan ?????n t??i kho???n.</p>
                        <label>Email c???a b???n:</label> {" "} 
                        <label id="showUserEmail"></label>  
                    </div>
                </div> 
            </div> 

            {/*FORM X??C NH???N M???T KH???U */}
            <div className="formConfirm" id="confirm_pass">
                <div className="formConfirm_content"  >
                    <h2>X??c nh???n t??i kho???n c???a b???n</h2>
                    <p>B???n ph???i nh???p l???i m???t kh???u ????? c???p nh???t truy c???p</p>
                    <div className="formConfirm_content_txtPass">
                        <input type="password" id="txtConfirmPass"/>
                    </div>
                    <div className="formConfirm_content_btnSubmit">
                        <input type="submit" value="?????ng ??" id="btnSubmit" onClick={btnSubmit}/>
                    </div>
                    <div>
                        <input type="button" value="H???y" id="btnCancel" onClick={hideFormConfirmPass}/>
                    </div>            
                </div> 
            </div>

            {/* FORM NH???P S??? ??I???N THO???I */}
            <div className="formAddNumberPhone" id="add_number_phone">
                <div className="formAddNumberPhone_content">
                    <h2 className="formAddNumberPhone_content_titleNP">Th??m s??? ??i???n tho???i</h2>
                    <p className="formAddNumberPhone_content_lbNP">??i???n tho???i</p>
                    <div method="post" onSubmit={handleSubmit(updateNumberPhone)}>
                        <input type="number" id="txtNumberPhone" {...register("phone")}/>
                    </div>
                    <div>
                        <input type="button" value="H???y" id="cancelAddNumberPhone" onClick={hideFormAddNumberPhone}/>
                        <input type="submit" value="L??u" id="saveNumberPhone" onClick={showFormConfirmPass}/>
                    </div>
                </div>
            </div>
            {/* FORM NH???P EMAIL */}
            <div className="formAddEmail" id="add_email">
                <div className="formAddEmail_content">
                    <h2 className="formAddEmail_content_titleEmail">Th??m t??i kho???n ????ng nh???p</h2>
                    <p className="formAddEmail_content_lbEmail">??i???n tho???i</p>
                    <div>
                        <input type="text" id="txtEmail"/>
                    </div>
                    <div>
                        <input type="button" value="H???y" id="cancelAddEmail" onClick={hideFormAddEmail}/>
                        <input type="submit" value="L??u" id="saveEmail" onClick={showFormConfirmPass}/>
                    </div>
                </div>
            </div>

            {/* -- FOOTER -- */}
            <div>
                <Footer />
            </div>
        </div> 
    );
}

export default TrangKhachHang;