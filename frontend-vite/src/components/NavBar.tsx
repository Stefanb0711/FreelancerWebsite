import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "../App.tsx";

export function NavBar() {


    const [signedIn, setSignedIn] = useContext(AuthContext);


    return (

            <nav>
                <Link to="/">Home</Link>

                {signedIn && (
                    <button onClick={() => setSignedIn(false)}>Logout</button>
                )}
                {!signedIn && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/register/step1">Register</Link>
                    </div>

                )}

            </nav>

    );
}