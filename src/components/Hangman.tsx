import React, { useState } from 'react';
import input from '../styles/Input.module.css';

export default function Hangman() {
    interface User {
        username: string,
        id: number
    }

    const player: User = {
        username: "Karl",
        id: 1
    };

    // creates the struct for a person
    type Person = {
        firstName: string;
        email: string;
        age?: number;
        id?: string;
    }
    //state for individual person using struct incl initial values
    const [person, setPerson] = useState<Person>({
        firstName: '',
        email: ''
    })
    // state for empty array using person as struct for objects within array
    const [people, setPeople] = useState<Person[]>([]);

    // TS method of extracting event values
    // this method will detect the correct field and update the state object accordingly avoiding separate handlers for each form value
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        console.log(e.currentTarget.value);
        setPerson({ ...person, [name]: value });
    }

    // TS method of form submission
    // checks to see if fields are used before submitting, then updates the array but includes a key based on date, then clears fields
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (person.firstName && person.email && (person.age && person.age > 0)) {
            const newPerson = {
                ...person, id: new Date().getTime().toString()
            }
            setPeople([...people, newPerson]);
            setPerson({firstName: '', email: '', age: 0 })
        }
    }

    function greet(person: string, date: Date) {
        return (`Hello ${person.toUpperCase()}, today is ${date.toDateString()}!`)
    }

    return (
        <div>
            <h1>{greet(player.username, new Date())}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="firstName">Name: </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={person.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={person.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="age">Age: </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={person.age}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                {people.map((person, index) => {
                    const { id, firstName, email, age } = person;
                    return (
                        <div className={input.person} key={id}>
                            <h4>{firstName}</h4>
                            <p>{age}</p>
                            <p>{email}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}