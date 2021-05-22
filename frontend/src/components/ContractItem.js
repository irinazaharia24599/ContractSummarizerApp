import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 10
  },
});

export default function ContractItem(props) {

  const classes = useStyles();

  // const initialContract = {
  //   nume: '',
  //   descriere: '',
  // }
  // const [contract, setContract]=useState();
  // setContract(props)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { props.contract.name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          { props.contract.description }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Descarcă
        </Button>
        <Button size="small" color="primary">
          Șterge
        </Button>
      </CardActions>
    </Card>
  );
}