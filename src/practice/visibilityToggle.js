class VisibilityToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleVisibiltyToggle = this.handleVisibiltyToggle.bind(this);
        this.state = {
            visibilty: false
        };
    }
    
    handleVisibiltyToggle() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            };
        });    
    }

    render() {
        return (
            <div>
             <h2>Visibility Toggle</h2>
             <button onClick={this.handleVisibiltyToggle}>
                {this.state.visibility ? "Hide Details" : "Show Details"}
             </button>
             {this.state.visibility && <p>Here are Some Text!!!</p>}
         </div>
        );
    }
};

ReactDOM.render(<VisibilityToggle />, document.querySelector('#root'));