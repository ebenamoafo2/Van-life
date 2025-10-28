import { NavLink, Outlet } from 'react-router-dom';

export default function HostLayout() {

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink 
                    to="." // or we can use "."
                    end // 👈 ensures this link is only active on /host (not on nested routes like /host/income)
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Dashboard
                </NavLink>
                
                <NavLink 
                    to="income"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Income
                </NavLink>

                <NavLink 
                    to="vans"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Vans
                </NavLink>
                
                <NavLink 
                    to="reviews"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Reviews
                </NavLink>

                

                
            </nav>
            <Outlet />
        </>
    )
}