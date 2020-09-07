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
		textTransform: 'capitalize'
	}
}));

export default function TempHandler(props) {
    const classes = useStyles();
    
	return (
		<ListItem style={props.style} key={props.id}>
			<ListItemText className={classes.listItem} primary={`Result ${props.id + 1} - ${props.name}`} />
			{props.resObj.initU === 'K' ? (
				<ListItemText>
					<b>
						{props.resObj.init}
						{props.resObj.initU}
					</b>{' '}
					is equal to{' '}
					<b>
						{props.resObj.res2} <sup>o</sup>C
					</b>
					{' and '}
					<b>
						{props.resObj.res3} <sup>o</sup>F
					</b>
				</ListItemText>
			) : (
				''
			)}
			{props.resObj.initU === 'C' ? (
				<ListItemText>
					<b>
						{props.resObj.init} <sup> o</sup>
						{props.resObj.initU}
					</b>{' '}
					equals{' '} <b>{props.resObj.res1} K</b>
					{' and '}
					<b>
						{props.resObj.res3} <sup>o</sup>F
					</b>
				</ListItemText>
			) : (
				''
			)}
			{props.resObj.initU === 'F' ? (
				<ListItemText>
					<b>
						{props.resObj.init} <sup> o</sup>
						{props.resObj.initU}
					</b>{' '}
					is equal to <b>{props.resObj.res1} K</b>
					{' and '}
					<b>
						{props.resObj.res2} <sup>o</sup>C
					</b>
				</ListItemText>
			) : (
				''
			)}
			<IconButton aria-label="delete" className={classes.margin} onClick={() => props.removeItem(props.id)}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	);
}
