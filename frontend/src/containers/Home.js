import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { sizing } from '@material-ui/system';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0b3c5d',
        },
        secondary: {
            main: '#d9b310',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

const useStyles = makeStyles((theme) => ({

    body: {
        margin: '0px'
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        margin: '0px'

    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        width: '100%'
    }
}));

function Home(props) {

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const initialContract = {
        description: "",
        type: "",
        name: ""
    }

    const initialUser = {
        nume: "",
        prenume: "",
        token: ""
    }

    const [user, setUser] = useState(initialUser);
    const [uploadedContract, setUploadedContract] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    useEffect(() => {
        setUser({
            nume: location.state.state.user.firstName,
            prenume: location.state.state.user.lastName,
            token: location.state.state.token
        })
        console.log(user)
    }, [location])

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleUpload = () => {

        const formData = new FormData()
        formData.append("contract", selectedFile)

        fetch('http://localhost:8080/api/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                //'Content-Type': 'application/json'
            },
            body: formData
        }).then(response => {
            response.json()
        })
            .then(data => {
                setUploadedContract(data)
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="relative">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" >Contractele mele</Typography>
                        <Button color="inherit">Logout</Button>
                    </Toolbar>
                </AppBar>
                <input
                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className={classes.input}
                    id="contained-button-file"
                    style={{ display: 'none' }}
                    type="file"
                    name="contract"
                    onChange={handleChange}
                />
                {isFilePicked ? (
                    <p>Document selectat: {selectedFile.name}</p>
                ) : (
                    <p>Select a file to show details</p>
                )}
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />} >
                        Alege contract
                </Button>
                </label>
                <Button onClick={handleUpload} variant="outlined" color="primary">
                    Incarca contractul </Button>
            </div>
        </ThemeProvider>
    );
}

export default Home;