# Task 5 - useEffect

It's nice to have feature for your application when the `document.title` shows the current page you're on. One added benifit is that bookmarks will automatically be easier to identify.

Since changing the `document.title` is considered a side effect, we use `React.useEffect` to change the title. While reading the source of `Trip.js` you maybe encountered your first use of `React.useEffect` maybe have a look there again.

### The titles

- In `/trips/Trips.js` change the title to "travel expenses | All trips"
- In `/trips/NewTrip.js` change the title to "travel expenses | Create new trip"
- In `/trip/Trip.js` change the title to "travel expenses | \${trip.title}" (This is a bit tricky, see below)
- In `/trip/TripAddExpense.js` change the title to "travel expenses | Add new expense"

> Run the tests to check if you've done it correctly

# The problem of changing the title in `/trip/Trip.js`

There is one exception to hooks we have not talked about. Hooks can only be called at the Top Level. That mean we cannot for example call hooks inside of conditions.

In `/trip/Trip.js`:

```javascript
const tripService = useFetchTrip();

// !!! Impossible - we cannot call useEffect inside a condition
// but we can only access the title from data, when isSuccess is true
// you have to find another way
if (tripService.isSuccess) {
  React.useEffect(() => {
    window.document.title = tripService.data.title;
  });
}
```

Tip: Remember / look up the part about dependencies for `useEffect`.

# Recommended links

- [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)
- [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)

# Tasks

- [Introduction](https://github.com/ankri/react-workshop/blob/master/tasks/Task-0.md) - Let's start with the introduction: What is the application about and how to start the TDD tests
- [Task 1](https://github.com/ankri/react-workshop/blob/master/tasks/Task-1.md) - Make a reusable `<Trip />` component and use it to display the incoming trips
- [Task 2](https://github.com/ankri/react-workshop/blob/master/tasks/Task-2.md) - We want to be able to create a new trip. Let's write a form with `useState`
- (optional) [Task 3](https://github.com/ankri/react-workshop/blob/master/tasks/Task-3.md) - We want to set the locale once and use it everywhere. Use `Context` to do this
- [Task 4](https://github.com/ankri/react-workshop/blob/master/tasks/Task-4.md) - Let's have a look at the Router by editing `TripRouter.js`
- Task 5 - you are here
- [Task 6](https://github.com/ankri/react-workshop/blob/master/tasks/Task-6.md) - There is a better way to use forms. Let's use `formik`
- (optional) [Task 7](https://github.com/ankri/react-workshop/blob/master/tasks/Task-7.md) - Currently the app uses two ways to retrieve the data from the server. Let's refactor to just use hooks
