import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory
} from "react-router-dom"

const Menu = () => {
	const padding = {
		paddingRight: 5,
	};
	return (
		<div>
			<Link to="/" style={padding}>
				anecdotes
			</Link>
			<Link to="/create" style={padding}>
				create new
			</Link>
			<Link to="/about" style={padding}>
				about
			</Link>
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map((anecdote) => (
				<li key={anecdote.id}>
          <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
			))}
		</ul>
	</div>
);

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(elem => elem.id === Number(id))

	return <div>
		<h2>Anecdote</h2>
		<ul>
			<li key={anecdote.id}>{anecdote.content}</li>
		</ul>
	</div>
}

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an individual person or an
			incident. Occasionally humorous, anecdotes differ from jokes because their
			primary purpose is not simply to provoke laughter but to reveal a truth
			more general than the brief tale itself, such as to characterize a person
			by delineating a specific quirk or trait, to communicate an abstract idea
			about a person, place, or thing through the concrete details of a short
			narrative. An anecdote is "a story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes, at this app you can
			find the best and add more.
		</p>
	</div>
);

const Footer = () => (
	<div>
		Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
		See{' '}
		<a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
			https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
		</a>{' '}
		for the source code.
	</div>
);

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = event => setValue(event.target.value)

	const reset = () => setValue('')

	return {
		type,
		value,
		onChange,
		reset
	}
}

const CreateNew = (props) => {
  const history = useHistory()
	const {reset: contentReset, ...content} = useField('text');
	const {reset: authorReset, ...author} = useField('text');
	const {reset: infoReset, ...info} = useField('text');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
    props.setNotification(`a new anecdote ${content} created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 10000);
    history.push('/')
	};

	const handleReset = e => {
		e.preventDefault()
		contentReset()
		authorReset()
		infoReset()
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button>create</button>
				<button onClick={handleReset}>reset</button>
			</form>
		</div>
	);
};

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1,
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2,
		},
	]);

	const [notification, setNotification] = useState('');

	const addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		setAnecdotes(anecdotes.concat(anecdote));
	};

	const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	const vote = (id) => {
		const anecdote = anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1,
		};

		setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	};

	return (
		<Router>
			<h1>Software anecdotes</h1>
			<Menu />
      {notification ?? <p>{notification}</p>}

			<Switch>
				<Route path="/create">
					<CreateNew addNew={addNew} setNotification={setNotification}/>
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/:id">
					<Anecdote anecdotes={anecdotes} />
				</Route>
				<Route path="/">
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
			</Switch>

			<Footer />
		</Router>
	);
};

export default App;
