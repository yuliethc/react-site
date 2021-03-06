import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/Badge.css";
import logotwitter from "../pages/images/twitter.svg";
import Gravatar from "../components/Gravatar";

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");
  const [filteredBages, setFilteredBagesResults] = React.useState(badges);
  React.useMemo(() => {
    const result = badges.filter(badge => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setFilteredBagesResults(result);
  }, [badges, query]);
  return { query, setQuery, filteredBages };
}

function BadgesList(props) {
  const badges = props.badges;
  const { query, setQuery, filteredBages } = useSearchBadges(badges);

  if (filteredBages.length == 0) {
    return (
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <h3>¡No Badges were found!</h3>
        <Link className="btn btn-primary" to="/badges/new">
          Create New Badge
        </Link>
      </div>
    );
  }
  return (
    <div className="Badges__container-list">
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <ul className="list-unstyled">
        {filteredBages.map(badge => {
          return (
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-4 ">
                    <Gravatar
                      className="Badge__avatar-list"
                      email={badge.email}
                      alt="Avatar"
                    />
                  </div>
                  <div className="col-8">
                    <li key={badge.id}>
                      <Link to={`/badges/${badge.id}`}>
                        <h3 className="Badge__section-name-list">
                          <span>{badge.firstName}</span>{" "}
                          <span>{badge.lastName}</span>
                        </h3>
                      </Link>
                    </li>
                    <div>
                      <h6 className="Badge__section-job-list">
                        {badge.jobTitle}
                      </h6>
                    </div>
                    <div>
                      <h6 className="Badge__section-twitter-list">
                        <img
                          className="Badge__logo-twitter-list"
                          src={logotwitter}
                          alt="twitterlogo"
                        />
                        <a href="https://twitter.com/">@{badge.twitter}</a>
                      </h6>
                    </div>
                  </div>
                </div>

                {/* <div className="row justify-content-center">
                    <div className="col-12">{badge.jobTitle}</div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12">@{badge.twitter}</div>
                  </div> */}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
