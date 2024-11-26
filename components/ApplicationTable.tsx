interface Application {
    // Define the properties of an application object here
    id: number,
    user_id: number,
    company_name: string,
    job_title: string,
    application_date: Date,
    status: string,
    notes: string,
    application_link: string,
}

interface ApplicationTableProps {
    applicationsList: Application[];
}

export default function ApplicationTable({ applicationsList }: ApplicationTableProps) {
    return (<>
        {applicationsList.map((application) => (
            <tr key={application.id}>
                <td>{application.company_name}</td>
                <td>{application.job_title}</td>
                <td>{application.application_date.toLocaleDateString()}</td>
                <td>{application.status}</td>
                <td>{application.notes}</td>
                <td>{application.application_link}</td>
            </tr>
        ))}
    </>)
}