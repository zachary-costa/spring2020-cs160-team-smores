import * as React from 'react'
// import { RouteComponentProps } from 'react-router-dom'

export default class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);

        this.state = {
            storage: []
        }
    }

    async componentWillMount() {
        fetch('/storage/test')
            .then(res => {
                if (!res.ok) throw new Error(res.statusText)
                return res.json()
            })
            .then(res => this.setState({storage: res}))
            .catch(err => console.log(err))
    }
    // Render the home page
    public render() {
        return (
            <div className="App">
                <h1>Home Page</h1>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Setup Date</th>
                        <th>Low Temp</th>
                        <th>High Temp</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.storage.map(storage =>
                        <tr>
                            <td>{storage.storage_id}</td>
                            <td>{storage.storage_name}</td>
                            <td>{storage.setup_date}</td>
                            <td>{storage.temp_lowest}</td>
                            <td>{storage.temp_highest}</td>
                        </tr>
                    )}
                </tbody>
            </div>
        );
    }
}

interface IHomeProps { }

interface IHomeState {
    // TODO: Fix need for exact name match to db (Reducer)
    storage: Array<{storage_id: number, storage_name: string, setup_date: string, temp_lowest: number, temp_highest: number}>
}