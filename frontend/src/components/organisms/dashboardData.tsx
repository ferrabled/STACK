import DataBox from "components/atoms/statBox";
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useNavigate } from "react-router-dom";



const DashboardData = () => {
    const navigate = useNavigate();
    
    //TODO OBTAIN VALUES
    return (
        <div className="grid grid-cols-3 gap-7">
          <a className="cursor-pointer hover:shadow-xl" onClick={()=> navigate("/assets")}>
          <DataBox
            title="Activos Editados"
            active={10 || 0}
            total={10 || 0}
            icon={<InventoryIcon color="primary" />}
            color="success"
          /></a>
          <a className="cursor-pointer hover:shadow-xl" onClick={()=> navigate("/users")}>
          <DataBox
            title="Usuarios"
            active={10 || 0}
            total={10 || 0}
            icon={<AssignmentIndIcon color="primary" />}
            color="primary"
          /></a>
          <a className="cursor-pointer hover:shadow-xl" onClick={()=> navigate("/assets/deleted")}>
          <DataBox
            title="Activos Eliminados"
            active={10 || 0}
            total={10 || 0}
            icon={<InventoryIcon color="primary" />}
            color="warning"
          /></a>
        </div>
    )
}

export default DashboardData;