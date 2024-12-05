import { createContext, useContext, useState } from 'react';
import { Application } from '@/utils/globalTypes';
import { deleteApplicationBackend } from '@/utils/actions';

interface ApplicationsContextType {
    applications: Application[];
    addApplication: (newApplication: Application) => void;
    removeApplication: (applicationId: string) => void;
    setApplications: (applications: Application[]) => void;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);

export function useApplications() {
    const context = useContext(ApplicationsContext);
    if (!context) {
        throw new Error('useApplications must be used within a ApplicationsProvider');
    }
    return context;
}

export function ApplicationsProvider({children}: {children: React.ReactNode}) { 
    const [applications, setApplications] = useState<Application[]>([]);
    function addApplication(newApplication: Application) {
        setApplications([...applications, newApplication]);
    }
    async function removeApplication(applicationId: string) {
        await deleteApplicationBackend(applicationId);
        setApplications((prevApplications) => prevApplications.filter(app => app.application_id !== applicationId));
    }
    return (
        <ApplicationsContext.Provider value={{applications, addApplication, removeApplication, setApplications}}>
            {children}
        </ApplicationsContext.Provider>
    )
}