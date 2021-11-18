import React from "react";
import {Link} from "react-router-dom";

class Nav extends React.Component {
    render() {
        const links = this.props.links;

        return (
            <nav>
                <ul>
                    <li><Link className="links" to={links.path}>{links.link}</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Nav;