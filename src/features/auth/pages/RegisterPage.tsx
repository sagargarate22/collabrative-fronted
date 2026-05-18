import {useState, useRef, useReducer} from 'react';



export default function RegisterPage()
{
    // const [count, setCount] = useState(0);
    // const countRef = useRef(0);

    // function handleClick()
    // {
    //     setCount(prev=> prev + 1);
    // }

    // function handleUseRef()
    // {
    //     countRef.current += 1;
    //     console.log(countRef.current);
    // }

    // function forcereload()
    // {
    //     setCount(prev => prev + countRef.current)
    // }

    function CountReducer(state, action)
    {
        switch(action.type)
        {
            case "inc":
                return state + 1;
            case "dec":
                return state - 1;
            case "reset":
                return 0;
            default:
                return state;
        }
    }

    const [count,dispatchEvent] = useReducer(CountReducer, 0);
    return (
        <>
            <h1 className="text-blue-500">Count: {count}</h1>
            {/* <button onClick={handleClick}>Click Me UseState</button>
            <button onClick={handleUseRef}>Click Me UseRef</button>
            <button onClick={forcereload}>Force reload</button> */}

            <div className="container">
                <button onClick={()=> dispatchEvent({type: "inc"})}>Increment</button>
                <button onClick={()=> dispatchEvent({type: "dec"})}>Decrement</button>
                <button onClick={()=> dispatchEvent({type: "reset"})}>Reset</button>
            </div>
        </>
    )
}