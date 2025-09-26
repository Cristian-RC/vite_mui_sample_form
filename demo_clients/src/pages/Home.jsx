import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import NavBar from "../components/NavBar";


export default function Home() {
    return (
        <>
            <NavBar />
            <Container sx={{ p: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Welcome to Nene Clients
                    </Typography>
                    <Typography>
                        This is a simple client management application built with React and Material-UI.
                    </Typography>
                </Paper>
            </Container>
        </>
    )
}