import React, { Component, useState, setState } from "react";
import Hamburger from "./hamburger";
import "./navbar-top.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import traveloka_logo from "../../Images/traveloka_logo.png";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaPercent, FaHandshake, FaSave, FaReceipt } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BsPeopleCircle } from "react-icons/bs";
import {
  RiArrowDropDownLine,
  RiBillLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { FaMale, FaCoins, FaRegCreditCard, FaRegBell } from "react-icons/fa";
import { FiBook, FiMail } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import "../HomeLogin/Home2.css";
import "./DangNhap.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  btnRegister: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0770cd",
    padding: 10,
    "&:hover": {
      background: "#0770ca",
    },
  },
  btnRegister1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ff8432",
    padding: 10,
    "&:hover": {
      background: "#fffff",
    },
  },
  link: {
    color: "#fff",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        aria-labelledby={labeledBy}
        className="formLogIn"
      >
        <ul className="list-unstyled">
          {/* <Demo /> */}
        </ul>
      </div>
    );
  }
);

//NAVBAR HEADER
// Tr?????c ????ng nh???p
const NavbarMenu = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  window.addEventListener('load', async () => {
    try {
      const laythongtin = await axios
        .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
          authorization: localStorage.getItem("TOKEN")
      }})
        .then((res) => res.data)
        .catch((err) => err);
      console.log(laythongtin.data.auth[0].fristName);

      if(JSON.stringify(localStorage.getItem("TOKEN")) === "null" || JSON.stringify(localStorage.getItem("TOKEN")) === "undefined"){
        document.getElementById("NavBeforeLogIn").style.display = "block";
        document.getElementById("NavAfterLogIn").style.display = "none";
      }
      else
      {
        document.getElementById("NavBeforeLogIn").style.display = "none";
        document.getElementById("NavAfterLogIn").style.display = "block";
        //document.getElementById("simple-menu").style.display = "block";
        document.getElementById("showFirstNameUser").innerHTML = laythongtin.data.auth[0].fristName;
        console.log("FirstName" + laythongtin.data.auth[0].fristName);
      }
      console.log("token: " , JSON.stringify(localStorage.getItem("TOKEN")));
    } catch (error) {
      //console.log("error.response.data.message", error.response.data.message);
    }
  });

  

  // const getNameUser = async () => {
  //   try {
  //         const laythongtin = await axios
  //           .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
  //             authorization: localStorage.getItem("TOKEN")
  //         }})
  //           .then((res) => res.data)
  //           .catch((err) => err);
  //         console.log(laythongtin.data.auth[0].fristName);
    
  //         if(JSON.stringify(localStorage.getItem("TOKEN")) === "null" || JSON.stringify(localStorage.getItem("TOKEN")) === "undefined"){
  //           document.getElementById("NavBeforeLogIn").style.display = "block";
  //           document.getElementById("NavAfterLogIn").style.display = "none";
  //         }
  //         else
  //         {
  //           document.getElementById("NavBeforeLogIn").style.display = "none";
  //           document.getElementById("NavAfterLogIn").style.display = "block";
  //           //document.getElementById("simple-menu").style.display = "block";
  //           document.getElementById("showFirstNameUser").innerHTML = laythongtin.data.auth[0].fristName;
  //           console.log("FirstName" + laythongtin.data.auth[0].fristName);
  //         }
  //         console.log("token: " , JSON.stringify(localStorage.getItem("TOKEN")));
  //       } catch (error) {
  //         //console.log("error.response.data.message", error.response.data.message);
  //       }   
  // }


  function LogOut() { 
    document.getElementById("NavBeforeLogIn").style.display = "block";
    document.getElementById("NavAfterLogIn").style.display = "none";
    localStorage.removeItem("TOKEN");
    //document.getElementById("simple-menu").style.display = "none";
  }

  return (
    <div className="bg-1">
      <AppBar position="static">
        <Toolbar className="navbar">
          <Hamburger />
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/">
              <img className="logo" src={traveloka_logo} alt="traveloka" />
            </NavLink>
          </Typography>
          <Button className="btn">
            <FaPercent className="percent logo-items" alt="percent" />
            <p>Khuy???n m??i</p>
          </Button>
          <Button className="btn">
            <FaHandshake className="hand logo-items" alt="handshake" />
            <p>H???p t??c v???i ch??ng t??i</p>
          </Button>
          <Button className="btn">
            <FaSave className="save logo-items" alt="save" />
            <p>???? l??u</p>
          </Button>
          <Button className="btn">
            <FaReceipt className="seat logo-items" alt="datcho" />
            <p>?????t ch??? c???a t??i</p>
          </Button>

          {/* .......... */}
          <div className="double"  id="NavBeforeLogIn">
            {/* <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
                className="toggle"
              >
                ????ng Nh????p
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item eventKey="1">Red</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
             <Button style={{marginRight : '10px'}} type="submit" className={classes.btnRegister1}>
              <NavLink to="/DangNhap" className={classes.link}>
                ????ng <br /> Nh????p
              </NavLink>
            </Button>
            <Button type="submit" className={classes.btnRegister}>
              <NavLink to="/DangKy" className={classes.link}>
                ????ng <br /> k??
              </NavLink>
            </Button>
          </div>


          <div className='dangnhapthanhcong' id="NavAfterLogIn" style={{display: 'none'}}>
            <Button
              className="btnUser"
              style={{ borderRadius: "10px" }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >

              {/* //Ch???? T??n ng??????i du??ng na??y pha??i s????a , kh??ng th???? ?????? t??n c????ng ????????c */}
              <p>
                <BsPeopleCircle style={{ color: "rgb(7, 112, 205)" }} />
                {" "} <label id="showFirstNameUser"></label> {" "} 
                <RiArrowDropDownLine />
              </p>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <label>Ta??i Khoa??n</label>
              <MenuItem onClick={handleClose}>
                <NavLink to="/TaiKhoan">
                  <FaMale /> Chi??nh S????a H???? S??
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/DiemThuongCuaToi">
                  <FaCoins /> ??i????m th??????ng cu??a t??i
                </NavLink>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <NavLink to="/">
                  <FaRegCreditCard /> The?? Cu??a T??i
                </NavLink>
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                <NavLink to="/DanhSachGiaoDich">
                  <RiBillLine /> Danh sa??ch giao di??ch
                </NavLink>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <NavLink to="/">
                  <FiBook /> ??????t ch???? cu??a t??i
                </NavLink>
              </MenuItem> */}
              {/* <MenuItem onClick={handleClose}>
                <NavLink to="/">
                  <FaRegBell /> Th??ng ba??o gia?? ve?? ma??y bay
                </NavLink>
              </MenuItem> */}
              {/* <MenuItem onClick={handleClose}>
                <NavLink to="/">
                  <IoIosPeople /> Passenger Quick Pick
                </NavLink>
              </MenuItem> */}
              {/* <MenuItem onClick={handleClose}>
                <NavLink to="/">
                  <FiMail /> Khuy????n ma??i
                </NavLink>
              </MenuItem> */}
              <MenuItem onClick={LogOut} id="btnLogOut">
                <NavLink to="/">
                  <RiLogoutBoxRLine /> ????ng Xu????t
                </NavLink>
              </MenuItem>
            </Menu>
          </div>


        </Toolbar>
      </AppBar>
    </div>
  );
};

