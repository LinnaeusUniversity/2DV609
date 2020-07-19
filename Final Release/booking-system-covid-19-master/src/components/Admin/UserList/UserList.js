import React from 'react';
import {firestore} from "../../../Database/firebase.utils";
import './UserList.css'

class UserList extends React.Component {
    constructor() {
        super();
        this.state={
            usersList:[],
        }

    }


    componentDidMount() {
        const db = firestore.collection("users").get();
        // eslint-disable-next-line no-unused-vars
        const users=db
            .then(snapshot =>{
                snapshot.forEach(doc=>{
                    this.state.usersList.push({

                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        socialSecurityNumber: doc.data().socialSecurityNumber,
                        email: doc.data().email,
                        address: doc.data().address,
                        postNumber: doc.data().postNumber,

                    });
                    const newStateArray = this.state.usersList;
                    this.setState({usersList: newStateArray});
                });
            })
            .catch(error => {
                console.error(error);
            });
    }


    renderTableData() {
        return this.state.usersList.map((user, index) => {
            const {  firstName, lastName, email, address, postNumber, socialSecurityNumber } = user //destructuring
            return (

                <tr className="stripe-dark">
                    <td className="pa3">{firstName}</td>
                    <td className="pa3">{lastName}</td>
                    <td className="pa3">{socialSecurityNumber}</td>
                    <td className="pa3">{email}</td>
                    <td className="pa3">{address}</td>
                    <td className="pa3">{postNumber}</td>
                </tr>

            )
        })
    }

    render() {


        return(

            <div  className="pa4">

                <div className="overflow-auto">
                    <table className="f6 w-100 mw8 center" cellSpacing="0">
                        <thead>
                        <tr className="stripe-dark">
                            <th className="fw6 tl pa3 bg-white">Name</th>
                            <th className="fw6 tl pa3 bg-white">Last Name</th>
                            <th className="fw6 tl pa3 bg-white">Social Security Number</th>
                            <th className="fw6 tl pa3 bg-white">Email</th>
                            <th className="fw6 tl pa3 bg-white">Address</th>
                            <th className="fw6 tl pa3 bg-white">Post Number</th>
                        </tr>
                        </thead>
                        <tbody className="lh-copy">
                        {this.renderTableData()}
                        </tbody>
                    </table>
                    {/*{console.log("test render",usersList)}*/}
                </div>
            </div>



        );
    }

}
export default UserList;
