import * as React from 'react'
// import { RouteComponentProps } from 'react-router-dom'

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            test: []
        }
    }

    async componentWillMount() {
        fetch('/fridge/test')
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(res => this.setState({test: res}))
            .catch(err => console.log(err))
    }
    // Render the home page
    public render() {
        return (
            <div className="App">
                <h1>Home Page</h1>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.test.map(test =>
                        <tr>
                            <td>{test.name}</td>
                            <td>{test.age}</td>
                        </tr>
                    )}
                </tbody>
            </div>
        );
    }
}

interface IHomeProps { }

interface IHomeState {
    test: Array<{name: string, age: number}>
}