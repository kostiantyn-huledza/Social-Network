import {FC} from "react";
import {Link} from "react-router-dom";

const NotFound: FC = () => {
    return (
        <div>
            <div>404 NOT FOUND</div>
            <div>< br /></div>
            <div>
                <Link to='/'>
                    Go to main page
                </Link>
            </div>
        </div>
    )
}

export default NotFound