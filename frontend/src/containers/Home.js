import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';

import contractImage from '../contract_home.png'
import { ReactComponent as ContractImage } from '../contract_img.svg';


import ContractItem from '../components/ContractItem';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createMuiTheme({

    // typography: {
    //     fontFamily: ['"Montserrat"', 'Open Sans'].join(',')
    // },

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
        background: "#fdfdfd"
    },
    title: {
        flexGrow: 1,
    },
    margin: {
        margin: theme.spacing(3),
    },

    actionsContainer: {
        marginBottom: theme.spacing(2),
    },

    resetContainer: {
        padding: theme.spacing(3),
    },

    divUpload: {
        margin: theme.spacing(3),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },

    fab: {
        position: 'absolute',
        bottom: theme.spacing(6),
        right: theme.spacing(6),
        height: '75px',
        width: '75px'
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
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
        id: "",
        name: "",
        description: "",
    }

    const initialUser = {
        nume: "",
        prenume: "",
        id: "",
        token: ""
    }

    const [descriere, setDescriere] = useState("");

    const [contractList, setContractList] = useState([]);
    const [user, setUser] = useState(initialUser);
    const [uploadedContract, setUploadedContract] = useState(initialContract);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openDialog, setOpen] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const getContracte = (id, token) => {
        fetch(`http://localhost:8080/api/contracts/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-type': 'application/json'
            }
        })
            .then(result =>
                result.json()
            )
            .then(data =>
                setContractList(data.contracts)
            )
    }

    useEffect(() => {
        setUser({
            nume: location.state.state.user.firstName,
            prenume: location.state.state.user.lastName,
            id: location.state.state.user.id,
            token: location.state.state.token
        })
        console.log(user)

        getContracte(location.state.state.user.id, location.state.state.token)
        // const interval = setInterval(() => { getContracte(location.state.state.user.id, location.state.state.token) }, 500);
        // clearInterval(interval);
        // return () => clearInterval(interval);

    }, [location])


    const handleLogout = () => {
        fetch(`http://localhost:8080/api/users/logout`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Content-type': 'application/json'
            }
        }).then(history.push('/'))
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleUpload = () => {

        const formData = new FormData()
        formData.append('contract', selectedFile)

        fetch(`http://localhost:8080/api/upload/${user.id}`, {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token,
                'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            body: formData

        }).then(response =>
            response.json()
        ).then(data => {
            setUploadedContract(data)
            console.log(uploadedContract.description)
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const saveContract = () => {

        //ii dau un obiect de tip Document pe care vreau sa l salveze apoi si in tabela Contracts

        fetch(`http://localhost:8080/api/document/${uploadedContract.id}`, {
            method: 'POST',
            headers: {
                // 'Authorization': 'Bearer ' + user.token,
                'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            },
            // body: formData

        }).then(response =>
            response.json()
        ).then(data => {
            console.log(data)
        })
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        // console.log(activeStep)

        if (activeStep === 0) {
            const formData = new FormData()
            formData.append('contract', selectedFile)

            fetch(`http://localhost:8080/api/upload/${user.id}`, {
                // mode: 'no-cors',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token,
                    'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                },
                body: formData

            }).then(response =>
                response.json()
            ).then(data =>
                setUploadedContract(data.contract)
            )
                .catch((error) => {
                    console.error('Error:', error);
                });
            setDescriere(uploadedContract.description)
            console.log(descriere)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if (activeStep === 1) {
            //update descriere editata de utilizator
            fetch(`http://localhost:8080/api/document/${uploadedContract.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ descriere })

            }).then(response =>
                response.json()
            ).then(data =>
                console.log(uploadedContract.description)
            )
                .catch((error) => {
                    console.error('Error:', error);
                });

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if (activeStep === 2) {
            //salveaza in colectia de contracte si
            fetch(`http://localhost:8080/api/document/${uploadedContract.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(response =>
                response.json()
            )
                .catch((error) => {
                    console.error('Error:', error);
                });

            //reincarca lista de contracte din grid
            getContracte(user.id, user.token);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setIsFilePicked(false);
        setSelectedFile(null);
        setUploadedContract(initialContract);
    };

    const handleChangeInput = event => {
        const { name, value } = event.target;
        setDescriere({ ...descriere, [name]: value });
        //setDescriere(event.target.value)
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <DocumentUpload />;
            case 1:
                return <DescriptionArea />;
            case 2:
                return `Pentru a salva contractul în cadrul platformei, apăsați butonul next.`;
            default:
                return 'Unknown step';
        }
    }

    function getSteps() {
        return ['Selectează un document', 'Editează datele extrase', 'Salvează documentul'];
    }

    const DocumentUpload = () => {
        return (
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
                    <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />} >Alege document</Button>
                </label>
                {isFilePicked ? (
                    <p className={classes.docDetail}>Document selectat: {selectedFile.name}</p>
                ) : (
                    <p className={classes.docDetail}> </p>
                )}
            </div>
        )
    }

    const DescriptionArea = () => {
        return (

            <div>
                <Typography className={classes.docDetail} style={{ margin: theme.spacing(1) }} variant="body2" > Aceasta este sinteza contractului selectat. Puteți șterge din datele afișate sau adăuga alte detalii relevante.</Typography>

                <TextField
                    id="outlined-multiline-static"
                    name="description"
                    multiline
                    rows={7}
                    defaultValue={uploadedContract.description}
                    onChange={handleChangeInput}
                    style={{ textTransform: 'none' }}
                    variant="outlined"
                    fullWidth
                />
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="relative">
                    <Toolbar>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <Typography className={classes.title} variant="h6" > {user.nume + ' ' + user.prenume}</Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Caută…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={event => { setSearchTerm(event.target.value) }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>

                <Fab color="secondary" aria-label="add" className={classes.fab} onClick={handleClickOpenDialog}>
                    <AddIcon />
                </Fab>

                <Dialog
                    fullWidth
                    maxWidth="md"
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"

                >
                    <DialogContent>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>{getStepContent(index)}</Typography>
                                        <div className={classes.actionsContainer}>
                                            <div>
                                                <IconButton
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    <ArrowBackIcon />
                                                </IconButton>
                                                <IconButton
                                                    variant="contained"
                                                    disabled={isFilePicked === false}
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    <ArrowForwardIcon />
                                                </IconButton>

                                            </div>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                                <Typography>Documentul a fost salvat în colecție.</Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Încarcă un alt document
                                </Button>
                            </Paper>
                        )}
                    </DialogContent>
                </Dialog>

                {/* <div className={classes.divUpload}> */}
                {/* <div className={classes.divInput}>

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
                            <Button variant="outlined" color="primary" component="span" startIcon={<CloudUploadIcon />} >Alege document</Button>
                        </label>
                        {isFilePicked ? (
                            <p className={classes.docDetail}>Document selectat: {selectedFile.name}</p>
                        ) : (
                            <p className={classes.docDetail}>Selectează un contract.</p>
                        )}
                    </div> */}

                {/* {isFilePicked ? (
                        <Button onClick={handleUpload} variant="contained" color="primary"> Încarcă document </Button>
                    ) : (
                        <Button onClick={handleUpload} variant="contained" color="primary" disabled> Încarcă document </Button>
                    )} */}

                {/* </div> */}

                {/* 
                <DropzoneArea
                    acceptedFiles={['application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                    dropzoneText={"Adaugă un document"}
                    onChange={(files) => console.log('Files:', files)}
                /> */}

                {/* <Divider variant="middle" /> */}

                {contractList.length===0 ? (
                    <div>
                        <ContractImage style={{ maxWidth: '500', display: 'block', marginLeft: 'auto', marginTop: '10%', marginRight: 'auto'}} />
                    </div>
                ) : (
                    <div style={{ padding: 20 }}>
                        <Grid container direction="row" alignItems="flex-start" justify="space-around">
                            {contractList.filter((contract) => {
                                if (searchTerm === '') {
                                    return contract
                                }
                                else if (contract.name.toLowerCase().includes(searchTerm.toLowerCase()) || contract.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                                    return contract
                                }
                            }).map((contract) => <ContractItem contract={contract} />)}
                        </Grid>
                    </div>
                )}

            </div>
        </ThemeProvider>
    );
}

export default Home;