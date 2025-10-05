import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Common style for NavLink
  const linkStyle = "flex items-center space-x-2 p-4 w-full hover:bg-slate-700 transition-colors duration-200";
  const activeStyle = "bg-slate-700";

  return (
    <aside className="bg-slate-800 text-white w-64 min-h-[calc(100vh-4rem)]">
      <nav className="flex flex-col py-2">
        <NavLink
          to="/employee"
          className={({ isActive }) => 
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <span className="material-icons">dashboard</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employee/profile"
          className={({ isActive }) => 
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <span className="material-icons">person</span>
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee/leave"
          className={({ isActive }) => 
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <span className="material-icons">event_note</span>
          <span>Leave</span>
        </NavLink>

        <NavLink
          to="/employee/attendance"
          className={({ isActive }) => 
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <span className="material-icons">schedule</span>
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/employee/payroll"
          className={({ isActive }) => 
            `${linkStyle} ${isActive ? activeStyle : ''}`
          }
        >
          <span className="material-icons">payments</span>
          <span>Payroll</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;