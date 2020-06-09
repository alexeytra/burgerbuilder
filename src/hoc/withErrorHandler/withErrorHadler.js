import React, {Component} from "react";
import Aux from "../Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        componentDidMount() {
            this.reqInterceptors = axios.interceptors.response.use(req => {
                this.setState({ error: null});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error})
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmHandler = () => {
            this.setState({error: null})
        };

        render() {
            return ( <Aux>
                <Modal
                    modalClosed={this.errorConfirmHandler}
                    show={this.state.error}>
                    {this.state.error ? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props}/>

            </Aux>)
        }
    }
};

export default withErrorHandler;