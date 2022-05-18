import React from "react";
import {ReactComponent as GameIcon} from "../../assets/game_icon.svg";
import {Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import './SalesListItem.css';
import { ExpandLess, ExpandMore} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const listItemWidth = 400;
const ListItemSubText = styled(ListItemText) ({
    width: listItemWidth,
    paddingLeft: "70px",
});


const SalesListItem = ( {currSale} ) => {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleItemClick = () => {
        navigate(`/sales/${currSale.uuid}`);
    };

    const handleExpandClick = () => {
        setOpen(!open);
    };

    return(
        <React.Fragment>
            <ListItem
                sx={{
                    width: listItemWidth,
                    }}
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
                    <ListItemText primary={currSale.game.name} />
                </ListItemButton>
                <ListItemButton
                    onClick={handleExpandClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ListItemSubText secondary={`Developer: ${currSale.game.developer}`}/>
                <ListItemSubText secondary={`Genre: ${currSale.game.genre}`}/>
                <ListItemSubText secondary={`Platform: ${currSale.game.platform}`}/>
                <ListItemSubText secondary={`Year of Release: ${currSale.game.year_of_release}`}/>
                <ListItemSubText secondary={`Global Sales: ${currSale.global_sales}`}/>
            </Collapse>
        </React.Fragment>
    );
};


export default SalesListItem;
