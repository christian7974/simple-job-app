import IndividualApplication from './IndividualApplication';
import {useApplications} from '@/contexts/ApplicationsContext';

export default function ApplicationTable() {
    const { applications, removeApplication } = useApplications();

    return (
        <div className='flex flex-col gap-y-2 overflow-auto'>
            {applications.map((application, num) => (
                <div key={application.application_id}>
                    <IndividualApplication application={application} numApp={num} onDeleteApplication={removeApplication}/>
                </div>
            ))}
        </div>)
}