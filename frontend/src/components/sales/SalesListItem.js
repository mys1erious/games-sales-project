import React from "react";
import {ReactComponent as GameIcon} from "../../assets/game_icon.svg";
import {Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import './SalesListItem.css';
import { ExpandLess, ExpandMore} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


const ListItemWidth = 460;


const ListItemSubText = styled(ListItemText) ({
    width: "100%",
    maxWidth: ListItemWidth,
    paddingLeft: "70px",
});



const SalesListItem = ( {sale} ) => {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleItemClick = () => {
        navigate(`/sales/${sale.uuid}`);
    };

    const handleExpandClick = () => {
        setOpen(!open);
    };

    return(
        <React.Fragment>
            <ListItem
                sx={{width: '100%', maxWidth: ListItemWidth}}
                component="nav"
                divider={true}
                disablePadding>
                <ListItemButton
                    sx={{width: '90%'}}
                    onClick={handleItemClick}
                    >
                    <ListItemIcon>
                        <GameIcon className="icon" />
                    </ListItemIcon>
                    <ListItemText primary={sale.game.name} />
                </ListItemButton>
                <ListItemButton
                    onClick={handleExpandClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ListItemSubText secondary={`Developer: ${sale.game.developer}`}/>
                <ListItemSubText secondary={`Genre: ${sale.game.genre}`}/>
                <ListItemSubText secondary={`Platform: ${sale.game.platform}`}/>
                <ListItemSubText secondary={`Global Sales: ${sale.global_sales}`}/>
            </Collapse>
        </React.Fragment>
    );
};


export default SalesListItem;
