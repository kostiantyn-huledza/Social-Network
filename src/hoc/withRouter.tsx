import {useLocation, useNavigate, useParams} from "react-router-dom";
import React from "react";

export const withRouter = <Props extends WithRouterProps>(Component: React.ComponentType<Props>) => {

    return (props: Omit<Props, keyof WithRouterProps>) => {

            const location = useLocation();
            const params = useParams();
            const navigate = useNavigate();
        return <Component {...(props as Props)} router={{location, navigate, params}}/>;
    }
}

export type  WithRouterProps = {
    router: {
        location: ReturnType<typeof useLocation>
        params: Record<string, string>
        navigate: ReturnType<typeof useNavigate>
    }
}

