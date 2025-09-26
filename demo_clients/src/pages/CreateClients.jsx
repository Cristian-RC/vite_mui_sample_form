import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import NavBar from "../components/NavBar";
import { saveClient } from "../store/clientStore";
import { useNavigate } from "react-router-dom";

const GENDER_OPTIONS = [
    { value: "select", label: "Select" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];

const schema = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, "Name must be at least 3 characters"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
    phone: z.string({ required_error: "Phone is required"}).regex(/^\d{10}$/g, "Phone must be 10 digits"),
    birthdate: z.string({ required_error: "Birthdate is required"}).refine((s) => !Number.isNaN(Date.parse(s)), "Invalid date"),
    gender: z.enum([ "male", "female", "other",  ], { required_error: "Select a gender" }),
}).refine((data) => {
    const age = Math.floor((Date.now() - new Date(data.birthdate).getTime()) / 31557600000);
    return age >= 18;
}, {
    path: ["birthdate"],
    message: "Only adults are allowed",
});


export default function CreateClient() {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            birthdate: "",
            gender: "select",
        },
    });


    const onSubmit = (data) => {
        const saved = saveClient({ ...data, createAt: new Date().toISOString() });
        reset();
        navigate(`/clients?created=${saved.id}`);
    };

    return (
        <>
            <NavBar />
            <Container sx={{ py:4  }}>
                <Paper sx={{ py:3, px:2 }}>
                    <Typography variant="h6" gutterBottom>
                        New Client
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            { ...field }
                                            label="Full name"
                                            fullWidth
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            { ...field }
                                            label="Email"
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            { ...field }
                                            label="Phone"
                                            type="tel"
                                            fullWidth
                                            slotProps={{ htmlInput: {
                                                inputMode: "numeric",
                                                type: "tel",
                                                maxLength: 10,
                                                pattern: "[0-9]*",
                                            } }}
                                            error={!!errors.phone}
                                            helperText={errors.phone?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="birthdate"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            { ...field }
                                            label="Birthdate"
                                            type="date"
                                            slotProps={{ inputLabel: { shrink: true } }}
                                            fullWidth
                                            error={!!errors.birthdate}
                                            helperText={errors.birthdate?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            { ...field }
                                            name="gender"
                                            label="Gender"
                                            defaultValue={"select"}
                                            slotProps={{ inputLabel: { shrink: true }, }}
                                            select
                                            fullWidth
                                            error={!!errors.gender}
                                            helperText={errors.gender?.message}
                                        >
                                            { GENDER_OPTIONS.map(opt => (
                                                <MenuItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Box mt={3} display={"flex"} gap={2} >
                            <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
                            <Button type="button" variant="outlined" onClick={() => reset()} >Cancel</Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};