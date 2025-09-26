import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "../auth";


export default function NavBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true })
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Nene Clients
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                    <Button color="inherit" component={RouterLink} to="/home">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/new_client">
                        Add clients
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/clients">
                        Clients
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}