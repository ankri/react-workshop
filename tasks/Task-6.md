# Task 6 - Using Formik

In [Task 2](https://github.com/ankri/react-workshop/blob/master/tasks/Task-2.md) we wired up a `<form>` with the help of controlled components and `useState`.

This can get very tedious for larger forms. Additionally we did not even handle the errors. There are many react form helpers, but I prefer using [formik](https://jaredpalmer.com/formik/docs/overview).

Have a look at "The Gist" (copied from [formik - Overview](https://jaredpalmer.com/formik/docs/overview) - comments by me)

```jsx
import React from 'react';
import { Formik } from 'formik';

const Basic = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      // we'll use a validation schema instead
      validate={values => {
        let errors = {};
        // but this shows that values and errors are both object and their properties match the name of the fields (inputs)
        // errors.email will either be null/undefined to say there is no error, or a 'string' with the error message
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // onSubmit we have access to the values
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        /* This is the render prop technique */
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
        /* and other goodies */
      }) => (
        // first hook up the form
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            // the name is the way to do the "binding"
            name="email"
            // for inputs we can use the provider handleChagne and handleBlur methods
            onChange={handleChange}
            // we need handleBlur to tell formik that the field has been touched
            onBlur={handleBlur}
            // we can use value (binding is done via name)
            value={values.email}
          />
          {/* We can now access the errors. all fields will be touched when the user submits the form */}
          {errors.email && touched.email ? errors.email : null}
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password ? errors.password : null}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default Basic;
```

# The problem with `handleChange`

The problem lies not with Formik's [`handleChange`](https://jaredpalmer.com/formik/docs/api/formik#handlechange-e-reactchangeevent-any-void) but with the way some components are implemented. [`handleChange`](https://jaredpalmer.com/formik/docs/api/formik#handlechange-e-reactchangeevent-any-void) can auto-wire `HTML inputs` because they emit the `React.ChangeEvent` `onChange`. Some custom components cannot do that because there is not `HTML input` to emit the `React.ChangeEvent` from. In these cases we can use Formik's [`setFieldValue(name, value)`](https://jaredpalmer.com/formik/docs/api/formik#setfieldvalue-field-string-value-any-shouldvalidate-boolean-void).

For example:

```jsx
<CustomComponent
  name="custom"
  onSelectItem={item => {
    setFieldValue('custom', item);
  }}
/>
```

There is a fitting method for all the auto-wired `handleXXX` methods.

> Run the test `004-addExpense.js` to see if you're correct.

# So. Much. Boilerplate.

Yes, in our application we will have so much error handling boilerplate. But luckily we can reduce the boilerplate by using custom [<Field />](https://jaredpalmer.com/formik/docs/api/field) components. Feel free to do that as "homework".

# Recommended links

- [formik - <Formik />](https://jaredpalmer.com/formik/docs/api/formik)
- [formik - <Field />](https://jaredpalmer.com/formik/docs/api/field)
