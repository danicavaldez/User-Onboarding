import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { __values } from "tslib";

const UserForm = ({ errors, touched, values, status }) => {
  
  const [users, setUsers] = useState([])
  console.log(users);

  useEffect (() => {
    if (status) {
      setUsers([...users, status])
    }
  }, [status])

  return (
    <div>
      <Form>
        <Field 
          component="input" 
          type="text" 
          name="name" 
          placeholder="enter name here" 
        />
        {touched.name && errors.name && (
          <p>{errors.name}</p>
        )}
        <Field 
          component="input" 
          type="text" 
          name="email" 
          placeholder="enter email here" 
        />
        {touched.email && errors.email && (
          <p>{errors.email}</p>
        )}        
        <Field 
          component="input" 
          type="password" 
          name="password" 
          placeholder="enter password here"       
        />
        <label>
          <Field 
          type= "checkbox" 
          name="terms" 
          checked={values.terms}
          />
          I agree to the terms & conditions
        </label>
        {touched.terms && errors.terms && (
          <p>{errors.terms}</p>
        )}        
        <button>create account</button>
      </Form>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  )
}

const formikHOC = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("must enter a name"),
    email: Yup.string().required("invalid email"),
    terms: Yup.boolean().oneOf([true],"Must Accept Terms and Conditions")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error(err));
  }

})

const UserFormWithFormik = formikHOC(UserForm)

export default UserFormWithFormik; 

// export default withFormik({})(UserForm);
