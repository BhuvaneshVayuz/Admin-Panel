import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useTitleUpdater = () => {
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;

        if (currentPath.startsWith('/form-validations')) {
            document.title = 'Validations';
        } else if (currentPath.startsWith('/styling-configs')) {
            document.title = 'Styling';
        }
    }, [location.pathname]);
};

export default useTitleUpdater;
