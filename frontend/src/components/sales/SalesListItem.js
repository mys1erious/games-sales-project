import React from "react";
import {ReactComponent as GameIcon} from "../../assets/game_icon.svg";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import './SalesListItem.css';
import {Expand, ExpandLess, ExpandMore} from "@mui/icons-material";

const SalesListItem = ( {sale} ) => {
    const [open, setOpen] = React.useState(false);

    const handleInfoClick = () => {
        setOpen(!open);
    };

    return(
        <React.Fragment>
            <ListItem
                sx={{width: '100%', maxWidth: 360}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                divider={true}
                disablePadding>
                <ListItemButton
                    sx={{width: '90%'}}
                    href={`/sales/${sale.uuid}`}>
                    <ListItemIcon>
                        <GameIcon className="icon" />
                    </ListItemIcon>
                    <ListItemText primary={sale.game.name} />
                </ListItemButton>
                <ListItemButton
                    onClick={handleInfoClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="sdajdadj;adadladdj;" />
                  </ListItemButton>
                </List>
            </Collapse>
        </React.Fragment>
    );
};


export default SalesListItem;
