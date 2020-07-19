import React from 'react';
import { firestore} from "../../../Database/firebase.utils";
import {FaUserCircle} from "react-icons/all";



class ListOfAppointments extends React.Component {

    constructor() {
        super();
        this.state={
            bookedList:[],
            usersList:[],
            nursesList:[],
            UID:'',
            subject:'',
            date:'',
            bookedTime:'',
            str:"",
            string:[],
            userExists:false,
            dateC:[],
            editMode:false,
            userName:'',
            userLastName:'',
            userPhoneNumber:'',
            userEmail:'',
            indexId:'',
            message: ""

        }

    }

    componentDidMount() {
        const dbBooked = firestore.collection("booking").get();
        // eslint-disable-next-line no-unused-vars
        const book=dbBooked
            .then(snapshot =>{
                snapshot.forEach(doc=>{
                    this.state.bookedList.push({
                        UID:doc.id,
                        subject:doc.data().subject,
                        bookedTime:doc.data().bookedTime,
                        dateC: doc.data().date.toDate().toLocaleString().split(','),
                    });
                    const newStateArray = this.state.bookedList;
                    this.setState({bookedList: newStateArray});
                });
            })
            .catch(error => {
                console.error(error);
            });


    }

    userDetails=(userId, indexId)=>{
        this.setState({
            editMode:true,
            UID:userId,
            indexId:indexId
        });

        // eslint-disable-next-line no-unused-vars
        const db = firestore
            .collection("users")
            .doc(userId)
            .get()
            .then(doc => {
                let data = doc.data();
                this.setState({
                    userName:data.firstName,
                    userLastName:data.lastName,
                    userPhoneNumber:data.phoneNumber,
                    userEmail:data.email,
                });

            })
            .catch(error => {
                console.error(error);
            });
    }




    cancelAppointment(userId){
        // eslint-disable-next-line no-unused-vars
        const db = firestore
            .collection("booking")
            .doc(userId)
            .delete()
            .then(function() {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }

    assignHandler = () => {
        this.setState({message:'Successfully assigned'})
    }


    renderTableData() {

        return this.state.bookedList.map((booking,index) => {
            const {subject, dateC, bookedTime} = booking //destructuring

            return (


                <tr className="stripe-dark">
                    <td className="pa3">{subject}</td>
                    <td className="pa3">{dateC[0]}</td>
                    <td className="pa3">{Object.getOwnPropertyNames(bookedTime)}</td>
                    <td className="pa3">
                        <button className='f6 link dim br1 ph3 pv2 mb2 dib white bg-mid-gray' onClick={() => this.userDetails(this.state.bookedList[index].UID,index)}>User Details</button>
                    </td>
                    <td className="pa3">
                        <button className='f6 link dim br1 ph3 pv2 mb2 dib white bg-red' onClick={() => this.cancelAppointment(this.state.bookedList[index].UID)}>Delete</button>
                    </td>
                    <td className="pa3">
                        <div className="mv3">
                            <select id="types" className="w-100 db h2 f6 bg-near-white ba b--sliver gray"
                                    name="">
                                <option value="">Doctor List</option>
                                <option label="Adam" value="Adam">Space Type
                                </option>
                                <option label="Kalid" value="Kalid">Space Type
                                </option>
                                <option label="Nitin" value="Nitin">Space Type
                                </option>
                                <option label="Ramin" value="Ramin">Space Type
                                </option>
                                <option label="Rashed" value="Rashed">Space Type
                                </option>
                            </select>
                            <button
                                onClick={this.assignHandler}
                                className="mv2 pv2 ph3 pointer b br2 hover-bg-dark-green bg-green white bn f7 ttu tracked"
                                type="submit">Assign
                            </button>
                        </div>
                    </td>
                </tr>

            )
        })
    }

    render() {

        if(!this.state.editMode){
            return(

                <div  className="pa4">
                    <h4 className='tc'>{this.state.message}</h4>
                    <div className="overflow-auto">
                        <table className="f6 w-100 mw8 center" cellSpacing="0">
                            <thead>
                            <tr className="stripe-dark">
                                <th className="fw6 tl pa3 bg-white">Subject</th>
                                <th className="fw6 tl pa3 bg-white">Date</th>
                                <th className="fw6 tl pa3 bg-white">Time</th>
                                <th className="fw6 tl pa3 bg-white">User</th>
                                <th className="fw6 tl pa3 bg-white">cancel</th>
                                <th className="fw6 tl pa3 bg-white">Assign A Doctor</th>
                            </tr>
                            </thead>
                            <tbody className="lh-copy">
                            {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>
                </div>



            );
        }else {
            return (
                <div>

                <article>
                    <main className="br3 ba b--black-10 mv4 w-auto-l w-50-m w-25-l mw6 shadow-5 center">
                        <div>
                            <h2>User Details: </h2>
                        </div>
                        <div className='profileContent'>
                            <div className="details">
                                <ul className="center ">
                                    <li className="mv3">
                                        <FaUserCircle/>
                                        <label className="labelClass"> Name: </label>
                                        <span>{this.state.userName}</span>
                                    </li>

                                    <li className="mv3">
                                        <FaUserCircle/>
                                        <label className="labelClass"> Last Name: </label>
                                        <span>{this.state.userLastName}</span>
                                    </li>

                                    <li className="mv3">
                                        <FaUserCircle/>
                                        <label className="labelClass"> Email: </label>
                                        <span> {this.state.userEmail}</span>
                                    </li>

                                </ul>
                                <button className='f6 link dim br1 ph3 pv2 mb2 dib white bg-mid-gray' onClick={() => window.location.reload()}>Back</button>


                            </div>
                        </div>

                    </main>
                </article>
                </div>

            );
        }


    }
}

export default ListOfAppointments;
