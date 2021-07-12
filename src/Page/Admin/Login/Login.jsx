import React, { useState } from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { NavLink, useHistory, Link } from "react-router-dom";
import validator from 'validator'
let buttons;


function LoginAdmin() {



  let history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios
        .post("https://oka1kh.azurewebsites.net/api/partner/login", data)
        .then((res) => res.data)
        .catch((err) => err);
      const tokenPartner = response?.token;

      localStorage.setItem("TOKENADMIN", tokenPartner);
      console.log("response", response);

      if (response.status === "SUCCES") {
        history.push("/admin/listuser");
      } else {
        buttons = alert("Bạn Nhập Sai Thông Tin !!!");
      }
    } catch (error) {
      console.log("error.response.data.message", error.response.data.message);
    }
  };

  return (
    <div className="formLogIn_content">
      <h2>Đăng nhập vào tài khoản admin</h2>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <label>Nhập tên tài khoản</label> <br />
        <input
          id="txtusername"
          {...register("partnerUsername", { required: true })}
        />{" "}
        <br />
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>
        </span> <br />
        <label htmlFor="password">Mật khẩu</label> <br />
        <input type="password" {...register("partnerPass")} /> <br />
        <button to="/PartnerPage" className="loginsubmit" type="submit" onChange={{ buttons }}>
          {" "}
          Đăng Nhập{" "}
        </button>
        <div className="formLogIn_content_box">
          <div className="formLogIn_content_boxBtnLogIn">
            {/* <button id="btnSignUp" type='submit' onChange={{buttons}} >Đăng nhập</button> */}
          </div>
          {/* <div className="formLogIn_content_boxSignUp">
            <p className="formLogIn_content_boxSignUp_lb">
              Bạn chưa có tài khoản?
            </p>
            <p className="formLogIn_content_boxSignUp_link"><NavLink to='/PartnerDK'>Đăng ký</NavLink></p>
          </div> */}
        </div>
      </form>
    </div>
  );
}

export default LoginAdmin;


// import React, { useState } from "react";
// import "./Login.scss";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { NavLink, useHistory, Link } from "react-router-dom";
// import validator from 'validator'
// let buttons;


// function LoginAdmin() {

//   let history = useHistory();

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios
//         .post("https://oka1kh.azurewebsites.net/api/partner/login", data)
//         .then((res) => res.data)
//         .catch((err) => err);
//       const token = response?.data?.token;
//       localStorage.setItem("TOKEN", token);
//       console.log("response", response);

//       if (response.status === "SUCCES") {
//         history.push("/admin/listuser");
//       } else {
//         buttons = alert("Bạn Nhập Sai Thông Tin !!!");
//       }
//     } catch (error) {
//       console.log("error.response.data.message", error.response.data.message);
//     }
//   };

//   return (
//     <div className="formLogIn_content1">
//       <h2>Đăng nhập vào tài khoản Admin</h2>
//       <form method="post" onSubmit={handleSubmit(onSubmit)}>
//         <label className='label11'>Nhập tên tài khoản</label> <br />
//         <input
//           id="txtusername1"
//           {...register("partnerUsername", { required: true })}
//         />{" "}
//         <br />
//         <span style={{
//           fontWeight: 'bold',
//           color: 'red',
//         }}>
//         </span> <br />
//         <label className='label11' htmlFor="password1">Mật khẩu</label> <br />
//         <input type="password1" {...register("partnerPass")} /> <br />
//         <button className="loginsubmit1" type="submit" onChange={{ buttons }}>
//           {" "}
//           Đăng Nhập{" "}
//         </button>
        
//       </form>
//     </div>
//   );
// }

// export default LoginAdmin;
