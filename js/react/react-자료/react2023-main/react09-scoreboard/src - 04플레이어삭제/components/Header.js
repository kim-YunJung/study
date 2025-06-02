import React from "react";
import Stats from '../components/Stats';
import Stopwatch from '../components/Stopwatch';

export default function Header(props) {
  return (<>
    <header className="header">
			<Stats />
			<h1 className="h1">{props.title}</h1>
			<Stopwatch></Stopwatch>
		</header>
  </>);
}