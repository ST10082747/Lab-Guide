import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
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

    await fetch("https://localhost:3000/user/signup", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newPerson),
    })
    .catch(error => {
        window.alert(error);
        return;
    });
    setForm({name: "", password: ""});
    navigate("/");
}

return(
    <div>
        <h3>Register</h3>
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
                <input type="submit" value="Create person" className="btn btn-primary"/>
            </div>
        </form>
    </div>
);

}