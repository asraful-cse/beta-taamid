import {connect} from "react-redux";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const mapStateToProps = (state, props)=>{
    return{
        showSecret: true
    };
};

const mapDispatchToProps = (dispatch)=>{
    return{};
}

export  default connect (
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute)
