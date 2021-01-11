class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: ["one", "two", "three"]
        };
    }

    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });    
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * (this.state.options.length));
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOption(option) {
        if(!option) {
            return "Please Enter Valid Option!!!";
        }else if(this.state.options.indexOf(option) > -1) {
            return "Option Already Exists!!!"
        }
        this.setState((prevState) => {
             return {
                options: prevState.options.concat(option)
             };
        });
    }

    render() {
        
        const title = "Indecision App";
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
               <Header title={title} subtitle={subtitle}/>
               <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} /> 
               <Options options={this.state.options}  />
               <AddOptions handleDeleteOptions={this.handleDeleteOptions} handleAddOption={this.handleAddOption}/>
            </div>
              
        );
    }
}


class Header extends React.Component {
    render() {
        return (
        <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.subtitle}</p>
        </div>
        );
    }
}

class Action extends React.Component {
    render() {
        return (
            <div>
                <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What should I do?</button>
            </div>
        );
    }
}

class Options extends React.Component {
    render() {
        return (
            <div>
                 {
                     this.props.options.map((option) => <Option key={option} optionText={option} />)
                 }
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                <p>
                   {this.props.optionText}
                </p>
           </div>
        );
    }
}

class AddOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(event) {
        event.preventDefault();
        const option = document.querySelector('#option').value.trim();
       
        const error = this.props.handleAddOption(option); 
        this.setState(() => {
            return {
                error: error
            };
        });
     
    }
    render() {
        return (
            <div>
                <form>
                    <input type="text" id="option" />
                    <button type="submit" onClick={this.handleAddOption}>Add Option</button>
                </form>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {this.state.error && <p>{this.state.error}</p>}
            </div>
        );
    }
}


const root = document.querySelector('#root');
ReactDOM.render(<IndecisionApp />, root);