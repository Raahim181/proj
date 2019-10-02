import React from "react";
import Representative_img from '../../images/us.png';
import "./css/Representative.css";


class RepresentativeInstance extends React.Component{

    constructor(props){
        super(props)
    };

    getAge = (birthDateString) => {
    var todayDate = new Date();
    var birthDate = new Date(birthDateString);
    var age = todayDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if(monthDiff < 0 || (monthDiff = 0 && todayDate.getDate() < birthDate.getDate()))
    {
      age--;
    }
    return age;
  }

    render(){
    var rep_data = this.props.location.state
    var age = this.getAge(rep_data.date_of_birth)
    console.log(this.props.location.state)
    return(
        <div
            className="representative d-flex border border-secondary
                justify-content-center flex-column align-items-center"
        >
            <img className="representative-image" src={Representative_img} alt="us flag" />
            <p className="representative-name">{rep_data.first_name} {rep_data.last_name}</p>
            <ul>
                <li className="representative-desc">
                    <span>Age</span>: {age}
                </li>
                <li className="representative-desc">
                    <span>Years In Office</span>: {rep_data.seniority}
                </li>
                <li className="representative-desc">
                    <span>Party</span>: {rep_data.party}
                </li>
                <li className="representative-desc">
                    <span>State/District</span>: {rep_data.state}
                </li>
            </ul>
        </div>
    );
    }
}

export default RepresentativeInstance;