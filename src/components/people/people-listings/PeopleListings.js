import React, { useEffect } from 'react';
import PersonItem from '../person-item/PersonItem';
import { fetchPeopleAction } from '../../../redux/actions/user.actions';
import { connect } from 'react-redux';
import Loading from '../../../shared/loading/loading';
import './people-listings-style.css';
import NotFound from '../../../shared/404-page/NotFound';
import RequestLoading from '../../../shared/request-loading/RequestLoading';

const PeopleListings = ({
  people,
  fetchingPeopleError,
  loadingPeople,
  fetchPeopleAction,
}) => {
  useEffect(() => {
    fetchPeopleAction();
  }, []);

  return (
    <section className='people-collection'>
      <div className=' scroll'>
        {!loadingPeople &&
          people &&
          people.length > 0 &&
          people.map(person => {
            return <PersonItem key={person.id} person={person} />;
          })}

        {loadingPeople && (
          <div className='loading-circle-spinner'>
            <RequestLoading type='circle' show='true' />
            <p className='loading-text'>Loading People...</p>
          </div>
        )}

        {people.length <= 0 && !loadingPeople && !fetchingPeopleError && (
          <NotFound
            title='NO Result FOUND'
            subText='We did not find any result matching your search.'
          />
        )}

        {fetchingPeopleError && (
          <NotFound
            title='REQUEST ERROR'
            subText='Something went wrong while fetching the results.'
          />
        )}
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    people: state.app.people,
    loadingPeople: state.app.loadingPeople,
    fetchingPeopleError: state.app.fetchingPeopleError,
  };
};

export default connect(mapStateToProps, { fetchPeopleAction })(PeopleListings);
