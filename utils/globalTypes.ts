export interface User {
    email: string;
    id: string;
}

export interface Application {
    // Define the properties of an application object here
    application_id: string,
    user_id: string,
    company_name: string,
    job_title: string,
    application_date: string,
    status: string,
    notes: string,
    application_link: string,
}