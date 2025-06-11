import React, { useState } from 'react'
import './Auth.css'

export default function Auth({ updateLocalStorage }) {

	const [login, setLogin] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	
	const register = () => login ? null : (
        
        <div className="register">
			<input
				type="text"
				value={firstName}
				name="firstName"
				id="firstName"
				placeholder='Enter first name'
				onChange={e => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				value={lastName}
				name="lastName"
				id="lastName"
				placeholder='Enter last name'
				onChange={e => setLastName(e.target.value)}
			/>
		</div>
	)

	const toggle = () => {
		setLogin(!login)
	}

	const toggleBtn = () => login ? "Create Account" : "Back to Login"

	const handleSubmit = (e) => {
		e.preventDefault()

		const url = login
			? "http://127.0.0.1:4000/auth/login"
			: "http://127.0.0.1:4000/auth/user"

		const body = login
			? { email, password }
			: { firstName,lastName, email, password}

            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                updateLocalStorage(data.token)
            })
            .catch(err => console.log(err))
	}


	return (
		<>
            <h1 className='auth-header'>{login ? "Login" : "Register"}</h1>`

			<form action="" className="form-wrapper">
				{register()}
                
				<input 
                    type="email" 
                    value={email} 
                    name="email" 
                    id="email" 
                    placeholder='Enter email' 
                    onChange={e => setEmail(e.target.value)}
                />
				<input type="password" 
                    value={password} 
                    name="pwd" 
                    id="pwd" 
                    placeholder='Enter password' 
                    onChange={e => setPassword(e.target.value)} 
                />

				<button onClick={handleSubmit}>Login</button>
				<button onClick={toggle} type='button' className='logRegisterBtn'>{toggleBtn()}</button>
			</form>
		</>
	)
}