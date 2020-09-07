import React, { useReducer } from 'react';
import '../App.css';
import './Length.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SwapHorizSharpIcon from '@material-ui/icons/SwapHorizSharp';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
	formControl: {
		margin: '10px 0',
		minWidth: 200,
		color: 'black'
	},
	root: {
		margin: '15px',
		borderBottom: '1px solid black',
		borderRadius: 0,
		minWidth: '120px',
		backgroundColor: 'rgba(0,0,0,0.5)',
		color: 'white'
	},
	input: {
		minWidth: 200,
		alignContent: 'center',
		margin: '10px 0'
	}
}));

export default function Length(props) {
	const classes = useStyles();
	const initialLengthState = {
		imperialUSUnits: [ 'thou', 'line', 'inch', 'foot', 'yard', 'mile', 'league' ],
		siUnits: [ 'millimeters', 'centimeteres', 'meters', 'kilometers' ],
		shortsiUnits: [ 'mm', 'cm', 'm', 'km' ],
		inputValue: '',
		unit1: '',
		unit2: '',
		unit1Id: '',
		unit2Id: '',
		result: ''
	};

	const unfocus = () => {
		setTimeout(() => {
			document.activeElement.blur();
		}, 0);
	};

	const [ lengthState, dispatch ] = useReducer(reducer, initialLengthState);
	function reducer(state, action) {
		const lengthCalc = (value, id, unit2Index) => {
			const toMillimeters = [ 0.0254, 2.1166666667, 25.4, 304.8, 910, 1610000, 4800000 ];
			const toCmMKm = [ 0.1, 0.001, 0.000001 ];

			if (state.unit1 !== '' || state.unit2 !== '' || state.inputValue) {
				if (unit2Index === 0) {
					//MM 
					if (parseFloat(value * toMillimeters[id]) === 0) {
						return Number(parseFloat(value * toMillimeters[id]).toFixed(0));
					} else if (parseFloat(value * toMillimeters[id]) < 0.01) {
						return Number(parseFloat(value * toMillimeters[id]).toFixed(8));
					} else {
						return Number(parseFloat(value * toMillimeters[id]).toFixed(2));
					}
				} else if (unit2Index === 1) {
					//CM
					if (parseFloat(value * toMillimeters[id] * toCmMKm[0]) === 0) {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[0]).toFixed(0));
					} else if (parseFloat(value * toMillimeters[id] * toCmMKm[0]) < 0.01) {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[0]).toFixed(8));
					} else {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[0]).toFixed(2));
					}
				} else if (unit2Index === 2) {
					//M
					if (parseFloat(value * toMillimeters[id] * toCmMKm[1]) === 0) {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[1]).toFixed(0));
					} else if (parseFloat(value * toMillimeters[id] * toCmMKm[1]) < 0.01) {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[1]).toFixed(8));
					} else {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[1]).toFixed(2));
					}
				} else if (unit2Index === 3) {
					//KM
					if (parseFloat(value * toMillimeters[id] * toCmMKm[2]) === 0) {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[2]).toFixed(0));
					} else if (parseFloat(value * toMillimeters[id] * toCmMKm[2]) < 0.01) {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[2]).toFixed(8));
					} else {
						return Number(parseFloat(value * toMillimeters[id] * toCmMKm[2]).toFixed(2));
					}
				}
			}
		};

		const resAll = { ...state, inputValue: '', unit1: '', unit2: '', unit1Id: '', unit2Id: '', result: '' }

		switch (action.type) {
			case 'IUSUNIT':
				return {
					...state,
					unit1: state.imperialUSUnits[action.id],
					unit1Id: action.id,
					result: lengthCalc(state.inputValue, action.id, state.unit2Id)
				};
			case 'SIUNIT':
				return {
					...state,
					unit2: state.siUnits[action.id],
					unit2Id: action.id,
					result: state.unit1Id !== '' ? lengthCalc(state.inputValue, state.unit1Id, action.id) : ''
				};
			case 'ON_CHANGE':
				return {
					...state,
					inputValue: action.value,
					result: lengthCalc(action.value, state.unit1Id, state.unit2Id)
				};
			case 'RESET_VALUE':
				return { ...state, inputValue: '', result: '' };
			case 'RESET':
				return (state = resAll);
			case 'SAVE':
				return (state = resAll); 
		}
	}

	let imperialUSUnitsBtn;
	if (lengthState.imperialUSUnits !== '') {
		imperialUSUnitsBtn = (
			<div>
				{lengthState.imperialUSUnits.map((el, id) => {
					return <MenuItem onClick={() => dispatch({ type: 'IUSUNIT', id: id })}>{el}</MenuItem>;
				})}
			</div>
		);
	}
	let siUnitsBtn;
	if (lengthState.siUnits !== '') {
		siUnitsBtn = (
			<div>
				{lengthState.siUnits.map((el, id) => {
					return <MenuItem onClick={() => dispatch({ type: 'SIUNIT', id: id })}>{el}</MenuItem>;
				})}
			</div>
		);
	}

	return (
		<div className="action_container">
			<div>
				{' '}
				{/* action_page_one  */}
				<div className="row_direction length_space_around length-operation_box">
					<div className="column_direction_center">
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="grouped-select" style={{color: lengthState.unit1 === '' ? '' : 'black'}}>
								{lengthState.unit1 === '' ? 'From' : lengthState.unit1}
							</InputLabel>
							<Select defaultValue="" id="grouped-select" onClose={unfocus}>
								<ListSubheader>Imperial / US units</ListSubheader>
								{imperialUSUnitsBtn}
							</Select>
						</FormControl>
						<TextField
							id="standard-number"
							label="Value"
							type="number"
							InputProps={{ inputProps: { min: 0 } }}
							className={classes.input}
							InputLabelProps={{
								shrink: true
							}}
							value={lengthState.inputValue}
							onChange={(event) => dispatch({ type: 'ON_CHANGE', value: Number(event.target.value) })}
							disabled={lengthState.unit1 !== '' && lengthState.unit2 !== '' ? false : true}
						/>
					</div>
					<div className="column_direction_center">
						<SwapHorizSharpIcon fontSize="large" />
					</div>
					<div className="column_direction_center">
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="grouped-select" style={{color: lengthState.unit2 === '' ? '' : 'black'}}>
								{lengthState.unit2 === '' ? 'To' : lengthState.unit2}
							</InputLabel>
							<Select defaultValue="" id="grouped-select" onClose={unfocus}>
								<ListSubheader>SI units</ListSubheader>
								{siUnitsBtn}
							</Select>
						</FormControl>
						<div className="length_results">
							{lengthState.result} {lengthState.shortsiUnits[lengthState.unit2Id]}
						</div>{' '}
						{/*THE RESULT*/}
					</div>
				</div>
				<div className="row_direction length_upper_margin">
					<Button
						className={classes.root}
						onClick={() => dispatch({ type: 'RESET_VALUE' })}
						disabled={lengthState.inputValue !== '' ? false : true}
					>
						RESET VALUE
					</Button>
					<Button
						className={classes.root}
						onClick={() => dispatch({ type: 'RESET' })}
						disabled={
							lengthState.inputValue !== '' ||
							lengthState.unit1 !== '' ||
							lengthState.unit2 !== '' ||
							lengthState.result !== '' ? (
								false
							) : (
								true
							)
						}
					>
						{props.calcOption[0]} ALL
					</Button>
					<Button
						className={classes.root}
						onClick={() =>
							dispatch({
								type: 'SAVE',
								ation: props.save(
									'length',
									lengthState.inputValue,
									lengthState.imperialUSUnits[lengthState.unit1Id],
									lengthState.result,
									lengthState.siUnits[lengthState.unit2Id]
								)
							})}
						disabled={
							lengthState.inputValue !== '' &&
							lengthState.unit1 !== '' &&
							lengthState.unit2 !== '' &&
							lengthState.result !== '' ? (
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
		</div>
	);
}
