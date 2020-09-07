import React from 'react';
import '../App.css';
import './Home.css';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';
import TempHandler from '../containers/TempHandler';
import MassHandler from '../containers/MassHandler';
import LengthHandler from '../containers/LengthHandler'

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

export default function Home(props) {
	const classes = useStyles();
	const state = props.memo;

	const removeItem = (id) => {
		return props.delete(id);
	};

	function renderRow(props) {
		const memo = state;
		const { index, style } = props;

		const resObj = {
			init: memo[index].initValue,
			initU: memo[index].initUnit,
			res0: memo[index].results,
			res1: memo[index].results[0],
			res2: memo[index].results[1],
			res3: memo[index].results[2],
			unit: memo[index].resultsUnit
		};

		if (memo[index].cat === 'temperature') {
			return (
				<TempHandler
					style={style}
					id={index}
					name={memo[index].cat}
					memo={memo}
					resObj={resObj}
					removeItem={removeItem}
				/>
			);
		} else if (memo[index].cat === 'mass') {
			return (
				<MassHandler 
					style={style}
					id={index}
					name={memo[index].cat}
					memo={memo}
					resObj={resObj}
					removeItem={removeItem}
				/>
			);
		} else if (memo[index].cat === 'length') {
			return (
				<LengthHandler 
					style={style}
					id={index}
					name={memo[index].cat}
					memo={memo}
					resObj={resObj}
					removeItem={removeItem}
				/>
			);
		} else {
			return null;
		}
	}

	return (
		<div className="action_container">
			{state.length === 0 ? (
				<Alert severity="info">
					<AlertTitle>{props.name}</AlertTitle>
					This is an info alert — <strong>No results have been saved!</strong>
				</Alert>
			) : (
				''
			)}
			{state.length !== 0 ? (
				<div>
					<div className="action_tittle">saved results:</div>
					<div className="home_history_field">
						<div className={classes.root}>
							<FixedSizeList height={400} width={800} itemSize={55} itemCount={state.length}>
								{renderRow}
							</FixedSizeList>
						</div>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}