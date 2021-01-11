const app = {
    title: "Indecision App",
    subtitle: "Put your life in the hand of a computer",
    options: []
};

const onFormSubmit = (event) => {
    event.preventDefault();
    const option = event.target.elements.option.value;

    if(option) {
        app.options.push(option);
        event.target.elements.option.value = "";
        render();
    }
    
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * (app.options.length + 1));
    const option = app.options[randomNum];
    alert(option);
}

const removeAll = () => {
    app.options = [];
    render();
}


const root = document.querySelector('#root');

const render = () => {
    const template = (
        <div>
          <h2>{app.title}</h2>
          {app.subtitle && <p>{app.subtitle}</p>}
          <p>{app.options.length > 0 ? 'Here are Your Options: ' : "No Options"}</p>
          
          <ol>
          {
              app.options.map((option) => {
              return <li key={option}>{option}</li>
              })
          }
          </ol>

          <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
        
          <form onSubmit={onFormSubmit}>
              <input type="text" name="option" />
              <button>Add Option</button>
          </form>
          <button onClick={removeAll}>Remove All</button>
        </div>
    
    );

    ReactDOM.render(template, root);
}

render();