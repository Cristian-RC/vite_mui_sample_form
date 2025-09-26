import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import NavBar from "../components/NavBar";
import { deleteClient, getClients } from "../store/clientStore";
import { useSearchParams } from "react-router-dom";


export default function Clients() {
    const [ rows, setRows ] = useState([]);
    const [ searchParams ] = useSearchParams();
    const created = searchParams.get("created");

    useEffect(() => {
        const list = getClients();
        const migrated = list.map(c => {
            let ts = c.createdAt ?? c.createAt ?? null;

            if (!ts) ts = new Date().toISOString();
            if (typeof ts === "number") ts = new Date(ts).toISOString();

            const d = new Date(ts);
            if (!Number.isNaN(d.getTime())) ts = d.toISOString();

            const { createAt, ...rest } = c;
            return { ...rest, createdAt: ts };
        });
        setRows(migrated);
        localStorage.setItem("nene_clients", JSON.stringify(migrated));
    }, []);

    const highlightId = useMemo(() => created, [created]);

    const remove = (id) => {
        deleteClient(id);
        setRows((r) => r.filter((x) => x.id !== id));
    };


    return (
        <>
            <NavBar />
            <Container sx={{ py: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                        <Typography variant="h6">Clients</Typography>
                        <Typography variant="body2" color="text.secondary">Total: {rows.length}</Typography>
                    </Box>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Created at</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((r) => {
                                    const age = Math.floor(
                                        (Date.now() - new Date(r.birthdate).getTime()) / 31557600000
                                    );
                                    const isNew = highlightId === r.id;
                                    const createdRaw = r.createdAt ?? r.createAt ?? r.created_at ?? null;
                                    let createdLabel = "-";
                                    if (createdRaw != null) {
                                        const d = new Date(createdRaw);
                                        if (!Number.isNaN(d.getTime())) {
                                            createdLabel = d.toLocaleString("es-MX", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            });
                                        }
                                    }
                                    return (
                                        <TableRow key={r.id} 
                                            hover sx={{ 
                                                outline: isNew ? "2px solid" : "none", 
                                                outlineColor: isNew ? "success.main" : "transparent" }}
                                            >
                                                <TableCell>{r.name}</TableCell>
                                                <TableCell>{r.email}</TableCell>
                                                <TableCell>{r.phone}</TableCell>
                                                <TableCell>{age}</TableCell>
                                                <TableCell>
                                                    <Chip label={r.gender} size="small"/>
                                                </TableCell>
                                                <TableCell>
                                                    {createdLabel}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button color="error" size="small" onClick={() => remove(r.id)} >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                        </TableRow>
                                    );
                                })}
                                { rows.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            <Typography variant="body2" color="text.secondary">
                                                No clients found. Please add some clients.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </>
    );
};