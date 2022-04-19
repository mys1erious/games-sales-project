import React from "react";
import { Link } from "react-router-dom";


const ListItem = ( {sale} ) => {
    return(
        <li>
            <Link to={`/sales/${sale.uuid}`}>
                <div>
                    <h3>{sale.game.name}</h3>
                </div>
            </Link>
        </li>
    );
}


export default ListItem;
