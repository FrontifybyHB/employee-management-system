import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Common style for NavLink
  const linkStyle = "flex items-center space-x-3 p-4 w-full hover:bg-slate-700 transition-colors duration-200";
  const activeStyle = "bg-slate-700 text-white";
  const inactiveStyle = "text-gray-300";

  const menuItems = [
    {
      path: "/employee",
      icon: "dashboard",
      label: "Dashboard"
    },
    {
      path: "/employee/attendance",
      icon: "schedule",
      label: "Attendance"
    },
    {
      path: "/employee/leave",
      icon: "event_busy",
      label: "Leave"
    },
    {
      path: "/employee/payroll",
      icon: "payments",
      label: "Payroll"
    },
    {
      path: "/employee/profile",
      icon: "person",
      label: "Profile"
    }
  ];

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-slate-800 text-white shadow-lg">
      <div className="flex flex-col py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/employee"}
            className={({ isActive }) => 
              `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <span className="material-icons-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;