//LOGIN
// let buttons;
// var firstNameUser = "";
// function Demo() {
//   let history = useHistory();

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios
//         .post("https://oka1kh.azurewebsites.net/api/user/login", data)
//         .then((res) => res.data)
//         .catch((err) => err);
//       const token = response?.data?.token;
//       localStorage.setItem("TOKEN", token);
//       console.log("response", response);

//       const laythongtin = await axios
//         .get("https://oka1kh.azurewebsites.net/api/profiles", {headers: {
//           authorization: localStorage.getItem("TOKEN")
//       }})
//         .then((res) => res.data)
//         .catch((err) => err);
//       console.log(laythongtin.data.auth[0].fristName);

//       firstNameUser = laythongtin.data.auth[0].fristName;

//       if (response.status === "SUCCES") {
//         history.push("/");
//         document.getElementById("NavBeforeLogIn").style.display = "none";
//         document.getElementById("NavAfterLogIn").style.display = "block";
//         document.getElementById("showFirstNameUser").innerHTML = firstNameUser;
//         console.log("a: " + firstNameUser);
        
//       } else {
//         buttons = alert("Ba??n Nh????p Sai Th??ng Tin !!!");
//       }
//     } catch (error) {
//       //console.log("error.response.data.message", error.response.data.message);
//     }
//   };
  
//   return (
//     <div className="formLogIn_content">
//       <h2>????ng nh????p va??o ta??i khoa??n</h2>
//       <form method="post" onSubmit={handleSubmit(onSubmit)}>
//         <label>Nh????p Email Ho????c S???? ??i????n Thoa??i</label> <br />
//         <input
//           id="txtusername"
//           {...register("email", { required: true })}
//         />{" "}
//         <br />
//         <span style={{ color: "red" }}>
//           {errors.email === "required" && "User is required"}
//         </span>
//         <label htmlFor="password">M???t kh???u</label> <br />
//         <input type="password" {...register("pass")} /> <br />
//         <button className="loginsubmit" type="submit" onChange={{buttons}}>
//           {" "}
//           ????ng Nh????p{" "}
//         </button>
//         <div className="formLogIn_content_box">
//           <div className="formLogIn_content_boxBtnLogIn">
//             {/* <button id="btnSignUp" type='submit' onChange={{buttons}} >????ng nh???p</button> */}
//           </div>
//           <div className="formLogIn_content_boxSignUp">
//             <p className="formLogIn_content_boxSignUp_lb">
//               B???n ch??a c?? t??i kho???n?
//             </p>
//             <p className="formLogIn_content_boxSignUp_link">????ng k??</p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

export default NavbarMenu;


//PROFILE LU??C ????NG NH????P THA??NH C??NG
// function LoginDropdown() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className='dangnhapthanhcong' id="NavAfterLogIn">
//       <Button
//         className="btnUser"
//         style={{ borderRadius: "10px" }}
//         aria-controls="simple-menu"
//         aria-haspopup="true"
//         onClick={handleClick}
//       >

//         {/* //Ch???? T??n ng??????i du??ng na??y pha??i s????a , kh??ng th???? ?????? t??n c????ng ????????c */}
//         <p>
//           <BsPeopleCircle style={{ color: "rgb(7, 112, 205)" }} /> Ti????n{" "} 
//           <RiArrowDropDownLine />
//         </p>
//       </Button>
//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <label>Ta??i Khoa??n</label>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/TaiKhoan">
//             <FaMale /> Chi??nh S????a H???? S??
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <FaCoins /> ??i????m th??????ng cu??a t??i
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <FaRegCreditCard /> The?? Cu??a T??i
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <RiBillLine /> Danh sa??ch giao di??ch
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <FiBook /> ??????t ch???? cu??a t??i
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <FaRegBell /> Th??ng ba??o gia?? ve?? ma??y bay
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <IoIosPeople /> Passenger Quick Pick
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <FiMail /> Khuy????n ma??i
//           </NavLink>
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <NavLink to="/">
//             <RiLogoutBoxRLine /> ????ng Xu????t
//           </NavLink>
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }


