import React from 'react';

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
                <form className="add-option" autoComplete="off">
                    <input type="text" className="add-option__input" id="option" />
                    <button type="submit" onClick={this.handleAddOption} className="button">Add Option</button>
                </form>
                
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
            </div>
        );
    }
}


export default AddOptions;
