import IndividualApplication from './IndividualApplication';
import {Application} from '@/utils/globalTypes';

export default function ApplicationTable({ applicationsList }: {applicationsList: Application[]}) {
    return (
    <div className='flex flex-col overflow-auto'>
        {applicationsList.map((application, num) => (
            <div key={application.id}>
                <IndividualApplication application={application} numApp={num}/>
            </div>
        ))}

    </div>)
}