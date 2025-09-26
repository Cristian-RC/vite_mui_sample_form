import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import { login, isAuthenticated } from "../auth";
import { Container, flex } from "@mui/system";


export default function Login() {
    const navigate = useNavigate();
    const [ values, setValues ] = useState({ 
        email: "",
        password: "",
     });
     const [ error, setError ] = useState("");

     if (isAuthenticated()) return <Navigate to={"/home"} replace />

     const handleChange = (e) => {
        setValues((s) => ({ ...s, [e.target.name]: e.target.value }));
     };

     const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            setError("Email and password are required");
            return;
        }
        const ok = login(values);
        if (ok) navigate("/home", { replace: true });
        else setError("Invalid credentials");
     };

     return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display={flex} flexDirection={"column"} alignItems={"center"} gap={2}>
                    
                    <Icon 
                        sx={{ 
                            bgcolor: "primary.main", 
                            width: 56, 
                            height: 56, 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            borderRadius: "50%" 
                            }}>
                        <Avatar sx={{ bgcolor: "primary.main" }}></Avatar>
                    </Icon>
                    
                    <Typography variant="h4" sx={{ p:2 }} >Login</Typography>
                    <Box component="form" onSubmit={handleSubmit} width="100%" display={"grid"} gap={2} >
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            required
                        />
                        {error && (
                            <Typography color="error" variant="body2">{error}</Typography>
                        )}
                        <Button type="submit" variant="contained" size="large">
                            Login
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
     );
}