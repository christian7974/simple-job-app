import {Application} from '@/utils/globalTypes';

function ApplicationColumn({children, className} : {children: React.ReactNode, className?:string}) { 
    return <div className={`flex-1 ${className}`}>{children}</div>
}

export default function IndividualApplication({application, numApp}: {application: Application, numApp: number}) {
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
    </div>)
}