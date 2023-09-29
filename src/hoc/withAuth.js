import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../redux/actions/user';
import cookie from "js-cookie";

const withAuth = WrappedComponent => {
    class AuthorizedComponent extends React.Component {
        componentDidMount() {
            if (cookie.get('token') && !this.props.loggedIn) this.props.fetchCurrentUser();
        }

        render() {
            if (cookie.get("token") && this.props.loggedIn) {
                return <WrappedComponent />;
            } if (cookie.get("token") && (this.props.authenticatingUser || !this.props.loggedIn)) {
                return <p>Загрузка.... </p>;
            }
            return <Redirect to="/login" />;
        }
    }

    const mapStateToProps = reduxStoreState => ({
        loggedIn: reduxStoreState.usersReducer.loggedIn,
        authenticatingUser: reduxStoreState.usersReducer.authenticatingUser,
    });

    const mapDispatchToProps = dispatch => ({
        fetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    });

    return connect(
        mapStateToProps,
        actions,
    )(AuthorizedComponent);
};

export default withAuth;