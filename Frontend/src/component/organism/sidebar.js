import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import UserData from '../../features/authentication/UserData';
import axios from 'axios';

let Sidebar = () => {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([{}]);
  //const { listOfRoles } = ListOfRoles();

  useEffect(() => {
    axios({
        method:"GET",
        url: "http://localhost:8088/api/role"
    }).then((response) => {
       setData(response.data.data)
    }).catch((error) => {
        console.log(error)
    })
  },[status])

  function isHidden(levelMinimum){
    const roles = []
    data.forEach(e => {
      if(e.level >= levelMinimum){
          roles.push(e.name);
      }
    });

    return roles.includes(UserData().role_name) ? false : true;
  }

    return(
        <CDBSidebar textColor="#fff" backgroundColor="#333" fixed collapse>
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              Sidebar
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/" activeClassName="activeClicked" hidden={isHidden(1)}>
                <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/approval_project" activeClassName="activeClicked" hidden={isHidden(3)}>
                <CDBSidebarMenuItem icon="check">Approve Projects</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/employee" activeClassName="activeClicked" hidden={isHidden(3)}>
                <CDBSidebarMenuItem icon="user">Employee Page</CDBSidebarMenuItem>
              </NavLink>
              {/* <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
              </NavLink> */}
              {/* <NavLink exact to="/" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
              </NavLink> */}
              <NavLink exact to="/login" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle">Log Out</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
              Sidebar Footer
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
    )
}
export default Sidebar;