import React from 'react';
import '../App.css';
import '../components/Home.css';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		height: 400,
		maxWidth: 300
	},
	listItem: {
		textTransform: 'capitalize',
	}
}));

export default function MassHandler(props) {
	const classes = useStyles();

	return (
		<ListItem style={props.style} key={props.id}>
			<ListItemText className={classes.listItem} primary={`Result ${props.id + 1} - ${props.name} `} />
			<ListItemText>
				<b>
					{props.resObj.init} {props.resObj.init <= 1 ? props.resObj.initU : props.resObj.initU.concat('s')}
				</b>{' '}
				equals{' '}
				<b>
					{props.resObj.res0}{' '}
					{props.resObj.res0 <= 1 ? (
						props.resObj.unit.substring(0, props.resObj.unit.length - 1)
					) : (
						props.resObj.unit
					)}
				</b>
			</ListItemText>
			<IconButton aria-label="delete" className={classes.margin} onClick={() => props.removeItem(props.id)}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
}
