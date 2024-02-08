const Alert = (props) => {
    const initialValue = {
        status: null,
        message: null,
    }
    const notification = props.notification ?? initialValue;

    if (notification.status === true) {
        return <div className="alert alert-success alert-dismissible">
            <button type="button" className="close" data-dismiss="alert"
                    aria-hidden="true">&times;</button>
            <h5><i className="icon fas fa-check"></i> Success!</h5>
            {notification.message}
        </div>
    }

    if (notification.status === false) {
        return <div className="alert alert-danger alert-dismissible">
            <button type="button" className="close" data-dismiss="alert"
                    aria-hidden="true">&times;</button>
            <h5><i className="icon fas fa-ban"></i> Error!</h5>
            {notification.message}
        </div>
    }

}

export default Alert