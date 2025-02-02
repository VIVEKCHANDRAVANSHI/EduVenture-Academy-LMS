package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.EmptyResultDataAccessException;

import com.example.demo.entity.Course;
import com.example.demo.repository.CourseRepository;
import com.example.demo.exception.CourseNotFoundException; // Importing the custom exception

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        Course existingCourse = courseRepository.findById(id).orElse(null);
        if (existingCourse != null) {
            existingCourse.setCourseName(updatedCourse.getCourseName());
            existingCourse.setDescription(updatedCourse.getDescription());
            existingCourse.setPhoto(updatedCourse.getPhoto());
            existingCourse.setPrice(updatedCourse.getPrice());
            existingCourse.setTutor(updatedCourse.getTutor());
            existingCourse.setVideo(updatedCourse.getVideo());
            return courseRepository.save(existingCourse);
        }
        return null;
    }

    public void deleteCourse(Long id) {
        try {
            courseRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            // Handle the case where the course ID does not exist
            throw new CourseNotFoundException("Course with ID " + id + " not found.");
        }
    }
}
