import {Application} from '@/utils/globalTypes';
import { deleteApplication } from '@/utils/actions';

function ApplicationColumn({children, className} : {children: React.ReactNode, className?:string}) { 
    return <div className={`flex-1 ${className}`}>{children}</div>
}

export default function IndividualApplication({application, numApp, onDeleteApplication}: {application: Application, numApp: number, onDeleteApplication: (applicationId: string) => void}) {
    async function handleDeleteApplication(application_id: string) {
        await deleteApplication(application_id);
        onDeleteApplication(application_id);
    }
    return (
        <div className={`flex gap-3 items-center mb-2 text-black w-full ${numApp % 2 === 0 ? "bg-blue-300" : "bg-slate-400"}`}>
            <ApplicationColumn>{application.company_name}</ApplicationColumn>
            <ApplicationColumn>{application.job_title}</ApplicationColumn>
            <ApplicationColumn>{new Date(application.application_date).toLocaleDateString()}</ApplicationColumn>
            <ApplicationColumn>{application.status}</ApplicationColumn>
            <ApplicationColumn className="max-[500px]:hidden">{application.notes}</ApplicationColumn>
            <ApplicationColumn>
                <a href={application.application_link} target="_blank" rel="noopener noreferrer">Link</a>
            </ApplicationColumn>
            <ApplicationColumn>
                <button onClick={() => handleDeleteApplication(application.application_id)}>Delete</button>
            </ApplicationColumn>
        </div>)
}