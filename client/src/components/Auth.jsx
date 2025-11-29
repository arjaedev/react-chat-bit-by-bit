import React, { useState } from 'react'
import './Auth.css'

export default function Auth({ updateLocalStorage }) {

	const [login, setLogin] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const [error, setError] = useState("")

	
	const register = () => login ? null : (
        
        <div className="register-fields">
			<input
				type="text"
				value={firstName}
				name="firstName"
				id="firstName"
				placeholder='First Name'
				onChange={e => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				value={lastName}
				name="lastName"
				id="lastName"
				placeholder='Last Name'
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
		.then(async res => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "An error occurred");
            }
            return data;
        })
		.then(data => {
            updateLocalStorage(data.token);
            setError("");
        })
		.catch(err => {
            console.log(err);
            setError(err.message);
        })
	}

	return (
		<div className="auth-container">
			<h1>{login ? "Welcome Back" : "Create Account"}</h1>
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
			<form className="auth-form" onSubmit={handleSubmit}>
                {register()}
				<input
					type="text"
					value={email}
					name="email"
					id="email"
					placeholder='Email'
					onChange={e => setEmail(e.target.value)}
				/>
				<input
					type="password"
					value={password}
					name="password"
					id="password"
					placeholder='Password'
					onChange={e => setPassword(e.target.value)}
				/>
				<button type="submit">{login ? "Login" : "Sign Up"}</button>
			</form>
            <button className="auth-toggle" onClick={toggle}>{toggleBtn()}</button>
            
            <div className="demo-info" style={{marginTop: '2rem', padding: '1rem', border: '1px solid #333', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <h3 style={{margin: '0 0 0.5rem 0', color: '#00f2ff', fontSize: '1rem'}}>Live Demo Credentials</h3>
                <p style={{margin: '0.2rem 0', color: '#ccc', fontSize: '0.9rem'}}>Email: <span style={{color: '#fff', fontFamily: 'monospace'}}>ethan.brooks56@example.com</span></p>
                <p style={{margin: '0.2rem 0', color: '#ccc', fontSize: '0.9rem'}}>Password: <span style={{color: '#fff', fontFamily: 'monospace'}}>123456</span></p>
            </div>
		</div>
	)
}