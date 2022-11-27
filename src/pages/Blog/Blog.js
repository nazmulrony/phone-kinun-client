import React from 'react';
import useTitle from '../../hooks/useTitle';

const Blog = () => {
    useTitle('Blog');
    return (
        <div className='my-10 px-4 lg:px-20'>
            <h1 className='text-4xl mb-4 text-primary text-center'>Frequently Asked Questions</h1>
            <div className='flex flex-col gap-8'>
                <div className=" bg-primary/10 shadow-xl p-6">
                    <div className="card-body  text-justify ">
                        <h2 className="card-title text-primary">What are the different ways to manage a state in a React application?</h2>
                        <p>We can manage state in a React application in the following ways-</p>
                        <p><strong>useState: </strong> useState hook is a hook used to manipulate and update a functional component. The hook takes one argument which is the initial value of a state and returns a state variable and a function to update it.</p>
                        <p><strong>useReducer: </strong>useReducer hook is similar to the useState hook. However it's able to handle more complex logic regarding the state updates. It takes two arguments: a reducer function and an initial state. The hook then returns the current state of the component and a dispatch function</p>
                        <p><strong>useContext: </strong> React Context is a way to manage state globally. It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.</p>
                    </div>
                </div>
                <div className=" bg-primary/10 shadow-xl p-6">
                    <div className="card-body text-justify  ">
                        <h2 className="card-title text-primary">How does prototypical inheritance work?</h2>
                        <p>Prototypical inheritance refers to the ability to access object properties from another object. We use a JavaScript prototype to add new properties and methods to an existing object constructor. We can then essentially tell our JS code to inherit properties from a prototype. Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to another through a reference pointer function.</p>
                    </div>


                </div>
                <div className=" bg-primary/10 shadow-xl p-6">
                    <div className="card-body text-justify  ">
                        <h2 className="card-title text-primary">What is a unit test? Why should we write unit tests?</h2>
                        <p>In computer programming, unit testing is a software testing method by which individual units of source code—sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures—are tested to determine whether they are fit for use.</p>

                        <p className='mt-2'>Unit testing ensures that all code meets quality standards before it's deployed. This ensures a reliable engineering environment where quality is paramount. Over the course of the product development life cycle, unit testing saves time and money, and helps developers write better code, more efficiently. </p>
                    </div>
                </div>
                <div className=" bg-primary/10 shadow-xl p-6">
                    <div className="card-body  text-justify ">
                        <h2 className="card-title text-primary">React vs. Angular vs. Vue?</h2>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                            <p><strong>React: </strong>React gives you only one thing: A library for rendering content to the DOM and controlling it efficiently thereafter. It's also all about components and all about building user interfaces from components. It also gives you all the "tools" you need to define what should be rendered in which way under which circumstances. But it does not include built-in form validation support. It does not include a router (for rendering different components based on URL changes) and it does not ship its own Http client.</p>
                            <p><strong>Angular: </strong>Angular definitely is the "biggest" framework of the three. It's sometimes even called a "platform" rather than a framework. Because Angular out of the box includes support for a lot of things. It helps you with controlling the UI, reacting to user input, validating user input in forms, routing, state management sending Ajax Http requests, providing offline support & PWA capabilities, testing, building your application, managing multiple applications and connecting them and much, much more!</p>
                            <p><strong>Vue: </strong>Vue is a framework which kind of sits between React and Angular. It's not as "big" as Angular but it definitely includes more features than React does. Vue does give you built-in state management and it also ships with a built-in router. It does, however, not include form validation or Http client functionalities. Just like Angular and React, the core of Vue is all about building user interfaces by combining re-usable components. But beyond that, it gives you a bit more than React and a bit less than Angular.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Blog;