import React from 'react';
import './PanelControl.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      border: 0,
      borderRadius: 1,
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      height: 44,
      width: 225,
      padding: '0 30px',
      margin: 10,
      textTransform: 'capitalize',
      "&:hover": {
          backgroundColor: 'rgba(255,255,255,0.4)'
      }
    },
  });


const PanelControl = props => {
    const classes = useStyles(props);
    let categBtn;
    if (props.categories !== '') {
        categBtn = (
            <div>
                {props.categories.map((el, id) => {
                    return (
                        <Button 
                            className={classes.root} 
                            onClick={() => props.clickedBtn(el, id)}
                        >{el}</Button>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="pc_background">
        <div className="pc">
            <div className="pc_title">{props.title}</div>
            {categBtn}
        </div>
        </div>
    );
};

export default PanelControl;
