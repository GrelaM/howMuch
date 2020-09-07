import React, { useReducer } from 'react';
import '../App.css';
import './Temperature.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
	root: {
		margin: '15px',
		borderBottom: '1px solid black',
		borderRadius: 0,
		minWidth: '120px',
		backgroundColor: 'rgba(0,0,0,0.5)',
		color: 'white'
	},
	input: {
		width: '200px',
		alignContent: 'center'
	}
}));

export default function Temperatur(props) {
	const initialTempState = {
		name: [ 'Kelvin', 'Celcius', 'Fahrenheit' ],
		shortName: [ 'K', 'C', 'F' ],
		unit: [ '', 'o', 'o' ],
		unitSet: '',
		unitValue: '',
		results: ''
	};
	const classes = useStyles();
	const [ tempState, dispatch ] = useReducer(reducer, initialTempState);

	function reducer(state, action) {
		const unitCalc = (value, unit) => {
			if (unit === 0) {
				return [
					parseFloat(value.toFixed(2)),
					parseFloat((value - 273.15).toFixed(2)),
					parseFloat((value * 1.8 - 459.67).toFixed(2))
				];
			} else if (unit === 1) {
				return [
					parseFloat((value + 273.15).toFixed(2)),
					parseFloat(value.toFixed(2)),
					parseFloat((value * 1.8 + 32).toFixed(2))
				];
			} else {
				return [
					parseFloat(((value + 459.67) * 5 / 9).toFixed(2)),
					parseFloat(((value - 32) / 1.8).toFixed(2)),
					parseFloat(value.toFixed(2))
				];
			}
		};

		const resAll = {
			...state,
			unitSet: '',
			unitValue: '',
			results: [ '', '', '' ]
		}

		switch (action.type) {
			case 'KALVIN':
				return { ...state, unitSet: action.index, results: unitCalc(state.unitValue, action.index) };
			case 'CELCIUS':
				return { ...state, unitSet: action.index, results: unitCalc(state.unitValue, action.index) };
			case 'FAHRENHEIT':
				return { ...state, unitSet: action.index, results: unitCalc(state.unitValue, action.index) };
			case 'ON_CHANGE':
				if (state.unitSet === '') {
					return { ...state, unitValue: action.value };
				}  else {
					return { ...state, unitValue: action.value, results: () => {unitCalc(action.value, state.index)} };
				}
			case 'RESET':
				return (state = resAll);
			case 'SAVE':
				return (state = resAll);
			default:
				console.log('Action.type is not define!');
		}
	}
	return (
		<div className="action_container">
			<div className="row_direction">
				<TextField
					id="standard-number"
					label="Value"
					type="number"
					className={classes.input}
					InputLabelProps={{
						shrink: true
					}}
					value={tempState.unitValue}
					onChange={(event) => dispatch({ type: 'ON_CHANGE', value: Number(event.target.value) })}
				/>
				<h3 className="temp_unit">
					<sup className="temp_unit_index">{tempState.unit[tempState.unitSet]}</sup>
					{tempState.shortName[tempState.unitSet]}
				</h3>
			</div>
			<div className="row_direction">
				<Button
					className={classes.root}
					onClick={() => dispatch({ type: 'KALVIN', index: 0 })}
					disabled={tempState.unitValue !== '' ? false : true}
				>
					{initialTempState.name[0]}
				</Button>
				<Button
					className={classes.root}
					onClick={() => dispatch({ type: 'CELCIUS', index: 1 })}
					disabled={tempState.unitValue !== '' ? false : true}
				>
					{initialTempState.name[1]}
				</Button>
				<Button
					className={classes.root}
					onClick={() => dispatch({ type: 'FAHRENHEIT', index: 2 })}
					disabled={tempState.unitValue !== '' ? false : true}
				>
					{initialTempState.name[2]}
				</Button>
			</div>
			<div className="action_result row_direction">
				<div className="temp_results">
					{tempState.results[0]}
					<sup className="temp_unit_index">{tempState.unit[0]}</sup>
					{tempState.shortName[0]}
				</div>
				<div className="temp_results">
					{tempState.results[1]}
					<sup className="temp_unit_index">{tempState.unit[1]}</sup>
					{tempState.shortName[1]}
				</div>
				<div className="temp_results">
					{tempState.results[2]}
					<sup className="temp_unit_index">{tempState.unit[2]}</sup>
					{tempState.shortName[2]}
				</div>
			</div>
			<div className="row_direction">
				<Button
					className={classes.root}
					onClick={() => dispatch({ type: 'RESET' })}
					disabled={tempState.unitValue !== '' ? false : true}
				>
					{props.calcOption[0]}
				</Button>
				<Button
					onClick={() =>
						dispatch({
							type: 'SAVE',
							ation: props.save(
								'temperature',
								tempState.unitValue,
								tempState.shortName[tempState.unitSet],
								tempState.results
							)
						})}
					className={classes.root}
					disabled={
						tempState.unitSet !== '' && tempState.unitValue !== '' && tempState.results !== '' ? (
							false
						) : (
							true
						)
					}
				>
					{props.calcOption[1]}
				</Button>
			</div>
		</div>
	);
}
