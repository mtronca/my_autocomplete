1. What is the difference between Component and PureComponent? give an example where it might break my app.
Pure component performs a shallow comparison to determine if the re-render of the component is necessary. What that means is if the props and state remain the same the PureComponent will prevent unnecessary re-renders. It could break / lead to unexpected behaviours when using with Context or HOC, since the shallow comparison compares the memory reference and not the content of the objects.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
The shallow comparison may fail to detect changes in the context value. Also if a Context Provider re-renders may lead to consuming components to re-render as well, even if their props didn't change. 

3. Describe 3 ways to pass information from a component to its PARENT.
- Context
- Redux
- Callback functions

4. Give 2 ways to prevent components from re-rendering.
- Using React.memo (you can provide custom comparison functions) / Pure Component
- Using useCallback to avoid creating new references for inline functions

5. What is a fragment and why do we need it? Give an example where it might break my app.
Fragments are a special component used to wrap multiple child elements. They can be necessary to avoid adding more DOM nodes and improving readability. They may cause unexpected behaviors when using structural relationships for styling since it is only a virtual DOM container.

6. Give 3 examples of the HOC pattern.
- Authentication
- Loading
- Error Handling

7. What's the difference in handling exceptions in promises, callbacks and async...await?
Promises use .catch to handle exceptions 
Callbacks usually use the error as the first parameter, and they have to be threated manually in the callback function.
Async/await is more synchronous-looking and allow developers to use common error-handling blocks to handle the errors in the catch block.

8. How many arguments does setState take and why is it async.
It takes two arguments, the first is an object with state values or a function that returns those values and the second argument is an option callback function for when the state has been updated. It is asynchronous for performance reasons, as react collects all calls of setState and performs a batch style update to the state. 

9. List the steps needed to migrate a Class to Function Component.
- Change the class to a function. 
- Replace the render function to a simple return. 
- Remove the constructor.
- Identify the usage of this.state, and migrate variables to useState hook
- Change the methods to functions.
- Use useEffect to control the state updates instead of componentDidUpdate, componentWillUnmount, etc.
- Check and refactor and  for possible improvements in the components logic

10. List a few ways styles can be used with components.
- Inline
- CSS in JS
- Global CSS
- CSS in modules

11. How to render an HTML string coming from the server.
- Third party libraries
- You can use a specific tag to allow a string to be rendered as html: dangerouslySetInnerHTML.