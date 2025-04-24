import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useDataClass from './hooks/useDataClass'
import { types } from './hooks/usePropTypes'
import useFetch from './hooks/useFetch'

 
function App() {
    const [count, setCount] = useState(0)
    
    
    const data = useDataClass(
        {
            data: { name: "John", age: 30 },
            propTypes: {
                name: { type: types.string },
                age: { type: types.number },
            },
            plugins: {
                greet: (data) => `Hello, ${data.name}!`,
                isAdult: (data) => data.age >= 18,
            }
        }
    );
    
    // Métodos predeterminados
    console.log(data.methods.toString()); // DataClass(name="John", age=30)
    console.log(data.methods.hashCode()); // Ejemplo: 123456789
    
    // Plugins personalizados
    console.log(data.plugins.greet(data)); // "Hello, John!"
    console.log(data.plugins.isAdult(data)); // true


    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default App
