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
import { IconButton } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import ContractItem from '../components/ContractItem';

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
    },
    title: {
        flexGrow: 1,
    },

    divUpload: {
        margin: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    divInput: {
        display: 'flex',
        flexDirection: 'row',
    },

    inputLabel: {
        top: '50%',
        margin: '15px'
    }
}));

function Home(props) {

    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const initialContract = {
        name: "",
        description: "",
    }

    const initialUser = {
        nume: "",
        prenume: "",
        id: "",
        token: ""
    }

    const initialContractList = {
        contracts: ""
    }

    const [contractList, setContractList] = useState();
    const [user, setUser] = useState(initialUser);
    const [uploadedContract, setUploadedContract] = useState(initialContract);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    useEffect(() => {
        setUser({
            nume: location.state.state.user.firstName,
            prenume: location.state.state.user.lastName,
            id: location.state.state.user.id,
            token: location.state.state.token
        })
        console.log(user)

        fetch('http://localhost:8080/api/contracts/' + user.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(result => {
                result.json()
                console.log(result)
            })
            .then(data => {
                console.log(data)
            })

    }, [location])

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleUpload = () => {

        const formData = new FormData()
        formData.append('contract', selectedFile)

        fetch('http://localhost:8080/api/upload/' + user.id, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                //'Content-type': 'application/x-www-form-urlencoded',
            },
            body: formData

        }).then(response => {
            response.json()

        }).then(data => {
            console.log('Success:', data);
            //setUploadedContract(data)
            // uploadedContract.userID = user.id
            // uploadedContract.description = data.description
            // uploadedContract.name = selectedFile.name
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="relative">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" > {user.nume + ' ' + user.prenume}</Typography>
                        <IconButton color="inherit" > <ExitToAppIcon /> </IconButton>
                    </Toolbar>
                </AppBar>

                <div className={classes.divUpload}>
                    <div className={classes.divInput}>

                        <input
                            accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            className={classes.input}
                            id="contained-button-file"
                            style={{ display: 'none' }}
                            type="file"
                            name="contract"
                            onChange={handleChange}
                        />
                        <label className={classes.inputLabel} htmlFor="contained-button-file">
                            <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />} >Alege contract</Button>
                        </label>
                        {isFilePicked ? (
                            <p className={classes.docDetail}>Document selectat: {selectedFile.name}</p>
                        ) : (
                            <p className={classes.docDetail}>Selectează un document.</p>
                        )}
                    </div>

                    <Button onClick={handleUpload} variant="contained" color="primary">
                        Incarcă document </Button>
                </div>

                <Divider variant="middle" />

                <div className={classes.divDashboard}>

                </div>

            </div>
        </ThemeProvider>
    );
}

export default Home;