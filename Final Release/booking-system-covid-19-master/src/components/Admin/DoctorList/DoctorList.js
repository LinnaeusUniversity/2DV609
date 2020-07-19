import React from 'react';
import {firestore} from "../../../Database/firebase.utils";
import './DoctorList.css'

class NursesList extends React.Component {
    constructor() {
        super();
        this.state={
            nursesList:[],
            editMode:false,
            UID:'',
            name:'',
            lastName:'',
            email:'',
            phoneNumber:'',
        }

    }


    componentDidMount() {
        const db = firestore.collection("nurses").get();
        // eslint-disable-next-line no-unused-vars
        const nurses=db
            .then(snapshot =>{
                snapshot.forEach(doc=>{
                    this.state.nursesList.push({
                        UID:doc.id,
                        name: doc.data().name,
                        lastName: doc.data().lastName,
                        email: doc.data().email,
                        phoneNumber: doc.data().phoneNumber,

                    });

                    const newStateArray = this.state.nursesList;
                    this.setState({nursesList: newStateArray});
                });

            })

            .catch(error => {
                console.error(error);
            });
    }

    renderTableData() {
        return this.state.nursesList.map((nurse, index) => {
            // eslint-disable-next-line no-unused-vars
            const {  key, name, lastName, email, phoneNumber } = nurse //destructuring
            return (

                <tr key={nurse.uid}
                    // onClick={() => this.editNurse(nurse.uid)}
                    className="stripe-dark">
                    <td className="pa3">{name}</td>
                    <td className="pa3">{lastName}</td>
                    <td className="pa3">{email}</td>
                    <td className="pa3">{phoneNumber}</td>
                    <td className="pa3">{
                        <div className="mv3">
                            <button className='f6 link dim br1 ph3 pv2 mb2 dib white bg-mid-gray' onClick={() => this.editNurse(this.state.nursesList[index].UID)}>Edit</button>
                        </div>}
                    </td>

                </tr>
            )
        })
    }

    editNurse=(nurseId)=>{
        this.setState({
            editMode:true,
            UID:nurseId,
        });
        console.log("test nurse id",nurseId);
        // eslint-disable-next-line no-unused-vars
        const db = firestore
            .collection("nurses")
            .doc(nurseId)
            .get()
            .then(doc => {
                    let data = doc.data();
                    this.setState({
                        name:data.name,
                        lastName:data.lastName,
                        phoneNumber:data.phoneNumber,
                        email:data.email,
                    });

            })
            .catch(error => {
                console.error(error);
            });
    }


    handleChange=event=>{
        this.setState({
            [event.target.id]: event.target.value,

        });

    }



    handleSubmit=(e)=>{
        e.preventDefault();
        const { email, name, lastName, phoneNumber} =this.state;
        const updateRef = firestore.collection("nurses").doc(this.state.UID);
        updateRef.set({
            name,
            lastName,
            email,
            phoneNumber
        }).then(docRef=>{
            this.setState({
                key:'',
                name:'',
                lastName:'',
                phoneNumberNumber:'',
                email:'',
            });
            window.location.reload(false);
        }).catch((error)=>{
            console.error("error editing document: ", error)
        });
    }

    render() {

        if(!this.state.editMode){
            return(

                <div  className="pa4">

                    <div className="overflow-auto">
                        <table className="f6 w-100 mw8 center" cellSpacing="0">
                            <thead>
                            <tr  className="stripe-dark">
                                <th className="fw6 tl pa3 bg-white">Name</th>
                                <th className="fw6 tl pa3 bg-white">Last Name</th>
                                <th className="fw6 tl pa3 bg-white">Email</th>
                                <th className="fw6 tl pa3 bg-white">Phone Number</th>
                                <th className="fw6 tl pa3 bg-white">Edit</th>

                            </tr>
                            </thead>
                            <tbody className="lh-copy">
                            {this.renderTableData()}
                            </tbody>
                        </table>

                    </div>
                </div>



            );
        }else{
            return (

                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <form onSubmit={this.handleSubmit} className="measure ">
                            <fieldset id="edit" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Edit your details</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6"   htmlFor ="name">Name</label>

                                    <input className="pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="name"  id="name"
                                           value={this.state.name}
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6"  htmlFor ="lastName">Last name</label>
                                    <input className="pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="last-name"  id="lastName"
                                           value={this.state.lastName}
                                           onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor ="email">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="email"  id="email"
                                           value={this.state.email}
                                           onChange={this.handleChange}
                                    />
                                </div>

                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6"  htmlFor ="phoneNumber">PhoneNumber</label>
                                    <input className="b pa2 input-reset ba bg-transparent grow hover-bg-light-gray hover-black w-100 outline-0-m" type="text" name="phoneNumber"  id="phoneNumber"
                                           value={this.state.phoneNumber}
                                           onChange={this.handleChange}
                                    />
                                </div>
                            </fieldset>

                            <div className="mv3">
                                <button className= "b ph4 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib outline-0-m" type="submit">Save</button>
                            </div>

                        </form>
                    </main>
                </article>
            );

        }

    }

}
export default NursesList;
