import React, { useReducer } from 'react';
import '../App.css';
import './Mass.css';
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

export default function Mass(props) {
	const classes = useStyles();
	const initialMassState = {
		apothecariesUnits: [ 'grain', 'drachm', 'ounce', 'pound', 'stone', 'quarter', 'hundredweight', 'ton' ],
		apothecariesSrtUnits: [ 'gr', 'dr', 'oz', 'lb', 'qr', 'cwt', 't' ], // it is just in case 
		imperialAndSI: [ 'pounds', 'kilograms', 'grams' ],
		shortImperialAndSI: [ 'lb', 'kg', 'gr' ],
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

	const [ massState, dispatch ] = useReducer(reducer, initialMassState);
	function reducer(state, action) {
		const massCalc = (value, id, unit2Index) => {
			const toPounds = [ 0.0001428, 0.003906, 0.0625, 1, 14, 28, 112, 2240 ];
			const toKgGr = [ 0.453592, 453.592 ];

			if (state.unit1 !== '' || state.unit2 !== '' || state.inputValue) {
				if (unit2Index === 0) {
					//POUNDS 
					if (parseFloat(value * toPounds[id]) === 0) {
						return Number(parseFloat(value * toPounds[id]).toFixed(0));
					} else if (parseFloat(value * toPounds[id]) < 0.01) {
						return Number(parseFloat(value * toPounds[id]).toFixed(4));
					} else {
						return Number(parseFloat(value * toPounds[id]).toFixed(2));
					}
				} else if (unit2Index === 1) {
					//KILOGRAMS
					if (parseFloat(value * toPounds[id] * toKgGr[0]) === 0) {
						return Number(parseFloat(value * toPounds[id] * toKgGr[0]).toFixed(0));
					} else if (parseFloat(value * toPounds[id] * toKgGr[0]) < 0.01) {
						return Number(parseFloat(value * toPounds[id] * toKgGr[0]).toFixed(4));
					} else {
						return Number(parseFloat(value * toPounds[id] * toKgGr[0]).toFixed(2));
					}
				} else if (unit2Index === 2) {
					//GRAMS
					if (parseFloat(value * toPounds[id] * toKgGr[1]) === 0) {
						return Number(parseFloat(value * toPounds[id] * toKgGr[1]).toFixed(0));
					} else if (parseFloat(value * toPounds[id] * toKgGr[1]) < 0.01) {
						return Number(parseFloat(value * toPounds[id] * toKgGr[1]).toFixed(4));
					} else {
						return Number(parseFloat(value * toPounds[id] * toKgGr[1]).toFixed(2));
					}
				}
			}
		};

		const resAll = { ...state, inputValue: '', unit1: '', unit2: '', unit1Id: '', unit2Id: '', result: '' }

		switch (action.type) {
			case 'APUNIT':
				return {
					...state,
					unit1: state.apothecariesUnits[action.id],
					unit1Id: action.id,
					result: massCalc(state.inputValue, action.id, state.unit2Id)
				};
			case 'ISIUNIT':
				return {
					...state,
					unit2: state.imperialAndSI[action.id],
					unit2Id: action.id,
					result: state.unit1Id !== '' ? massCalc(state.inputValue, state.unit1Id, action.id) : ''
				};
			case 'ON_CHANGE':
				return {
					...state,
					inputValue: action.value,
					result: massCalc(action.value, state.unit1Id, state.unit2Id)
				};
			case 'RESET_VALUE':
				return { ...state, inputValue: '', result: '' };
			case 'RESET':
				return (state = resAll);
			case 'SAVE':
				return (state = resAll); 
		}
	}

	let apothecariesUnitsBtn;
	if (massState.apothecariesUnits !== '') {
		apothecariesUnitsBtn = (
			<div>
				{massState.apothecariesUnits.map((el, id) => {
					return <MenuItem onClick={() => dispatch({ type: 'APUNIT', id: id })}>{el}</MenuItem>;
				})}
			</div>
		);
	}
	let imperialAndSIBtn;
	if (massState.imperialAndSI !== '') {
		imperialAndSIBtn = (
			<div>
				{massState.imperialAndSI.map((el, id) => {
					return <MenuItem onClick={() => dispatch({ type: 'ISIUNIT', id: id })}>{el}</MenuItem>;
				})}
			</div>
		);
	}

	return (
		<div className="action_container">
			<div>
				{' '}
				{/* action_page_one  */}
				<div className="row_direction mass_space_around mass-operation_box">
					<div className="column_direction_center">
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="grouped-select" style={{color: massState.unit1 === '' ? '' : 'black'}}>
								{massState.unit1 === '' ? 'From' : massState.unit1}
							</InputLabel>
							<Select defaultValue="" id="grouped-select" onClose={unfocus}>
								<ListSubheader>Apothecaries Units</ListSubheader>
								{apothecariesUnitsBtn}
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
							value={massState.inputValue}
							onChange={(event) => dispatch({ type: 'ON_CHANGE', value: Number(event.target.value) })}
							disabled={massState.unit1 !== '' && massState.unit2 !== '' ? false : true}
						/>
					</div>
					<div className="column_direction_center">
						<SwapHorizSharpIcon fontSize="large" />
					</div>
					<div className="column_direction_center">
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="grouped-select" style={{color: massState.unit2 === '' ? '' : 'black'}}>
								{massState.unit2 === '' ? 'To' : massState.unit2}
							</InputLabel>
							<Select defaultValue="" id="grouped-select" onClose={unfocus}>
								<ListSubheader>Imperial / SI Units</ListSubheader>
								{imperialAndSIBtn}
							</Select>
						</FormControl>
						<div className="mass_results">
							{massState.result} {massState.shortImperialAndSI[massState.unit2Id]}
						</div>{' '}
						{/*THE RESULT*/}
					</div>
				</div>
				<div className="row_direction mass_upper_margin">
					<Button
						className={classes.root}
						onClick={() => dispatch({ type: 'RESET_VALUE' })}
						disabled={massState.inputValue !== '' ? false : true}
					>
						RESET VALUE
					</Button>
					<Button
						className={classes.root}
						onClick={() => dispatch({ type: 'RESET' })}
						disabled={
							massState.inputValue !== '' ||
							massState.unit1 !== '' ||
							massState.unit2 !== '' ||
							massState.result !== '' ? (
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
									'mass',
									massState.inputValue,
									massState.apothecariesUnits[massState.unit1Id],
									massState.result,
									massState.imperialAndSI[massState.unit2Id]
								)
							})}
						disabled={
							massState.inputValue !== '' &&
							massState.unit1 !== '' &&
							massState.unit2 !== '' &&
							massState.result !== '' ? (
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
