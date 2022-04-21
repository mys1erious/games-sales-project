import React from "react";
import { Link } from "react-router-dom";


const ListItem = ( {sale} ) => {
    return(
        <React.Fragment>
            <li>
                <Link to={`/sales/${sale.uuid}`}>
                    <div>
                        <h3>{sale.game.name}</h3>
                    </div>
                </Link>
            </li>
        </React.Fragment>
    );
}


export default ListItem;
