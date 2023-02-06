import {Formik} from 'formik';
import React from 'react';

function AppForm({initialValues, onSubmit, validationSchema, children}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {/* function should return a JSX expression */}
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
