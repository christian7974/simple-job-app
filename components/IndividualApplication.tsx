import { useState } from 'react';

import { Application } from '@/utils/globalTypes';
import { createClient } from '@/utils/supabase/client';
import { useApplications } from '@/contexts/ApplicationsContext';

function ApplicationColumn({ children, className, fieldInDB, applicationIdToChange, cannotEdit = false }: { children: React.ReactNode, className?: string, fieldInDB?: string, applicationIdToChange?: string, cannotEdit?: boolean }) {
    const [isTextBox, setIsTextBox] = useState(false);
    const { applications, setApplications } = useApplications();

    async function handleUpdateApplication(event: any) {
        event.preventDefault();

        var inputValue = (event.target as HTMLFormElement).querySelector('input')?.value;

        if (fieldInDB === "application_date" && inputValue) {
            const inputValueAsDate = new Date(inputValue);
            if (inputValueAsDate > new Date()) {
                alert(`Please enter a date that is on or before ${new Date().toLocaleDateString()} `);
                return;
            }
            inputValue = inputValueAsDate.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
        }

        if (fieldInDB != "application_date" && inputValue && inputValue.length > 55) { 
            alert(`Please enter a value that is less than 55 characters`);
            return;
        }

        if (!inputValue && (fieldInDB === "company_name" || fieldInDB === "job_title" || fieldInDB === "status")) {
            alert("Please enter a value");
            return;
        }

        if (!inputValue && fieldInDB === "application_date") {
            inputValue = new Date().toISOString().split('T')[0]
        }

        if (inputValue && fieldInDB === "application_link" && !inputValue?.startsWith('http://') && !inputValue?.startsWith('https://')) {
            alert("Please enter a valid URL beginning with http:// or https://");
            return;

        }

        const supabase = createClient();
        const { error } = await supabase
            .from('applications')
            .update({ [fieldInDB as string]: inputValue })
            .eq('application_id', applicationIdToChange as string);

        if (error) {
            alert(error.message);
            return;
        }
        const newApplications = applications.map((application) => {
            if (application.application_id === applicationIdToChange) {
                return { ...application, [fieldInDB as string]: inputValue };
            }
            return application;
        });
        setApplications(newApplications);
        setIsTextBox(false);
    }

    return (
        <div className={`flex-1 ${className} overflow-hidden`} onClick={() => !cannotEdit && setIsTextBox(true)}>
            {isTextBox && !cannotEdit ? (
                <form onSubmit={handleUpdateApplication}>
                    <input
                        className='text-xl w-2/3'
                        autoFocus
                        type={fieldInDB === "application_date" ? "date" : "text"}
                        defaultValue={typeof children === 'object' ? "" : children as string}
                    />
                    {fieldInDB === "application_date" && <button type="submit">Save</button>}
                </form>
            ) : (
                <p className='text-lg lg:text-2xl hover:cursor-pointer w-fit'>{children}</p>
            )}
        </div>
    );
}

export default function IndividualApplication({ application, numApp, onDeleteApplication }: { application: Application, numApp: number, onDeleteApplication: (applicationId: string) => void }) {    
    const applicationDate = new Date(application.application_date);
    return (
        <div className={`flex items-center px-1 py-1 ${numApp % 2 === 0 ? "bg-[#F0F5FF]" : "bg-[#F0F8F0]"} rounded-md`}>
            <ApplicationColumn
                fieldInDB='company_name'
                className=' overflow-hidden'
                applicationIdToChange={application.application_id}>
                {application.company_name}</ApplicationColumn>
            <ApplicationColumn
                fieldInDB='job_title'
                className=''
                applicationIdToChange={application.application_id}>
                {application.job_title}</ApplicationColumn>
            <ApplicationColumn
                fieldInDB='application_date'
                applicationIdToChange={application.application_id}>
                {`${(applicationDate.getMonth() + 1).toString()}/${(applicationDate.getDate() + 1).toString().padStart(2, '0')}`}</ApplicationColumn>
            <ApplicationColumn
                fieldInDB='status'
                className="max-[700px]:hidden"
                applicationIdToChange={application.application_id}>
                {application.status}</ApplicationColumn>
            <ApplicationColumn
                fieldInDB='notes'
                className="max-[700px]:hidden"
                applicationIdToChange={application.application_id}>
                {application.notes || (
                    <img
                        src="/edit_field.svg"
                        alt="No Note"
                        className='w-6 h-6'
                    />
                )}
            </ApplicationColumn>
            <ApplicationColumn
                fieldInDB='application_link'
                className="max-[1025px]:hidden overflow-hidden"
                applicationIdToChange={application.application_id}>
                {application.application_link || (
                    <img
                        src="/edit_field.svg"
                        alt="No Note"
                        className='w-6 h-6'
                    />
                )}
            </ApplicationColumn>
            <ApplicationColumn
                applicationIdToChange={application.application_id} cannotEdit={true}>
                {/* Change the V to an svg to go to a new window */}
                {application.application_link && <a href={application.application_link} target="_blank" rel="noopener noreferrer">
                    <img
                        src="/new_window.svg"
                        className='w-6 h-6'
                    />
                </a>}
            </ApplicationColumn>
            {/* Eventually, change this to an image of X that will appear only when hovered over */}
            <div>
                <ApplicationColumn cannotEdit={true}>
                    <button
                        onClick={() => onDeleteApplication(application.application_id)}
                        >Delete</button>
                </ApplicationColumn>
            </div>

        </div>)
}