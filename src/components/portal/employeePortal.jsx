import React, { useState, useEffect } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import logo from "../../assert/logo.png";
import useAuth from "../../hooks/useAuth";

export default function EmployeePortal() {
  const { auth } = useAuth();
  const { user } = auth;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const closeSidebarOnResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", closeSidebarOnResize);

    return () => {
      window.removeEventListener("resize", closeSidebarOnResize);
    };
  }, []);

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* navbar */}
      <nav className="bg-[#0A4754] border-gray-200 px-2 sm:px-4 py-2.5 fixed top-0 left-0 w-full z-40">
        <div className="container flex flex-wrap items-center justify-start mx-auto ">
          <Link to="/" className="flex items-center"></Link>
          <div
            className="hidden w-full md:block md:w-auto ml-auto"
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
              <>
                <li>
                  <Link
                    to="#"
                    className="block py-2 pl-3 pr-4  text-secondary rounded  hover:text-gray-800 md:bg-transparent md:p-0 "
                    style={{ color: "#FFFFFF" }}
                  >
                    {user}
                  </Link>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4  text-secondary rounded  hover:text-gray-800 md:bg-transparent md:p-0 "
                  >
                    Logout
                  </Link>
                </li>
              </>
            </ul>
          </div>
        </div>
      </nav>

      {/* side bar */}
      {sidebarOpen && (
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 mt-11 py-4 overflow-y-auto bg-[#0A4754]">
            <div>
              <img
                src={logo}
                alt="logo"
                className="w-[120px] h-[160px] mx-auto mt-5"
              ></img>
            </div>

            <div className="my-6 ">
              <NavLink
                to="/loginpage/employee/employeeform"
                className="bg-[#ffffff] px-[15px] hover:bg-[#797979] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
                onClick={handleNavLinkClick}
              >
                NEW TASK
              </NavLink>

              <NavLink
                to="/loginpage/employee/employeetasks"
                className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
                onClick={handleNavLinkClick}
              >
                ALL TASKS
              </NavLink>

              <NavLink
                to="/employee/pendingtasks"
                className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
                onClick={handleNavLinkClick}
              >
                PENDING TASKS
              </NavLink>

              <NavLink
                to="/employee/submitreport"
                className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
                onClick={handleNavLinkClick}
              >
                REPORTS
              </NavLink>

              <NavLink
                to={`/employee/updatepass/${user}`}
                className="bg-[#ffffff] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-black text-[10px] block w-[150px] text-center mb-7 mx-auto"
                onClick={handleNavLinkClick}
              >
                UPDATE PASSWORD
              </NavLink>
            </div>
          </div>
        </aside>
      )}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          aria-controls="default-sidebar"
          type="button"
          className={`inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden ${
            sidebarOpen ? "hidden" : "block"
          } hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5`.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      )}
      <Outlet />
    </>
  );
}
