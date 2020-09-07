import React, { useState } from 'react';
import './App.css';
import PanelControl from './components/PanelControl';
import Header from './components/Header';
import Home from './components/Home';
import Temperature from './containers/Temperature';
import Mass from './containers/Mass';
import Length from './containers/Length';

function App() {
	const [ state, setState ] = useState({
		title: 'how much',
		categories: [ 'home', 'temerature', 'mass', 'length' ],
		header: 0,
		calcActions: [ 'reset', 'save result' ]
	});

	const clickedBtn = (el, id) => {
		setState({ ...state, header: id });
	};

	const [ historyState, setHistoryState ] = useState(
		[
			// { cat: 'temperature', initValue: 100, initUnit:'C', results:['1','2','3'] } // left it for test
		]
	);

	const saveHandler = (categ, initV, initU, res, resU) => {
		setHistoryState((historyState) => [
			...historyState,
			{ cat: categ, initValue: initV, initUnit: initU, results: res, resultsUnit: resU }
		]);
	};

	const deleteHandler = (id) => {
		// console.log(id)
		const state = [ ...historyState ];
		state.splice(id, 1);
		setHistoryState(state);
	};

	return (
		<div className="App">
			<PanelControl categories={state.categories} title={state.title} clickedBtn={clickedBtn} />
			<div className="App_action_side">
				<Header headerTitle={state.categories[state.header]} />
				{state.header === state.categories.indexOf('home') ? (
					<Home name={'Home'} memo={historyState} delete={deleteHandler} />
				) : (
					''
				)}
				{state.header === state.categories.indexOf('temerature') ? (
					<Temperature name={'Temperature'} calcOption={state.calcActions} save={saveHandler}/>
				) : (
					''
				)}
				{state.header === state.categories.indexOf('mass') ? (
					<Mass name={'Mass'} calcOption={state.calcActions} save={saveHandler}/>
				) : (
					''
				)}
				{state.header === state.categories.indexOf('length') ? 
					<Length name={'Length'} calcOption={state.calcActions} save={saveHandler}/> : ''}
			</div>
		</div>
	);
}

export default App;
