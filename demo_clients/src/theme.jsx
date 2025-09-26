import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    pallete: {
        mode: "light",
        primary: { main: "#1976D2" },
        secondary: { main: "#9C27B0" },
    },
    shape: { borderRadius: 12 },
});

export default theme;