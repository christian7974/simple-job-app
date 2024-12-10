import { useState } from 'react';
import { Application } from '@/utils/globalTypes';
import { createClient } from '@/utils/supabase/client';
import { useApplications } from '@/contexts/ApplicationsContext';

function ApplicationColumn({children, className, fieldInDB, applicationIdToChange, cannotEdit=false} : {children: React.ReactNode, className?:string, fieldInDB?: string, applicationIdToChange?: string, cannotEdit?:boolean}) { 
    const [isTextBox, setIsTextBox] = useState(false);
    const {applications, setApplications} = useApplications();

    async function handleUpdateApplication(event: any) {
        event.preventDefault();

        const inputValue = (event.target as HTMLFormElement).querySelector('input')?.value;

        if (fieldInDB === "application_date" && inputValue) {
            const inputValueAsDate = new Date(inputValue);
            if (inputValueAsDate > new Date()) {
                alert(`Please enter a date that is on or before ${new Date().toLocaleDateString()} `);
                return;
            }
        }

        if (!inputValue && (fieldInDB=== "company_name" || fieldInDB === "job_title" || fieldInDB ==="status")) {
            alert("Please enter a value");
            return;
        }
        const supabase = createClient();
        const {error} = await supabase
            .from('applications')
            .update({[fieldInDB as string]: (document.querySelector('input') as HTMLInputElement).value})
            .eq('application_id', applicationIdToChange as string);
        
        if (error) {
            alert(error);
            return;
        }
        const newApplications = applications.map((application) => {
            if (application.application_id === applicationIdToChange) {
                return {...application, [fieldInDB as string]: inputValue};
            }
            return application;
        });
        setApplications(newApplications);
        setIsTextBox(false);
    }

    return (
        <div className={`flex-1 ${className}`} onClick={() => !cannotEdit && setIsTextBox(true)}>
          {isTextBox && !cannotEdit ? (
            <form onSubmit={handleUpdateApplication}>
              <input 
                className='text-xl w-2/3'
                type={fieldInDB === "application_date" ? "date" : "text"} 
                defaultValue={children as string}
                />
              {fieldInDB === "application_date" && <button type="submit">Save</button>}
            </form>
          ) : (
            <p className='text-xl'>{children}</p>
          )}
        </div>
      );
}

export default function IndividualApplication({application, numApp, onDeleteApplication}: {application: Application, numApp: number, onDeleteApplication: (applicationId: string) => void}) {
    return (
        <div className={`flex items-center px-1 py-1 ${numApp % 2 === 0 ? "bg-[#F0F5FF]" : "bg-[#F0F8F0]"} rounded-md`}>
            <ApplicationColumn 
                fieldInDB='company_name' 
                applicationIdToChange={application.application_id}>
                    {application.company_name}</ApplicationColumn>
            <ApplicationColumn 
                fieldInDB='job_title' 
                applicationIdToChange={application.application_id}>
                    {application.job_title}</ApplicationColumn>
            <ApplicationColumn 
                fieldInDB='application_date' 
                applicationIdToChange={application.application_id}>
                    {application.application_date.slice(5).replace('-', '/')}</ApplicationColumn>
            <ApplicationColumn 
                fieldInDB='status' 
                applicationIdToChange={application.application_id}>
                    {application.status}</ApplicationColumn>
            <ApplicationColumn 
                fieldInDB='notes' 
                className="max-[500px]:hidden" 
                applicationIdToChange={application.application_id}>
                    {application.notes || "No Note"}</ApplicationColumn>
            <ApplicationColumn 
                fieldInDB='application_link' 
                applicationIdToChange={application.application_id}>
                    {application.application_link || " "}
            </ApplicationColumn>
            <ApplicationColumn 
                applicationIdToChange={application.application_id} cannotEdit={true}>
                <a href={application.application_link} target="_blank" rel="noopener noreferrer">Link to Application</a>
            </ApplicationColumn>
            {/* Eventually, change this to an image of X that will appear only when hovered over */}
            <div>
                <ApplicationColumn cannotEdit={true}>
                    <button 
                        onClick={() => onDeleteApplication(application.application_id)}>Delete</button>
                </ApplicationColumn>
            </div>
            
        </div>)
}