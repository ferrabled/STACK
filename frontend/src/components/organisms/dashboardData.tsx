import DataBox from "components/atoms/statBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useNavigate } from "react-router-dom";

const DashboardData = ({ values }: { values: number[] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-7">
      <a
        className="cursor-pointer hover:shadow-xl"
        onClick={() => navigate("/assets")}
      >
        <DataBox
          title="Activos"
          active={values[0] || 0}
          total={values[0] || 0}
          icon={<InventoryIcon color="primary" />}
          color="primary"
        />
      </a>
      <a
        className="cursor-pointer hover:shadow-xl"
        onClick={() => navigate("/users")}
      >
        <DataBox
          title="Usuarios"
          active={values[3] || 0}
          total={values[3] || 0}
          icon={<AssignmentIndIcon color="primary" />}
          color="primary"
        />
      </a>
      <a
        className="cursor-pointer hover:shadow-xl"
        onClick={() => navigate("/departments")}
      >
        <DataBox
          title="Departamentos"
          active={values[4] || 0}
          total={values[4] || 0}
          icon={<AssignmentIndIcon color="primary" />}
          color="primary"
        />
      </a>
      <a
        className="cursor-pointer hover:shadow-xl"
        onClick={() => navigate("/assets")}
      >
        <DataBox
          title="Activos Editados"
          active={values[1] || 0}
          total={values[0] || 0}
          icon={<InventoryIcon color="primary" />}
          color="success"
        />
      </a>
      <DataBox
          title="Comentarios"
          active={2}
          total={2}
          icon={<AddCommentIcon color="primary" />}
          color="primary"
        />
      <a
        className="cursor-pointer hover:shadow-xl"
        onClick={() => navigate("/assets/deleted")}
      >
        <DataBox
          title="Activos Eliminados"
          active={values[2] || 0}
          total={values[0] || 0}
          icon={<InventoryIcon color="primary" />}
          color="warning"
        />
      </a>
    </div>
  );
};

export default DashboardData;
