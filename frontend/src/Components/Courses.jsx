import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const authToken = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch courses. Please check your connection and try again.");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    if (userId) {
      fetch(`http://localhost:8080/api/learning/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          let arr = data.map(item => item.course_id);
          setEnrolled(arr);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch enrolled courses. Please check your connection and try again.");
        });
    }
  }, [userId]);

  function enrollCourse(courseId) {
    if (authToken) {
      const enrollRequest = {
        userId: userId,
        courseId: courseId
      };
      axios.post('http://localhost:8080/api/learning', enrollRequest)
        .then((response) => {
          if (response.data === "Enrolled successfully") {
            toast.success('Course Enrolled successfully', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
            });
            setTimeout(() => {
              navigate(`/course/${courseId}`);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error('Enrollment error:', error);
          toast.error('Enrollment failed. Please try again.');
        });
    } else {
      toast.error('You need to login to continue', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No courses available at the moment.</div>;
  }

  return (
    <div>
      <Navbar page={"courses"} />
      <div className="courses-container" style={{ marginTop: "20px" }}>
        {courses.map((course) => (
          <div key={course.course_id} className="course-card">
            <img src={course.p_link} alt={course.course_name} className="course-image" />
            <div className="course-details">
              <h3 className="course-heading">
                {course.courseName.length < 8
                  ? `${course.courseName} Tutorial`
                  : course.courseName
                }
              </h3>
              <p className="course-description" style={{ color: "grey" }}>Price: Rs.{course.price}</p>
              <p className="course-description">Tutorial by {course.instructor}</p>
            </div>
            {enrolled.includes(course.course_id) ? (
              <button className="enroll-button" style={{ color: '#F4D03F', backgroundColor: 'darkblue', fontWeight: 'bold' }} onClick={() => navigate("/learnings")}>
                Enrolled
              </button>
            ) : (
              <button className="enroll-button" onClick={() => enrollCourse(course.course_id)}>
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
