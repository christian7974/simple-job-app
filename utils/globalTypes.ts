export interface User {
    email: string;
    id: string;
}

export interface Application {
    // Define the properties of an application object here
    id: number,
    user_id: number,
    company_name: string,
    job_title: string,
    application_date: string,
    status: string,
    notes: string,
    application_link: string,
}