import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 10,
    whiteSpace: 'pre-line'
  },

  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    // color: theme.palette.grey[500],
  },

  dialogPaper: {
    minWidth: '130vh',
    whiteSpace: 'pre-line'
  }
});

export default function ContractItem(props) {

  const classes = useStyles();

  const [status, setStatus] = useState();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [text, setText] = useState('');

  const getText = (id) => {
    fetch(`http://localhost:8080/api/contract/text/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(result =>
        result.json()
      )
      .then(data =>
        setText(data.text)
      )
  }

  const handleDownload = () => {
    fetch(`http://localhost:8080/api/download/${props.contract.id}`, {
      method: 'GET'
    })
      .then(result => result.blob())
      .then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = props.contract.name;
        a.click();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/contracts/${props.contract.id}`, {
      method: 'DELETE'
    }).then(() => {
      setStatus('Delete successful')
    })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      getText(props.contract.id);
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent onClick={handleClickOpen('body')}>
          <Typography gutterBottom variant="h6" component="h4">
            {props.contract.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ textTransform: 'none' }} >
            {props.contract.description}
          </Typography>
        </CardContent>
        <Dialog
        classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          autoDetectWindowHeight={false}
          style={{ width: "1000" }}
          contentStyle={{ minWidth: "1000", maxWidth: "none" }}
        >
          <DialogTitle id="scroll-dialog-title">{props.contract.name}</DialogTitle>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Divider variant="middle" />
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              style={{ textTransform: 'none' }}
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              component="p"
              style={{ textTransform: 'none' }}
            > {text} </DialogContentText>
            {/* <Typography id="scroll-dialog-description" color="textSecondary" ref={descriptionElementRef} tabIndex={-1} component = "p" style={{ textTransform: 'none' }} >
              {text}
            </Typography> */}
          </DialogContent>
        </Dialog>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleDownload} size="small" color="primary"> Descarcă </Button>
        <Button onClick={handleDelete} size="small" color="primary"> Șterge </Button>
      </CardActions>
    </Card>
  );
}