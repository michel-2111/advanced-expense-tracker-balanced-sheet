import { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
        {children}
        </BreadcrumbContext.Provider>
    );
}

export function useBreadcrumb() {
    return useContext(BreadcrumbContext);
}
