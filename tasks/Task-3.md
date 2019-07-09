# Task 3 - Context (optional)

Right now we use the locale `de-DE` to format all the numbers and dates. This locale is currently hard coded. We want to make it possible to have a single point to store the locale information to be able to later switch the locale.

For this we should use [Context](https://reactjs.org/docs/context.html) (Please ignore every code sample using classes. Use [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) instead)

Try to write and integrate your own Context before looking at `/src/LocaleContext.js`

1. Open `App.js` and use `React.createContext()` to create a Context
2. Use the `Context.Provider` in `App.js` as a Top-Level Component (above Router)

```jsx
<YourContext.Provider>
  <Router>{/* .. */}</Router>
</YourContext.Provider>
```

3. Use `React.useContext` to load your new context inside the components in which you need access to the locale
4. Replace all occurrences of `de-DE` with the result of the new Context

> The tests need the locale to be `de-DE` - after completing the task please choose `de-DE` as the locale for the application

There are no Cypress tests to test different locales. But you can test with `en-US` for example to see a differen Number and Date format.

# Recommended Links

- [Context](https://reactjs.org/docs/context.html)
- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
- [Building your own hooks](https://reactjs.org/docs/hooks-custom.html)

# Tasks

- [Introduction](https://github.com/ankri/react-workshop/blob/master/tasks/Task-0.md) - Let's start with the introduction: What is the application about and how to start the TDD tests
- [Task 1](https://github.com/ankri/react-workshop/blob/master/tasks/Task-1.md) - Make a reusable `<Trip />` component and use it to display the incoming trips
- [Task 2](https://github.com/ankri/react-workshop/blob/master/tasks/Task-2.md) - We want to be able to create a new trip. Let's write a form with `useState`
- (optional) Task 3 - you are here
- [Task 4](https://github.com/ankri/react-workshop/blob/master/tasks/Task-4.md) - Let's have a look at the Router by editing `TripRouter.js`
- [Task 5](https://github.com/ankri/react-workshop/blob/master/tasks/Task-5.md) - We want to update the window title every time we change a route
- [Task 6](https://github.com/ankri/react-workshop/blob/master/tasks/Task-6.md) - There is a better way to use forms. Let's use `formik`
- (optional) [Task 7](https://github.com/ankri/react-workshop/blob/master/tasks/Task-7.md) - Currently the app uses two ways to retrieve the data from the server. Let's refactor to just use hooks
