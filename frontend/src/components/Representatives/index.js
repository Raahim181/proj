import React, { Component } from "react";
import { Link } from "react-router-dom";
import RepresentativeSortFilter from "./RepresentativeSortFilter";
import Representative from "./Representative";
import Pages from "../Pages";

import "./css/Representatives.css";

class Representatives extends Component {
  getAge = birthDateString => {
    var todayDate = new Date();
    var birthDate = new Date(birthDateString);
    var age = todayDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  getEnacted = enacted => {
    if (enacted != null) {
      return enacted;
    }
    return "N/A";
  };

  getBillType = billType => {
    if (billType === "hr") {
      return "House of Representatives";
    }
    return "Senate";
  };

  getParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democrat";
    }
    return "Republican";
  };
  state = {
    collapse: true,
    representatives: [],
    metaData: {
      currentPage: 1,
      lastPage: 1
    },
    search: "",
    loading: true
  };

  getDistrict = district => {
    if (district) {
      return district;
    }
    return "N/A";
  };

  getType = type_flag => {
    if (type_flag) {
      return "House Rep.";
    }
    return "Senator";
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  componentDidMount() {
    const querystring = this.props.location.search;
    const pathname = this.props.location.pathname;
    const url = `https://api.foodmeonce.me${pathname}${querystring}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let representatives = data["data"];
        let metaData = data["metaData"];
        this.setState({ representatives, metaData, loading: false });
      })
      .catch(console.log);
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearch = _ => {
    const search = this.state.search.toLowerCase();
    window.location = `/Representatives/search?attribute=${search}`;
  };

  render() {
    var representativesRendered = this.state.representatives.map(
      (representative, i) => {
        var rep_image = "";
        if (representative.first_name != null) {
          rep_image =
            "https://theunitedstates.io/images/congress/original/" +
            representative.id +
            ".jpg";
        }
        return (
          <a
            href={`/Representatives/instance/${representative.id}`}
            className="button-container"
          >
            <Representative
              image={rep_image}
              name={representative.first_name + " " + representative.last_name}
              age={this.getAge(representative.date_of_birth)}
              yearsInOffice={representative.seniority}
              party={this.getParty(representative.party)}
              state={representative.state}
              district={this.getDistrict(representative.district)}
              type_flag={this.getType(representative.type_flag)}
            />
          </a>
        );
      }
    );
    const renderPage = this.state.loading ? (
      <h2 className="text-center m-3">Loading...</h2>
    ) : this.state.representatives.length > 0 ? (
      <React.Fragment>
        <div className="representatives-container">
          {representativesRendered.slice(0, 4)}
        </div>
        <div className="representatives-container">
          {representativesRendered.slice(4, 8)}
        </div>
        <Pages
          url={this.props.location.pathname}
          querystring={this.props.location.search}
          current={this.state.metaData.currentPage}
          lastPage={this.state.metaData.numPages}
        />
      </React.Fragment>
    ) : (
      <h2 className="text-center m-3">No filtered/searched data...</h2>
    );
    //Splice total list to get only the ones for the page we are on
    //representativesRendered = representativesRendered.splice(0,8)
    return (
      <div className="representatives-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Representatives</h3>
            <input
              className="form-control"
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.handleSearch();
                }
              }}
              placeholder="Search"
              style={{ marginLeft: "15%" }}
              aria-label="Search"
            />
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <RepresentativeSortFilter />}
        </div>
        {renderPage}
      </div>
    );
  }
}

export default Representatives;
