import IndividualApplication from './IndividualApplication';
import {Application} from '@/utils/globalTypes';

export default function ApplicationTable({ applicationsList, onDeleteApplication }: {applicationsList: Application[], onDeleteApplication: (applicationId: string) => void}) {
    return (
    <div className='flex flex-col overflow-auto'>
        {applicationsList.map((application, num) => (
            <div key={application.application_id}>
                <IndividualApplication application={application} numApp={num} onDeleteApplication={onDeleteApplication}/>
            </div>
        ))}

    </div>)
}