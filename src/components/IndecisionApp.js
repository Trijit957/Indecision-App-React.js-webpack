import React from 'react';
import AddOptions from './AddOptions';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handleClearSelectedOption = this.handleClearSelectedOption.bind(this);
        this.state = {
            options: props.options,
            selectedOption: undefined
        };
    }

    componentWillMount() {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        console.log(options);
        
        if(options) {
            this.setState(() => {
                return {
                    options: options,
                    
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
        this.setState(() => {
            return {
              selectedOption: option
            };
        });
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
    
    handleClearSelectedOption() {
        this.setState(() => {
            return {
                selectedOption: undefined
            };
        });
    }


    render() {
        
        
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
               <Header subtitle={subtitle} />
               <div className="container">
                   <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} /> 
                   <div className="widget">
                   <Options options={this.state.options} handleDeleteOption={this.handleDeleteOption} handleDeleteOptions={this.handleDeleteOptions}/>
                   <AddOptions handleAddOption={this.handleAddOption} />
                   </div>
                   
               </div>
               
               <OptionModal 
                   selectedOption={this.state.selectedOption}
                   handleClearSelectedOption={this.handleClearSelectedOption}
               />
            </div>
              
        );
    }
}

// IndecisionApp.defaultProps = {
//     options: []
// };

export default IndecisionApp;