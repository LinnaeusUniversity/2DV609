import React from 'react';
//import './Register.css';
import {auth,creatUserProfileDocument } from '../../../Database/firebase.utils';



class Register extends React.Component {

  constructor(props){
    super(props);

    this.state={
      firstName:'',
      lastName:'',
      socialSecurityNumber:'',
      email:'',
      password:'',
      address:'',
      postNumber:''
      

    };
  }
  handleSubmit= async event=>{
    event.preventDefault();
   


    const {firstName, lastName,socialSecurityNumber, email, password,address, postNumber} = this.state;

    try {
      const { user }= await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await creatUserProfileDocument(user,{firstName,lastName,socialSecurityNumber,email,password,address,postNumber});
      this.setState({
      firstName:'',
      lastName:'',
      socialSecurityNumber:'',
      email:'',
      password:'',
      address:'',
      postNumber:''
     

      });

      
    } catch (error) {
      console.error(error)
      
    }
    this.props.history.push("/signin")
  };
  handleChange=event=>{
   // const { name, value}=event.target.value;
    this.setState({
      [event.target.id]: event.target.value
    });
  
  }
  render(){
    // eslint-disable-next-line no-unused-vars
    const {firstName, lastName,socialSecurityNumber, email, password,address, postNumber} = this.state;

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form onSubmit={this.handleSubmit} className="measure ">

          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor ="name">Name</label>

              <input className="pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="name"  id="firstName"
              onChange={this.handleChange} 
              />
              </div>
              <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor ="last-name">Last name</label>
              <input className="pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="last-name"  id="lastName" 
              onChange={this.handleChange} 
              />
              </div>
              <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor ="social-security-number">Social Sercurity Number</label>
              <input className="pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="name"  id="socialSecurityNumber" 
              onChange={this.handleChange} 
              />
              </div>
              <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor ="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="email" name="email-address"  id="email"
              onChange={this.handleChange} 
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor ="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="password" name="password"  id="password" 
              onChange={this.handleChange} 
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor ="address">Address</label>
              <input className="b pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="address"  id="address"
              onChange={this.handleChange} 
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor ="address">Post number</label>
              <input className="b pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="postaddress"  id="postNumber"
              onChange={this.handleChange} 
              />

            </div>
            
          </fieldset>
          <div className="mv3">


            <button className= "b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib outline-0-m" type="submit">Sign Up</button>

          </div>
          <div className="lh-copy mt3">


          </div>
        </form>
      </main>
      </article>
  );

  }

}

export default Register; 