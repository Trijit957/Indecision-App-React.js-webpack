class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: props.options
        };
    }

    componentDidMount() {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        console.log(options);
        
        if(options) {
            this.setState(() => {
                return {
                    options: options
                };
            });
        }
        
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
           const json = JSON.stringify(this.state.options);
           localStorage.setItem('options', json);
        }  
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

    handleDeleteOption(optionToDelete) {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => {
                     return optionToDelete !== option;
                })
            };
        });
        
    }

    render() {
        
        
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
               <Header subtitle={subtitle} />
               <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} /> 
               <Options options={this.state.options} handleDeleteOption={this.handleDeleteOption}/>
               <AddOptions handleDeleteOptions={this.handleDeleteOptions} handleAddOption={this.handleAddOption} />
            </div>
              
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            {props.subtitle && <p>{props.subtitle}</p>}
        </div>
    );
}

Header.defaultProps = {
    title: "Indecision App"
};

const Action = (props) => {
    return (
        <div>
          <button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do?</button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
                 {
                   props.options.map((option) => <Option key={option} optionText={option} 
                   handleDeleteOption={props.handleDeleteOption} />)
                 }
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            <p>
              {props.optionText}
              <button onClick={(e) => {
                  props.handleDeleteOption(props.optionText);
              }
                }>Remove</button>
            </p>
         </div>
    );
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

        if(!error) {
            document.querySelector('#option').value = ''; 
        }
     
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