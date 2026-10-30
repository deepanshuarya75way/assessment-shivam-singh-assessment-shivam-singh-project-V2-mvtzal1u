import { useContext } from "react";
import { Outlet, Navigate, NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Dashboard = () => {
    let { userAuth: { access_token } } = useContext(UserContext);

   
    if (!access_token) {
        return <Navigate to="/signin" />;
    }

    return (
        <section className="relative flex gap-10 py-0 m-0 max-md:flex-col">
            
            <div className="sticky top-[80px] z-30 flex md:flex-col gap-2 p-4 md:w-[220px] md:min-h-[calc(100vh-80px)] border-r border-grey bg-white">
                <h2 className="text-dark-grey text-xs font-semibold uppercase tracking-wider mb-2 hidden md:block">
                    Dashboard
                </h2>

                <NavLink
                    to="/dashboard/blogs"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all ${
                            isActive ? "bg-grey text-black font-semibold" : "text-dark-grey hover:bg-grey/50"
                        }`
                    }
                >
                    <i className="fi fi-rr-document"></i>
                    <span>Blogs</span>
                </NavLink>

                <NavLink
                    to="/dashboard/notifications"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all ${
                            isActive ? "bg-grey text-black font-semibold" : "text-dark-grey hover:bg-grey/50"
                        }`
                    }
                >
                    <i className="fi fi-rr-bell"></i>
                    <span>Notifications</span>
                </NavLink>

                <h2 className="text-dark-grey text-xs font-semibold uppercase tracking-wider mt-6 mb-2 hidden md:block">
                    Settings
                </h2>

                <NavLink
                    to="/settings/edit-profile"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all ${
                            isActive ? "bg-grey text-black font-semibold" : "text-dark-grey hover:bg-grey/50"
                        }`
                    }
                >
                    <i className="fi fi-rr-user"></i>
                    <span>Edit Profile</span>
                </NavLink>

                <NavLink
                    to="/settings/change-password"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-all ${
                            isActive ? "bg-grey text-black font-semibold" : "text-dark-grey hover:bg-grey/50"
                        }`
                    }
                >
                    <i className="fi fi-rr-lock"></i>
                    <span>Change Password</span>
                </NavLink>
            </div>

            <div className="flex-1 w-full max-w-[1100px] p-6 max-md:p-3">
                <Outlet />
            </div>
        </section>
    );
};

export default Dashboard;