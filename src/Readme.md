# Course Registration Application

This is a simple React application for course registration. It allows users to view a list of available courses, select courses to enroll in, and calculates the total credit hours and total price of the selected courses.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [License](#license)

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone < >

1. Navigate to the project directory.
cd course-registration-app

2. Install the required dependencies.
npm install

3. Start the development server.
npm start

Open your web browser and visit http://localhost:3000 to view the application.


Features
1. Course selection: Users can select courses by clicking the "Select" button.
2. Credit hour tracking: The application keeps track of the total credit hours, ensuring it does not exceed the maximum limit of 20 hours.
3. Total price calculation: The application calculates the total price of the selected courses.
4. Responsive design: The application is designed to be responsive and user-friendly.

In my assignment project, I've managed state primarily using React's useState and useEffect hooks. State management is crucial in React applications to keep track of data that can change over time and to trigger updates to the user interface when that data changes. Let's discuss how you managed state in your project:

Initializing State with useState:

1. In my code, I use the useState hook to initialize state variables. For example:
const [allCourse, setAllCourse] = useState([]);

2. Fetching Data and Updating State with useEffect:

I use the useEffect hook to fetch data from an external source (a JSON file in this case) and update the state variable accordingly. This effect runs once when the component mounts due to the empty dependency array ([]).
useEffect(() => {
    fetch("./cart.json")
        .then((res) => res.json())
        .then((data) => setAllCourse(data));
}, []);

3. Updating State based on User Interaction:
I also update state when the user interacts with the application. For example, when a user clicks the "Select" button on a course card, I call the handleSelectCourse function:
const handleSelectCourse = (course) => {
    // Check if the selected course is already in the list
    if (!selectedCourses.find((selectedCourse) => selectedCourse.Id === course.Id)) {
        const updatedSelectedCourses = [...selectedCourses, course];
        setSelectedCourses(updatedSelectedCourses);
        setTotalCreditHour(totalCreditHour + course.Credit);
        setTotalPrice(totalPrice + course.Price);
    } else {
        // Handle duplicate selection or show a message
        alert("You have already selected this course.");
    }
};

4. Rendering UI based on State:

I use the state variables like allCourse, selectedCourses, totalCreditHour, and totalPrice to render different parts of your user interface. For instance, I dynamically generate the course cards based on the allCourse state, and I display the selected courses and their totals in the "Course Name," "Total Credit Hour," and "Total Price" sections of I UI.

