import { useRef, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

import IndividualApplication from './IndividualApplication';
import { useApplications } from '@/contexts/ApplicationsContext';

export default function ApplicationTable() {
    const { applications, removeApplication } = useApplications();
    const tableRef = useRef(null);
    const prevApplicationsLength = useRef(applications.length);

    const initialLoad = useRef(true);

    useEffect(() => {
        if (initialLoad.current) {
            anime({
                targets: '.application-item',
                translateY: [20, 0],
                opacity: [0, 1],
                easing: 'easeInOutSine',
                duration: 500,
                delay: anime.stagger(100)
            });
            initialLoad.current = false;
        } else if (applications.length > prevApplicationsLength.current) {
            anime({
                targets: '.application-item',
                translateY: [20, 0],
                opacity: [0, 1],
                easing: 'easeInOutSine',
                duration: 500,
                delay: anime.stagger(100)
            });
        }
        prevApplicationsLength.current = applications.length;
        
    }, [applications]);

    function handleDeleteApplication(applicationId: string) {
        anime({
            targets: `#application-${applicationId}`,
            opacity: [1, 0],
            translateX: [0, -100],
            easing: 'easeInOutSine',
            duration: 300,
            complete: () => {
                removeApplication(applicationId);
            }
        });
    }

    return (
        <div className='flex flex-col gap-y-2' ref={tableRef}>
            {applications.map((application, num) => (
                <div key={application.application_id} id={`application-${application.application_id}`} className='application-item'>
                    <IndividualApplication application={application} numApp={num} onDeleteApplication={handleDeleteApplication} />
                </div>
            ))}
        </div>)
}