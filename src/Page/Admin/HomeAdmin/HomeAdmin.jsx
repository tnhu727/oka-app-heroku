import React from 'react';
import { Link } from 'react-router-dom';
import './HomeAdmin.scss';

function HomeAdmin() {
    window.addEventListener('load', () => {
        // document.getElementById("_date").placeholder = 'Date';
        // document.getElementById("txtXinChao").innerHTML = "Xin chào " + localStorage.getItem("Ten");
    })

    function LogOut(){
      localStorage.removeItem("TOKENADMIN");
      window.location.href = "/admin/login";
    }
    return (
        
<div>
<div id="sidebar-main" className="sidebar sidebar-default sidebar-separate sidebar-fixed">
  <div className="sidebar-content">
    <div className="sidebar-category sidebar-default">
      <div className="sidebar-user">
        <div className="category-content">
          <small>Admin</small>
        </div>
      </div>
    </div>
    <div className="sidebar-category sidebar-default">
        <div className="category-title">
          <span>Danh Sách</span>
        </div>
      <div className="category-content">
        <ul id="fruits-nav" className="nav flex-column">
          <li className="nav-item">
            <Link to='/admin/listuser'>
              <i className="fa fa-pencil" aria-hidden="true"></i>
              Danh Sách Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/listpartner' >
              <i className="fa fa-pencil" aria-hidden="true"></i>
              Danh Sách Partner
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/admin/thongkeuser'>
              <i className="fa fa-pencil" aria-hidden="true"></i>
              Thống Kê
            </Link>
          </li>

          <li>
            <input type="button" class="btn btn-danger" value="Đăng xuất" id="LogOutPartner" onClick={LogOut} to="/admin/login"/>
          </li>
          
          
        </ul>
        
      </div>
     
    </div>
   
    
   
  </div>
</div>

<div className="content-wrapper">
  <div className="row clearfix">
    <div className="col-xs-12">
      {/* <h2>Hello World</h2> */}
    </div> 
  </div> 
</div> 
</div>
    )
}
export default HomeAdmin;