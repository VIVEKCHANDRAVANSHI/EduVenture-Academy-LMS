import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
    const [courseName, setCourseName] = useState('');
    const [price, setPrice] = useState('');
    const [instructor, setInstructor] = useState('');
    const [description, setDescription] = useState('');
    const [pLink, setPLink] = useState('');
    const [yLink, setYLink] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = {
            course_name: courseName,
            price: price,
            instructor: instructor,
            description: description,
            p_link: pLink,
            y_link: yLink,
        };

        try {
            const response = await fetch('http://localhost:8080/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });

            if (response.status === 200) {
                console.log('Course Added successfully!');
                navigate("/courses");
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError('Course add error: ' + error.message);
        }
    };

    return (
        <div className='add'>
            <div className='container1'>
                <h2>Course Registration</h2>
                <form onSubmit={handleSubmit} className="addCourse-form">
                    <label>Name: </label>
                    <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required style={{ width: "100%" }} />
                    <label>Instructor: </label>
                    <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} required style={{ width: "100%" }} />
                    <label>Price: </label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: "100%" }} />
                    <label>Description: </label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: "100%" }} />
                    <label>Video Link: </label>
                    <input type="text" value={yLink} onChange={(e) => setYLink(e.target.value)} required style={{ width: "100%" }} />
                    <label>Image Link: </label>
                    <input type="text" value={pLink} onChange={(e) => setPLink(e.target.value)} required style={{ width: "100%" }} />
                    {error && <span className='error-msg'>{error}</span>}
                    <div className='btn1'><button type="submit">Add Course</button></div>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;