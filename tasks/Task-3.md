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
