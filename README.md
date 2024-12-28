# Application Tracking Project

# Table of Contents
1. [Description of Project](#description-of-project)
2. [Challenges I Faced](#challenges-i-faced)
3. [Inspiration](#inspiration)
4. [How to Contribute](#how-to-contribute)
5. [Future Features](#future-features)

# Description of Project
The job hunt can be an overwhelming and frustrating process. One part that people may forget to do (or choose not to) is to keep track of their applications, including the company, position and the date that they applied. This can help you make sure that you do not apply to the same position at the same company too quickly and also check your process. This is an app that can help people record their applications to help them remember where they applied to on what date. Users are able to add, edit and delete applications. 

I used React.js, Next.js, Supabase (for authentication and PostgreSQL backend) and Tailwind. I also opted for TypeScript since I was going to be working with complex objects and wanted to make sure that I was not messing up the types of those objects.

# Challenges I Faced
One challenge that I faced was how to organize the database. I used a PostgreSQL backend (using [Supabase](https://supabase.com/)), in other words a relational database. I was conflicted whether to have the users' table contain an array containing the applications or to have them be in a separate table and to have a foreign key to the appropriate user in the users table. I opted for the latter, as navigating arrays in SQL would be very problematic and it felt more natural to do so.

Another challnege I faced was storing and displaying the dates in JS. The dates would be displayed wrong on the Applications screen and adding the default date would cause it to be displayed differently. The solution to this was to make sure they were stored the same way in every part of the application, from retrieving it from the database to actually displaying it on the screen. Previously, I had them stored as ISO strings and regular date Strings, however I opted for the former for simplicity.  

# Inspiration
When I was applying to jobs after undergrad, I was using a Google Sheet to record all of my applications. It worked fine, however I knew that I could create an app that could do the same thing while also having extra features (which I plan on implementing at a future date). I also wanted more experience with React and Next.js and this project was a great way to work with both of these technologies.

# How to Contribute
If you notice a problem then do not hesitate to create an issue with a description of the issue and how you reproduced that mishap. A helpful issue would include:

- A short but descriptive title about the problem
- Steps to replicate that issue
- A screenshot of your screen (with a description of the type of device used, such as a tablet or mobile phone)
- Any more information would be very helpful in debugging and resolving the issue.

# Future Features
- Show information about applications (including total number, most applications done on specific date)
- Import/export your applications
- Create Sankey Graph of your applications
- Search for applications