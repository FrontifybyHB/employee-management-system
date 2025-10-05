import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    const linkStyle =
        "flex items-center space-x-2 p-4 w-full hover:bg-slate-700 transition-colors duration-200";
    const activeStyle = "bg-slate-700";

    return (
        <aside className="bg-slate-800 text-white w-64 min-h-[calc(100vh-4rem)]">
            <nav className="flex flex-col py-2">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ""}`
                    }
                >
                    <span className="material-icons">dashboard</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/employees"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ""}`
                    }
                >
                    <span className="material-icons">groups</span>
                    <span>Employee Management</span>
                </NavLink>

                <NavLink
                    to="/admin/attendance"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ""}`
                    }
                >
                    <span className="material-icons">schedule</span>
                    <span>Attendance</span>
                </NavLink>

                <NavLink
                    to="/admin/leave"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ""}`
                    }
                >
                    <span className="material-icons">event_note</span>
                    <span>Leave Management</span>
                </NavLink>

                <NavLink
                    to="/admin/payroll"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ""}`
                    }
                >
                    <span className="material-icons">payments</span>
                    <span>Payroll</span>
                </NavLink>

                <NavLink
                    to="/admin/performance"
                    className={({ isActive }) =>
                        `${linkStyle} ${isActive ? activeStyle : ""}`
                    }
                >
                    <span className="material-icons">trending_up</span>
                    <span>Performance</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
