React Hooks를 이용해서 데이터 끌어오는 방법입니다. hooks를 사용하면 react lifecycle을 사용하지 않아도 된다는 이점이 있습니다.

1. 훅스

```js
const BlogList = () => {
	const [people, setPeople] = useState([])

	useEffect(() => {
		axios.get('/blog').then(res => {
			setPeople(res.data.parseYaml.parseBlog)
		})
	}, [])

	return (
		<div>
			<h1>BlogList</h1>
			<h3>
				{people.map(person => (
					<ul>
						<li key={person.id}>
							name: {person.name}
							<div>description: {person.desc}</div>
							<div>
								url: <a href={person.url}>{person.url}</a>
							</div>
						</li>
					</ul>
				))}
			</h3>
		</div>
	)
}
```

2. 기본

```js
class YoutubeList extends Component {
	state = {
		people: []
	}

	componentDidMount() {
		axios.get('/youtube').then(res => {
			const people = res.data.parseYaml.parseYoutube
			this.setState({ people })
		})
	}

	render() {
		return (
			<div>
				<h1>YoutubeList</h1>
				<h3>
					{this.state.people.map(person => (
						<ul>
							<li key={person.id}>
								name: {person.name}
								<div>description: {person.desc}</div>
								<div>
									url:
									<a href={person.url}>{person.url}</a>
								</div>
							</li>
						</ul>
					))}
				</h3>
			</div>
		)
	}
}
```

참조

https://www.andreasreiterer.at/rest-api-react-hooks/
