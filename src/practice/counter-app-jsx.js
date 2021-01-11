let count = 0;

const addOne = () => {
    count++;
    renderCounterApp();
}

const minusOne = () => {
    count--;
    renderCounterApp();
}

const reset = () => {
    count = 0;
    renderCounterApp();

}

const root = document.querySelector('#root');

const renderCounterApp = () => {
    const templateTwo = (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
    
    ReactDOM.render(templateTwo, root);
}

renderCounterApp();
