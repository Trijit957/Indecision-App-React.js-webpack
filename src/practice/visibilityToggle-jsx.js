let visibility = false;

const visibilityToggle = () => {
   visibility = !visibility;
   render();
}
const root = document.querySelector('#root');

const render = () => {
     const jsx = (
         <div>
             <h2>Visibility Toggle</h2>
             <button onClick={visibilityToggle}>
                 {visibility ? "Hide Details" : "Show Details"}
             </button>
             {visibility && <p>Here are some text!</p>}
         </div>
         
     );
     ReactDOM.render(jsx, root);
}

render();