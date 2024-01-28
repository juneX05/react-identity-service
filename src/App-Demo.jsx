import UserProfile from "./components/views/user/UserProfile.jsx";
import {useState, useEffect} from "react";

const users = [
    {
        name: "Jamilla",
        age: 22,
        gender: "female"
    },
    {
        name: "Anna",
        age: 45,
        gender: "female"
    },
    {
        name: "Alex",
        age: 18,
        gender: "male"
    },
    {
        name: "Bilal",
        age: 27,
        gender: "male"
    },
    {
        name: "Houdy",
        age: 30,
        gender: "male"
    },
    {
        name: "Prisca",
        age: 22,
        gender: "female"
    }
]

const UserProfiles = () => (
    <div>
        {users.map((user, index) => {
            return <UserProfile key={index}
                                name={user.name}
                                age={user.age}
                                gender={user.gender}
                                imageNumber={index}
            />
        })}
    </div>
)

function App() {

    const [counter, setCounter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        setIsLoading(true)
        setTimeout( () => {
            setIsLoading(false)
        }, 4000)
        return () => {
            console.log("Clean up")
        }

    }, [] )

    if (isLoading) {
        return "Loading..."
    }

    return (
        <div>

            <button onClick={() => setCounter(prevCounter => prevCounter + 2)}>Increment Counter</button>
            <h1>{counter}</h1>
        </div>
    )
}

export default App
