import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
const [form, setForm] = useState({
    name: "",
    password: "",
});
const navigate = useNavigate();

//update state properties
function updateForm(value){
    return setForm((prev) => {
        return {...prev, ...value};
    });
}

// handle submission
async function onSubmit(e) {
    e.preventDefault();

    // create new user
    const newPerson = {...form};

    try {
        const response = await fetch("https://localhost:3000/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newPerson),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const {token, name} = data;
        console.log(name + " " + token);

        // save jwt
        localStorage.setItem("jwt", token);

        // save username
        localStorage.setItem("name", name);

        setForm({name: "", password: ""});
        navigate("/");
    } catch (error) {
        console.error("Error:", error);
        window.alert(error.message);
    }
}

return(
    <div>
        <h3>Login</h3>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={form.name} onChange={(e) => updateForm({name: e.target.value})}/>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                type="text" 
                className="form-control" 
                id="password" 
                value={form.password} onChange={(e) => updateForm({password: e.target.value})}/>
            </div>

            <div className="form=group">
                <input type="submit" value="Login" className="btn btn-primary"/>
            </div>
        </form>
    </div>
);

}