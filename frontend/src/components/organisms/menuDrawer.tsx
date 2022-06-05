import AddBoxIcon from '@mui/icons-material/AddBox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FindInPageIcon from '@mui/icons-material/FindInPage';
//Icons
import HomeIcon from "@mui/icons-material/Home";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AccountWallet } from "components/atoms";
import Identicon from "components/atoms/identicon";
import * as React from "react";
import { useNavigate } from "react-router-dom";


type Anchor = "right";

export default function MenuDrawer() {

  const navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <div className="flex flex-col justify-center items-center my-5">
        <Identicon></Identicon></div>
      
        <Divider />
        <ListItem button key={'Inicio'} onClick={()=> navigate('/home')}>
          <ListItemIcon>
            <HomeIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary={'Inicio'} />
        </ListItem>
        <ListItem button key={'Organización'} onClick={()=> navigate('/organization')}>
          <ListItemIcon>
            <HomeWorkIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary={'Organización'} />
        </ListItem>
        <Divider />
        <ListItem button key={'Activos'} onClick={()=> navigate('/assets')}>
          <ListItemIcon>
            <InventoryIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary={'Activos'} />
        </ListItem>
        <ListItem button key={'Búsqueda'} onClick={()=> navigate('/assets/search')}>
          <ListItemIcon>
            <FindInPageIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary={'Búsqueda'} />
        </ListItem>
        <ListItem button key={'Nuevo Activo'} onClick={()=> navigate('/assets/new')}>
          <ListItemIcon>
            <AddBoxIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary={'Nuevo Activo'} />
        </ListItem>
        <Divider />
        <ListItem button key={'Departamentos'} onClick={()=> navigate('/departments')}>
          <ListItemIcon>
            <HomeWorkIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary={'Departamentos'} />
        </ListItem>
        <ListItem button key={'Nuevo Departamento'} onClick={()=> navigate('/departments/new')}>
          <ListItemIcon>
            <AddBoxIcon color="primary"/>
          </ListItemIcon>
          <ListItemText primary={'Nuevo Departamento'} />
        </ListItem>
        <Divider />
        <ListItem button key={'Usuarios'} onClick={()=> navigate('/users')}>
          <ListItemIcon>
            <AssignmentIndIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={'Usuarios'} />
        </ListItem>

        <Divider />
        <ListItem button key={'Salir'} onClick={()=> {
          window.localStorage.clear();
          navigate('/login');}}>
          <ListItemIcon>
            <LogoutIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={'Cerrar Sesión'} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>
        {"right"}
        <AccountWallet />
      </Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
