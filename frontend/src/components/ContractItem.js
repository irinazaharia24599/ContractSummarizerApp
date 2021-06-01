import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 10,
    whiteSpace: 'pre-line'
  },
});

export default function ContractItem(props) {

  const classes = useStyles();

  const [status, setStatus] = useState();

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

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h4">
            {props.contract.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{ textTransform: 'none' }} >
            {props.contract.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={handleDownload} size="small" color="primary"> Descarcă </Button>
        <Button onClick={handleDelete} size="small" color="primary"> Șterge </Button>
      </CardActions>
    </Card>
  );
}