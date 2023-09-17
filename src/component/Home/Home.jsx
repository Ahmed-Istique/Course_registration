import React, { useEffect, useState } from 'react';

const Home = () => {
    const [allCourse, setAllCourse] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [totalCreditHour, setTotalCreditHour] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const maxCreditHour = 20; // I added this for Maximum allowed credit hours

    useEffect(() => {
        fetch("./cart.json")
            .then((res) => res.json())
            .then((data) => setAllCourse(data));
    }, []);

    const handleSelectCourse = (course) => {
        // This loop is for Check if the selected course is already in the list
        if (!selectedCourses.find((selectedCourse) => selectedCourse.Id === course.Id)) {
            // compare the Id property of a course in the selectedCourses array with the Id property of a course passed as an argument to the handleSelectCourse function
            const updatedSelectedCourses = [...selectedCourses, course];
            setSelectedCourses(updatedSelectedCourses);
            setTotalCreditHour(totalCreditHour + course.Credit);
            setTotalPrice(totalPrice + course.Price);
        } else {
            // Show a toast or handle duplicate selection
            alert("You have already selected this course. ✔️");
        }
    };

    const calculateRemainingCreditHour = () => {
        const remainingCreditHour = maxCreditHour - totalCreditHour;
        if (remainingCreditHour < 0) {
            alert("Sorry! You can not take more credit.  😢 ");
            return 0;
        }
        return remainingCreditHour;
    };

    return (
        <div className='lg:container md:mx-auto'>
            <h1 className='text-4xl font-bold mb-8'>Course Registration</h1>
            <div className='flex'>
                {/* Cart design starts */}
                <div className='grid grid-cols-3 gap-5'>
                    {allCourse.map((course) => (
                        <div key={course.Id}>
                            <div className='p-4 shadow-xl'>
                                <figure><img className='w-full' src={course.Image} alt={course.Heading} /></figure>
                                <div>
                                    <h1 className='my-4 text-left text-lg font-semibold'>{course.Heading}</h1>
                                    <p className='my-4 text-left text-sm text-gray-500'>{course.Description}</p>
                                    <div className='flex justify-between mb-6'>
                                        <div className='flex '>
                                            <img className='mr-3' src="https://i.ibb.co/60tzbL1/dollar.png" alt="" />
                                            <p> Price : {course.Price} </p>
                                        </div>
                                        <div className='flex'>
                                            <img className='mr-3' src="https://i.ibb.co/BngLF6Q/book.png" alt="" />
                                            <p> Credit : {course.Credit} h </p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleSelectCourse(course)} className="bg-cyan-500 py-2.5 px-28 rounded-lg text-white text-lg font-semibold">Select</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Cart design ends */}

                {/* Course Summary left side div */}
                <div className='p-6 text-left shadow-xl '>
                    <h1 className='text-left text-sky-500 text-lg font-bold'>Credit Hour Remaining <span>{calculateRemainingCreditHour()}h</span></h1>
                    <hr />
                    <div>
                        <h1 className='font-bold'>Course Name</h1>
                        <ul>
                            {selectedCourses.map((selectedCourse, index) => (
                                <li key={selectedCourse.Id}>{index + 1}. {selectedCourse.Heading}</li>
                            ))}
                        </ul>
                        <hr />
                        <h1><span className='font-bold'>Total Credit Hour:</span> <span>{totalCreditHour}</span></h1>
                        <hr />
                        <h1><span className='font-bold'>Total Price :</span> <span>{totalPrice} USD</span></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
